import { cn } from "@/lib/utils";

interface BBBSealProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: { width: 120, height: 84 },
  md: { width: 160, height: 112 },
  lg: { width: 187, height: 130 },
};

export default function BBBSeal({ className, size = "md" }: BBBSealProps) {
  const { width, height } = SIZE_MAP[size];
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
        width={width}
        height={height}
        style={{ border: 0 }}
      />
    </a>
  );
}
