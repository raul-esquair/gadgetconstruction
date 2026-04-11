import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import JsonLd, { breadcrumbSchema } from "./JsonLd";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = [
    { name: "Home", url: "/" },
    ...items.map((item) => ({ name: item.label, url: item.href })),
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center gap-1.5 text-sm text-neutral-400">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-accent-orange transition-colors"
            >
              <Home size={14} />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1.5">
              <ChevronRight size={14} className="text-neutral-300" />
              {index === items.length - 1 ? (
                <span className="text-primary font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-accent-orange transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
