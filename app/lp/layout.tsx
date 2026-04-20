import LpStickyBar from "@/components/lp/LpStickyBar";

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mt-20 md:-mt-24 bg-white">
      {children}
      <LpStickyBar />
    </div>
  );
}
