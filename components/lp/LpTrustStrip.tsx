import { ShieldCheck, Award, Clock, Wrench, Star, FileCheck } from "lucide-react";
import BBBSeal from "@/components/ui/BBBSeal";

const ITEMS = [
  { icon: Clock, label: "12+ Years in the Bay Area" },
  { icon: Wrench, label: "500+ Projects Completed" },
  { icon: Star, label: "5.0 Star Average Rating" },
  { icon: ShieldCheck, label: "CA License #1132983" },
  { icon: Award, label: "5-Year Workmanship Warranty" },
];

const ITEM_FIXED_PRICE = { icon: FileCheck, label: "Itemized Fixed-Price Quotes" };

interface LpTrustStripProps {
  hideWarranty?: boolean;
}

export default function LpTrustStrip({ hideWarranty = false }: LpTrustStripProps) {
  const items = hideWarranty
    ? [...ITEMS.slice(0, 4), ITEM_FIXED_PRICE]
    : ITEMS;
  return (
    <section className="bg-neutral-50 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
          <BBBSeal size="sm" className="shrink-0" />
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 flex-1 w-full">
            {items.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-secondary text-sm font-heading font-semibold"
              >
                <Icon size={20} className="text-accent-orange shrink-0" />
                <span className="leading-tight">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
