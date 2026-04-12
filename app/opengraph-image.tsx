import { ImageResponse } from "next/og";
import { LOGO_WHITE_BASE64 } from "@/lib/logo-base64";

export const alt = "Gadget Construction — Built Right. On Time. Guaranteed.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Red accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#CC0000",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Logo */}
          <img
            src={LOGO_WHITE_BASE64}
            alt="Gadget Construction"
            width={400}
            height={170}
            style={{ objectFit: "contain" }}
          />

          {/* Divider */}
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#CC0000",
              borderRadius: "2px",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "4px",
            }}
          >
            BUILT RIGHT. ON TIME. GUARANTEED.
          </div>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "16px",
              padding: "16px 40px",
              borderRadius: "12px",
              background: "#CC0000",
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            Get Your Free Estimate — (628) 233-3589
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            display: "flex",
            gap: "24px",
            fontSize: "14px",
            color: "rgba(255,255,255,0.35)",
            fontWeight: 500,
          }}
        >
          <span>CA License #1132983</span>
          <span>|</span>
          <span>500+ Projects</span>
          <span>|</span>
          <span>12+ Years</span>
          <span>|</span>
          <span>5-Year Warranty</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
