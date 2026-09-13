import Image from "next/image";
import { COMPANY } from "@/lib/constants";
import { blurProps } from "@/lib/blur";
import { cn } from "@/lib/utils";

/**
 * The dark logo, centred, for pages that render without the site header
 * (lib/bare-routes.ts). A bare page without branding reads as a phishing form.
 */
export default function BareLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center", className)}>
      <Image
        src="/images/logo.png"
        alt={COMPANY.name}
        width={798}
        height={341}
        priority
        sizes="(max-width: 768px) 220px, 260px"
        className="w-[220px] md:w-[260px] h-auto"
        {...blurProps("/images/logo.png")}
      />
    </div>
  );
}
