import Image from "next/image";
import { cn } from "@/lib/utils";

export const BBB_PROFILE_URL =
  "https://www.bbb.org/us/ca/san-francisco/profile/general-contractor/gadget-construction-inc-1116-981771/#sealclick";

const SIZE_CLASSES = {
  sm: "h-10",
  md: "h-9 md:h-12",
  lg: "h-14 md:h-20",
};

interface BBBBadgeProps {
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
  /**
   * A repeated copy (the TrustBar's second pass through its loop): hidden from
   * assistive tech and the tab order, so the link is announced once.
   */
  duplicate?: boolean;
}

/**
 * Static "Accredited Business" mark linking to the BBB profile. Deliberately
 * not BBB's live seal image (`BBBSeal`), which renders the current letter grade.
 */
export default function BBBBadge({ size = "md", className, duplicate = false }: BBBBadgeProps) {
  return (
    <a
      href={BBB_PROFILE_URL}
      target="_blank"
      rel="nofollow noopener"
      aria-label="Gadget Construction is a BBB Accredited Business — view our BBB profile"
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      className={cn(
        "inline-flex shrink-0 items-center rounded-md transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange",
        className
      )}
    >
      <Image
        src="/images/bbb-accredited.webp"
        alt=""
        width={400}
        height={150}
        // max-w-none: preflight's img max-width:100% lets a flex parent shrink
        // this slot to its padding, and the badge then overflows its neighbour.
        className={cn("w-auto max-w-none", SIZE_CLASSES[size])}
        sizes="216px"
      />
    </a>
  );
}
