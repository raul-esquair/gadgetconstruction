import { cn } from "@/lib/utils";

type SectionBackground = "white" | "light" | "dark" | "gradient";

interface SectionWrapperProps {
  children: React.ReactNode;
  background?: SectionBackground;
  className?: string;
  id?: string;
}

const backgroundStyles: Record<SectionBackground, string> = {
  white: "bg-white",
  light: "bg-neutral-50",
  dark: "bg-primary text-white",
  gradient: "bg-gradient-to-br from-primary to-neutral-700 text-white",
};

export default function SectionWrapper({
  children,
  background = "white",
  className,
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-20",
        backgroundStyles[background],
        className
      )}
    >
      {children}
    </section>
  );
}
