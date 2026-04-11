import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, href, className, hover = true }: CardProps) {
  const classes = cn(
    "rounded-xl border border-neutral-200 bg-white overflow-hidden",
    hover &&
      "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5",
    href && "cursor-pointer",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
