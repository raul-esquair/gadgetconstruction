import { ImageResponse } from "next/og";
import { COMPANY } from "@/lib/constants";
import { LOGO_WHITE_BASE64 } from "@/lib/logo-base64";

/**
 * The page is noindex, but its link gets texted — so this card, in the
 * iMessage/WhatsApp preview, is the first thing a customer sees of it.
 * Messaging apps cache these hard; append ?v=N to force a fresh preview.
 *
 * Satori gotcha: any <div> with more than one child needs an explicit
 * `display`, and interpolating a value next to bare text makes two children —
 * build such copy as one template string.
 */
export const alt = `How did we do? Share your experience with ${COMPANY.shortName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RED = "#CC0000";
const MUTED = "rgba(255, 255, 255, 0.6)";

// Same four filled faces as the page, as SVG data URIs (Satori renders <img>
// data URIs reliably). ⚠️ Keep in sync with OPTIONS, FEATURES and MOUTHS in
// FeedbackPageContent.tsx.
const FEATURES = "#1F2937";

function faceUri(color: string, mouth: string, arcEyes = false) {
  const eyes = arcEyes
    ? `<path d="M14 20 Q17.5 16.5 21 20"/><path d="M27 20 Q30.5 16.5 34 20"/>`
    : `<circle cx="17.5" cy="19.5" r="2.4" fill="${FEATURES}" stroke="none"/><circle cx="30.5" cy="19.5" r="2.4" fill="${FEATURES}" stroke="none"/>`;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" ` +
    `stroke="${FEATURES}" stroke-width="2.6" stroke-linecap="round">` +
    `<circle cx="24" cy="24" r="22" fill="${color}" stroke="none"/>${eyes}<path d="${mouth}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const FACES = [
  { color: "#EF4444", uri: faceUri("#EF4444", "M15 34 Q24 25 33 34") },
  { color: "#FACC15", uri: faceUri("#FACC15", "M15 31.5 Q24 27.5 33 31.5") },
  { color: "#4ADE80", uri: faceUri("#4ADE80", "M15 28 Q24 34 33 28") },
  { color: "#16A34A", uri: faceUri("#16A34A", "M14 27 Q24 38 34 27", true) },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: RED }} />

        <div style={{ display: "flex" }}>
          <img src={LOGO_WHITE_BASE64} width={300} height={129} alt={COMPANY.shortName} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
            How did we do?
          </div>
          <div style={{ fontSize: 32, color: MUTED, marginTop: 22 }}>
            {`${COMPANY.ownerFirstName} reads every one of these personally. It takes about thirty seconds.`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.14)",
            paddingTop: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            {FACES.map((face) => (
              <img key={face.color} src={face.uri} width={78} height={78} alt="" />
            ))}
          </div>
          <div style={{ fontSize: 21, color: MUTED, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>
            gadgetconstructionsf.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
