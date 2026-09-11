// Generates lib/blur-map.json — a path → base64-blurDataURL lookup used by
// next/image throughout the site. Run after adding/changing images:
//   npm run blur:gen
// Also runs automatically before `npm run build` via the `prebuild` script.

import { getPlaiceholder } from "plaiceholder";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const PUBLIC = path.join(process.cwd(), "public");

// Folders to scan (non-recursive). Everything lives flat in public/images on
// this project; add subfolders here if that ever changes.
const FOLDERS = ["images"];

const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// Logos are transparent PNGs — a blur placeholder behind them renders as a
// grey smear rather than a soft preview, so they're excluded.
const SKIP = new Set(["/images/logo.png", "/images/logo-white.png"]);

async function findImages() {
  const result = [];
  for (const folder of FOLDERS) {
    const dir = path.join(PUBLIC, folder);
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      continue; // folder doesn't exist; that's fine
    }
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      if (!EXTS.has(path.extname(entry.name).toLowerCase())) continue;
      result.push(path.join(folder, entry.name));
    }
  }
  return result;
}

async function main() {
  const files = await findImages();
  const map = {};

  for (const file of files) {
    const webPath = "/" + file.split(path.sep).join("/");
    if (SKIP.has(webPath)) continue;
    const raw = await fs.readFile(path.join(PUBLIC, file));
    // Phone photos carry an EXIF orientation tag: the pixels are stored one
    // way and a viewer is expected to rotate them. next/image honours that
    // tag, so the rendered image is upright — but plaiceholder does not, so
    // the placeholder was generated from the UNrotated pixels. That put a
    // landscape blur under a portrait photo: a sideways smear that snapped
    // upright on load. sharp's .rotate() with no argument applies the EXIF
    // orientation and strips the tag, so the placeholder matches what
    // next/image will actually paint.
    const buffer = await sharp(raw).rotate().toBuffer();
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    map[webPath] = base64;
  }

  const outPath = path.join(process.cwd(), "lib", "blur-map.json");
  await fs.writeFile(outPath, JSON.stringify(map, null, 2) + "\n");
  console.log(
    `  → wrote ${Object.keys(map).length} entries to ${path.relative(process.cwd(), outPath)}`,
  );
}

main().catch((err) => {
  console.error("blur:gen failed:", err);
  process.exit(1);
});
