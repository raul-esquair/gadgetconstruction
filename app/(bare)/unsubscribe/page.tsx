import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";
import { getRequestByToken } from "@/lib/reviews/queries";
import BareLogo from "@/components/ui/BareLogo";
import UnsubscribeForm from "./UnsubscribeForm";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t: token } = await searchParams;

  let email: string | null = null;
  if (token) {
    try {
      email = (await getRequestByToken(token))?.email ?? null;
    } catch (err) {
      console.error("Unsubscribe lookup failed:", err);
    }
  }

  return (
    <section className="min-h-dvh flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-md text-center">
        <BareLogo className="mb-10" />
        <UnsubscribeForm token={token ?? ""} email={email} />
        <p className="mt-12 text-xs text-neutral-300">
          {COMPANY.name} &middot; CA Lic. #{COMPANY.license}
        </p>
      </div>
    </section>
  );
}
