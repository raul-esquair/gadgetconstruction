import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth/guard";
import { COMPANY } from "@/lib/constants";
import { blurProps } from "@/lib/blur";
import { logout } from "@/lib/actions/dashboard-auth";
import DashboardNav from "./DashboardNav";

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

/**
 * Gates the *pages*. Server Actions are separately reachable endpoints, so
 * every action in lib/actions/review-requests.ts re-checks the session itself.
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) redirect("/dashboard/login");

  return (
    <div className="min-h-dvh">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/dashboard" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt={COMPANY.name}
              width={798}
              height={341}
              priority
              sizes="160px"
              className="w-[130px] sm:w-[160px] h-auto"
              {...blurProps("/images/logo.png")}
            />
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <DashboardNav />
            <form action={logout}>
              <button
                type="submit"
                className="px-2 py-2 text-sm text-neutral-400 hover:text-accent-orange transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 sm:py-12">{children}</div>
    </div>
  );
}
