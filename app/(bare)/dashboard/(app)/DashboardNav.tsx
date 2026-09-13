"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/dashboard", label: "Customers" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className="flex items-center gap-1">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active ? "bg-neutral-100 text-primary" : "text-neutral-400 hover:text-primary",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
