"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { X, Phone } from "lucide-react";
import MultiStepForm from "@/components/ui/MultiStepForm";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

// ---- Context ----
interface EstimateModalContextType {
  open: () => void;
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
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) close();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  return (
    <EstimateModalContext.Provider value={{ open, close, isOpen }}>
      {children}

      {/* Modal Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300",
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Get a free estimate"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={close}
        />

        {/* Modal Content */}
        <div
          className={cn(
            "relative w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl transition-all duration-300",
            isOpen
              ? "scale-100 translate-y-0"
              : "scale-95 translate-y-4"
          )}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} className="text-neutral-500" />
          </button>

          {/* Header */}
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-xl font-extrabold font-heading text-primary pr-8">
              Get Your Free Estimate
            </h2>
            <p className="text-sm text-secondary mt-1">
              Three quick steps — takes under 30 seconds. We respond in minutes.
            </p>
          </div>

          {/* Form */}
          <div className="px-6 pb-4">
            <MultiStepForm variant="light" onSuccess={() => {}} />
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
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

export function EstimateButton({
  children = "Get Free Estimate",
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: EstimateButtonProps) {
  const { open } = useEstimateModal();

  const variantStyles = {
    primary:
      "btn-concrete text-primary border border-metallic-dark/30",
    secondary:
      "bg-primary text-white hover:bg-neutral-700",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost:
      "text-primary hover:bg-neutral-100",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={open}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg transition-all duration-200 cursor-pointer whitespace-normal sm:whitespace-nowrap text-center",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  );
}
