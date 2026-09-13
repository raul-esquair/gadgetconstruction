import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/guard";
import BareLogo from "@/components/ui/BareLogo";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

// Reads cookies — must never be prerendered.
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/dashboard");

  return (
    <section className="min-h-dvh flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <BareLogo className="mb-10" />
        <div className="bg-white rounded-2xl border border-neutral-200 p-7 sm:p-8 shadow-sm">
          <h1 className="text-2xl font-heading font-bold mb-1">Dashboard</h1>
          <p className="text-sm text-neutral-400 mb-6">Enter the password to continue.</p>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
