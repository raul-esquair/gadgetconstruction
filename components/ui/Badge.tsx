import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "dark";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  default: "bg-neutral-100 text-secondary",
  accent: "bg-accent-orange/10 text-accent-orange",
  dark: "bg-primary text-white",
};

const sizeStyles = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
