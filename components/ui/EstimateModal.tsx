"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useId,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { X, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { cn, prefersReducedTransparency } from "@/lib/utils";
import { track } from "@/lib/track";
import {
  BUTTON_BASE,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  type ButtonVariant,
  type ButtonSize,
} from "@/lib/button-styles";
import {
  springTo,
  project,
  rubberband,
  VelocityTracker,
  prefersReducedMotion,
  SPRING_SHEET,
  SPRING_MOVE,
  type SpringHandle,
} from "@/lib/spring";

const MultiStepForm = dynamic(() => import("@/components/ui/MultiStepForm"), {
  ssr: false,
  loading: () => <div className="h-[440px]" aria-hidden="true" />,
});
const LpQuickForm = dynamic(() => import("@/components/lp/LpQuickForm"), {
  ssr: false,
  loading: () => <div className="h-[440px]" aria-hidden="true" />,
});

function deriveLpService(pathname: string | null): string | null {
  if (!pathname) return null;
  const match = pathname.match(/^\/lp\/([^/]+)/);
  return match ? match[1] : null;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

// ---- Context ----
export interface EstimateOpenOptions {
  /** Where the lead came from — lands in the lead email and GA4. */
  source?: string;
}

interface EstimateModalContextType {
  /** Pass the triggering element so the sheet can scale out of it. */
  open: (trigger?: HTMLElement | null, options?: EstimateOpenOptions) => void;
  close: () => void;
  isOpen: boolean;
}

const EstimateModalContext = createContext<EstimateModalContextType>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function useEstimateModal() {
  return useContext(EstimateModalContext);
}

// ---- Provider + Modal ----
export function EstimateModalProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lpService = deriveLpService(pathname);
  const isLp = lpService !== null;
  const titleId = useId();

  const [isOpen, setIsOpen] = useState(false);
  // Stays true through the exit animation so the sheet has something to animate.
  const [isPresent, setIsPresent] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [source, setSource] = useState("Estimate button");
  // The homepage runs the short form everywhere it appears (hero, CTA block,
  // and this modal), so a visitor never meets two different forms on one page.
  const twoStep = pathname === "/";

  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Visual state lives in refs and is written straight to the DOM: springs run
  // per frame, and re-rendering a mounted form 60 times a second is wasteful.
  const progress = useRef(0);
  const dragY = useRef(0);
  const openSpring = useRef<SpringHandle | null>(null);
  const dragSpring = useRef<SpringHandle | null>(null);
  const tracker = useRef(new VelocityTracker());
  const dragStart = useRef(0);
  const dragging = useRef(false);
  // Measured once when a gesture or animation starts. Reading offsetHeight
  // inside paint() forced a layout recalc on every frame, interleaved with the
  // style writes — the same thrash pattern the scroll driver exists to avoid.
  const panelHeight = useRef(400);

  const measurePanel = useCallback(() => {
    const h = panelRef.current?.offsetHeight;
    if (h) panelHeight.current = h;
  }, []);

  const paint = useCallback(() => {
    const p = progress.current;
    const y = dragY.current;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    const reduced = prefersReducedMotion();
    const flat = prefersReducedTransparency();
    const height = panelHeight.current;
    // The backdrop lightens as the sheet is pulled away — the page behind is
    // coming back, and saying so mid-gesture is what makes the drag feel real.
    const pullBack = Math.max(0, 1 - (Math.max(0, y) / height) * 0.7);

    backdrop.style.opacity = String(p * pullBack);
    backdrop.style.backdropFilter =
      reduced || flat ? "" : `blur(${p * 8}px)`;
    panel.style.opacity = String(Math.min(1, p * 1.4));

    // Reduced motion suppresses the *entrance* — motion the interface starts on
    // its own. It must never suppress `y`, which is the user's own finger:
    // direct manipulation is a response to input, not autonomous motion.
    const entranceY = reduced ? 0 : (1 - p) * 20;
    const scale = reduced ? 1 : 0.94 + p * 0.06;
    // Blur and scale move together so the surface reads as a material arriving,
    // not a flat image fading in.
    panel.style.transform = `translateY(${entranceY + y}px) scale(${scale})`;
  }, []);

  // Mount the form on idle rather than on first open. Preloading the chunk
  // wasn't enough: `hasOpened` still gated the mount, so the first open painted
  // a 440px placeholder and then swapped in the taller real form — resizing the
  // panel mid-spring. Mounting it early (inside the still-hidden overlay, which
  // is `visibility:hidden` and therefore still laid out) means the panel is
  // already its final height before the first animation ever runs.
  useEffect(() => {
    if (hasOpened) return;
    const mount = () => setHasOpened(true);
    const ric = window.requestIdleCallback;
    if (ric) {
      const id = ric(mount, { timeout: 3000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const t = setTimeout(mount, 1500);
    return () => clearTimeout(t);
  }, [hasOpened]);

  const open = useCallback((trigger?: HTMLElement | null, options?: EstimateOpenOptions) => {
    // Guarded: `onClick={open}` would otherwise hand us a SyntheticEvent.
    triggerRef.current =
      trigger instanceof HTMLElement
        ? trigger
        : (document.activeElement as HTMLElement | null);
    const nextSource = options?.source ?? "Estimate button";
    setSource(nextSource);
    track("estimate_open", { source: nextSource });
    // Always start from a clean offset — a dismiss-by-drag can leave a spring
    // mid-flight, and the sheet must never open anywhere but centred.
    dragSpring.current?.stop();
    dragSpring.current = null;
    dragY.current = 0;
    setIsPresent(true);
    setIsOpen(true);
    setHasOpened(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Drive open/close with a spring, always continuing from wherever the sheet
  // currently is. Toggling mid-flight redirects it instead of restarting it.
  useEffect(() => {
    if (!isPresent) return;
    const prior = openSpring.current?.stop();
    openSpring.current = springTo({
      from: prior?.value ?? progress.current,
      to: isOpen ? 1 : 0,
      velocity: prior?.velocity ?? 0,
      ...SPRING_SHEET,
      restDelta: 0.002,
      onUpdate: (v) => {
        progress.current = v;
        paint();
      },
      onComplete: () => {
        openSpring.current = null;
        if (!isOpen) {
          // The dismiss drag spring is still running here: it targets the panel
          // height and has a longer response than the open spring, so without
          // this it would overwrite dragY *after* the reset and leave the sheet
          // parked one panel-height down for the next open.
          dragSpring.current?.stop();
          dragSpring.current = null;
          dragY.current = 0;
          setIsPresent(false);
        }
      },
    });
    return () => {
      openSpring.current?.stop();
    };
  }, [isOpen, isPresent, paint]);

  // Anchor the scale to whatever was tapped, so the sheet visibly comes out of
  // the button rather than blooming from the middle of the screen.
  useLayoutEffect(() => {
    if (!isPresent || !isOpen) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    if (!panel) return;
    if (!trigger || !trigger.isConnected) {
      panel.style.transformOrigin = "center";
      return;
    }
    const p = panel.getBoundingClientRect();
    const t = trigger.getBoundingClientRect();
    panel.style.transformOrigin = `${t.left + t.width / 2 - p.left}px ${
      t.top + t.height / 2 - p.top
    }px`;
  }, [isPresent, isOpen]);

  // Paint the closed state before first reveal so it never flashes at full size.
  useLayoutEffect(() => {
    if (!isPresent) return;
    measurePanel();
    paint();
  }, [isPresent, paint, measurePanel]);

  // Lock body scroll only while actually open.
  useEffect(() => {
    if (!isOpen) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prior;
    };
  }, [isOpen]);

  // Escape to close, Tab trapped inside, focus restored to the trigger on exit.
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    const previouslyFocused = triggerRef.current;

    panel?.focus({ preventScroll: true });

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [isOpen, close]);

  // ---- Drag to dismiss (grab bar / header only, so the form stays usable) ----
  const onDragStart = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      dragSpring.current?.stop();
      dragSpring.current = null;
      measurePanel();
      dragging.current = true;
      dragStart.current = e.clientY - dragY.current;
      tracker.current.reset();
      tracker.current.add(dragY.current, e.timeStamp);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [measurePanel]
  );

  const onDragMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const raw = e.clientY - dragStart.current;
      // Downward tracks 1:1; upward resists, because there's nothing up there.
      dragY.current =
        raw >= 0 ? raw : -rubberband(-raw, panelHeight.current);
      tracker.current.add(dragY.current, e.timeStamp);
      paint();
    },
    [paint]
  );

  const onDragEnd = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);

      const velocity = tracker.current.get();
      const height = panelHeight.current;
      // Decide on where the throw is going, not where the finger stopped.
      const projected = dragY.current + project(velocity);

      if (projected > height * 0.3) {
        close();
        dragSpring.current = springTo({
          from: dragY.current,
          to: height,
          velocity,
          ...SPRING_MOVE,
          restDelta: 0.5,
          onUpdate: (v) => {
            dragY.current = v;
            paint();
          },
        });
      } else {
        dragSpring.current = springTo({
          from: dragY.current,
          to: 0,
          velocity,
          ...SPRING_SHEET,
          restDelta: 0.5,
          onUpdate: (v) => {
            dragY.current = v;
            paint();
          },
        });
      }
    },
    [close, paint]
  );

  return (
    <EstimateModalContext.Provider value={{ open, close, isOpen }}>
      {children}

      <div
        ref={overlayRef}
        className={cn(
          "fixed inset-0 z-[100] flex items-center justify-center p-4",
          isPresent ? "visible" : "invisible pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-black/60 motion-reduce:bg-black/75 [@media(prefers-reduced-transparency:reduce)]:bg-black/80 [@media(prefers-contrast:more)]:bg-black/85"
          style={{ opacity: 0 }}
          onClick={close}
        />

        {/* Sheet */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="relative w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain bg-white rounded-2xl shadow-2xl outline-none will-change-[opacity,transform]"
          style={{ opacity: 0 }}
        >
          {/* Close button — deliberately a sibling of the grab area, not a
              child. Pointer capture on the drag surface retargets pointerup,
              so the browser would fire the click on the capturing div and the
              button inside it could never activate. */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 active:scale-95 flex items-center justify-center transition-[background-color,transform] duration-150 cursor-pointer"
            aria-label="Close"
          >
            <X size={16} className="text-neutral-500" />
          </button>

          {/* Grab area — drag down to dismiss. Scoped to the header so the
              form below stays scrollable and tappable. */}
          <div
            className="touch-none cursor-grab active:cursor-grabbing"
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragEnd}
          >
            <div className="flex justify-center pt-3 pb-1">
              <span
                className="h-1 w-9 rounded-full bg-neutral-300"
                aria-hidden="true"
              />
            </div>

            {/* Header */}
            <div className="px-6 pt-3 pb-2 select-none">
              <h2
                id={titleId}
                className="text-xl font-extrabold font-heading text-primary pr-8"
              >
                {isLp || twoStep ? "Get Your Free Quote" : "Get Your Free Estimate"}
              </h2>
              {/* The homepage's two-step form goes straight from title to
                  progress bar, same as the hero card. */}
              {!twoStep && (
                <p className="text-sm text-secondary mt-1">
                  {isLp
                    ? "Takes under 20 seconds. We respond in minutes."
                    : "Three quick steps — takes under 30 seconds. We respond in minutes."}
                </p>
              )}
            </div>
          </div>

          {/* Form — only mounted after first open to defer JS */}
          <div className="px-6 pb-4">
            {hasOpened &&
              (isLp ? (
                <LpQuickForm service={lpService} onSuccess={() => {}} />
              ) : (
                <MultiStepForm
                  // Remount on the switch: a step index means a different
                  // step in each mode.
                  key={twoStep ? "two-step" : "three-step"}
                  variant="light"
                  source={source}
                  twoStep={twoStep}
                  onSuccess={() => {}}
                />
              ))}
          </div>

          {/* Phone fallback */}
          <div className="px-6 pb-6 pt-2 border-t border-neutral-100">
            <a
              href={COMPANY.phoneHref}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-secondary hover:text-accent-orange transition-colors font-heading"
            >
              <Phone size={16} />
              Prefer to call? {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>
    </EstimateModalContext.Provider>
  );
}

// ---- Trigger Button ----
interface EstimateButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  /** Lead-attribution label, e.g. "Header button". */
  source?: string;
}

export function EstimateButton({
  children = "Get Free Estimate",
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  source,
}: EstimateButtonProps) {
  const { open } = useEstimateModal();
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      onClick={() => open(ref.current, { source })}
      className={cn(
        BUTTON_BASE,
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  );
}
