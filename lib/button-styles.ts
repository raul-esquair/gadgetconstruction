/**
 * Shared button styling.
 *
 * `Button` and `EstimateButton` are separate components (one polymorphic and
 * server-rendered, one a client modal trigger) and they had silently drifted:
 * the primary CTA on the site was missing the press feedback the secondary one
 * had. Both now compose from here, so a change lands on both or neither.
 *
 * Press feedback is on :active — visible the instant the pointer goes down,
 * not on release. That instant response is what makes a control feel direct.
 */

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg cursor-pointer whitespace-normal sm:whitespace-nowrap text-center " +
  "transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-out " +
  "hover:scale-[1.02] active:scale-[0.98] " +
  "motion-reduce:transition-[background-color,color,border-color] motion-reduce:hover:scale-100 motion-reduce:active:scale-100";

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "btn-concrete text-primary border border-metallic-dark/30",
  secondary: "bg-primary text-white hover:bg-neutral-700 active:bg-neutral-600",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-primary hover:bg-neutral-100 active:bg-neutral-200",
};

export const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};
