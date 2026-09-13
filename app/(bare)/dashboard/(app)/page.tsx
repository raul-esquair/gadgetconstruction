import type { Metadata } from "next";
import { listRequests } from "@/lib/reviews/queries";
import { todayInBusinessTz } from "@/lib/reviews/dates";
import { COMPANY } from "@/lib/constants";
import AddRequestForm from "./AddRequestForm";
import RequestsTable from "./RequestsTable";

export const metadata: Metadata = {
  title: "Review Requests",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let requests: Awaited<ReturnType<typeof listRequests>> = [];
  let loadError: string | null = null;

  try {
    requests = await listRequests();
  } catch (err) {
    console.error("Dashboard load failed:", err);
    loadError = "Could not reach the database. Check DATABASE_URL on the server.";
  }

  const active = requests.filter((r) => r.status === "active").length;
  const responded = requests.filter((r) => r.respondedAt !== null).length;
  const sent = requests.filter((r) => r.touchCount > 0).length;
  const responseRate = sent > 0 ? Math.round((responded / sent) * 100) : null;

  const stats = [
    { label: "Active sequences", value: String(active) },
    { label: "Contacted", value: String(sent) },
    { label: "Responded", value: String(responded) },
    { label: "Response rate", value: responseRate === null ? "—" : `${responseRate}%` },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold">Review Requests</h1>
        <p className="mt-2 text-neutral-400">
          Add a customer after a job wraps. They get up to three emails from{" "}
          {COMPANY.ownerFirstName}, and any response stops the rest automatically.
        </p>
      </div>

      {loadError && (
        <p className="rounded-lg border border-accent-red/30 bg-accent-red/5 px-4 py-3 text-sm text-accent-red">
          {loadError}
        </p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-neutral-200 bg-white px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-300">{s.label}</p>
            <p className="mt-1 font-heading text-2xl font-bold text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <AddRequestForm today={todayInBusinessTz()} />

      <RequestsTable requests={requests} siteUrl={COMPANY.url} />
    </div>
  );
}
