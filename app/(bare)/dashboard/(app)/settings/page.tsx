import type { Metadata } from "next";
import { todayInBusinessTz } from "@/lib/reviews/dates";
import { defaultReplyTo } from "@/lib/reviews/dispatch";
import { getReviewSettings } from "@/lib/reviews/queries";
import type { ReviewSettings } from "@/lib/reviews/settings";
import PauseCard from "./PauseCard";
import SettingsForm from "./SettingsForm";

export const metadata: Metadata = {
  title: "Review Settings",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  let settings: ReviewSettings | null = null;
  try {
    settings = await getReviewSettings();
  } catch (err) {
    console.error("Settings load failed:", err);
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold">Settings</h1>
        <p className="mt-2 text-neutral-400">How your review emails go out, and what they say.</p>
      </div>

      {settings ? (
        <>
          <PauseCard paused={settings.paused} pausedAt={settings.pausedAt} skipWeekends={settings.skipWeekends} />
          <SettingsForm
            initial={settings}
            today={todayInBusinessTz()}
            defaultReplyTo={defaultReplyTo()}
            defaultAlertEmail={process.env.CONTACT_EMAIL || null}
            phoneAlerts={!!process.env.NTFY_TOPIC}
          />
        </>
      ) : (
        // No form without the real values: saving defaults over settings we
        // couldn't read would silently undo Osmin's changes.
        <p className="rounded-lg border border-accent-red/30 bg-accent-red/5 px-4 py-3 text-sm text-accent-red">
          Could not load your settings from the database. Nothing has changed &mdash; try again in a minute.
        </p>
      )}
    </div>
  );
}
