/**
 * Pages rendered without the site chrome — see lib/bare-routes.ts, which is
 * what actually hides the Header, Footer and MobileBottomBar. This layout only
 * cancels `<main>`'s header padding, the same way app/lp/layout.tsx does.
 */
export default function BareLayout({ children }: { children: React.ReactNode }) {
  return <div className="-mt-20 md:-mt-24 min-h-dvh bg-neutral-50">{children}</div>;
}
