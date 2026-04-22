import { cn } from "@/lib/utils";

interface BBBSealProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "max-w-[110px]",
  md: "max-w-[120px] md:max-w-[160px]",
  lg: "max-w-[130px] md:max-w-[187px]",
};

export default function BBBSeal({ className, size = "md" }: BBBSealProps) {
  return (
    <a
      href="https://www.bbb.org/us/ca/san-francisco/profile/general-contractor/gadget-construction-inc-1116-981771/#sealclick"
      target="_blank"
      rel="nofollow noopener"
      className={cn(
        "inline-block transition-transform duration-200 hover:scale-105",
        className,
      )}
      aria-label="Verify Gadget Construction BBB Business Review"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://seal-goldengate.bbb.org/seals/blue-seal-187-130-bbb-981771.png"
        alt="Gadget Construction, Inc. BBB Business Review"
        width={187}
        height={130}
        className={cn("h-auto", SIZE_CLASSES[size])}
        style={{ border: 0 }}
      />
    </a>
  );
}
