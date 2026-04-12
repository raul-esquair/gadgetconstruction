import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  preContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  preContent,
  children,
  className,
}: PageHeaderProps) {
  return (
    <section
      data-page-header
      className={cn(
        "bg-primary text-white -mt-20 md:-mt-24 pt-28 md:pt-36 pb-16 md:pb-20",
        className
      )}
    >
      <Container>
        <div className="max-w-3xl">
          {preContent}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight font-heading"
            style={{ color: "#ffffff" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-xl text-white/70">{subtitle}</p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
