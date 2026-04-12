import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns a context-aware booking urgency string based on the current date.
 * Shows the upcoming season + year, looking ~1-2 months ahead.
 */
export function getBookingUrgency(): string {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  const year = now.getFullYear();

  // Determine which season we're booking INTO (1-2 months ahead)
  // Jan-Mar → Spring (same year)
  // Apr-Jun → Summer (same year)
  // Jul-Sep → Fall (same year)
  // Oct-Dec → Winter (next year for Dec, same year otherwise... just use next year label)
  let season: string;
  let bookingYear: number;

  if (month <= 2) {
    season = "Spring";
    bookingYear = year;
  } else if (month <= 5) {
    season = "Summer";
    bookingYear = year;
  } else if (month <= 8) {
    season = "Fall";
    bookingYear = year;
  } else {
    season = "Winter";
    bookingYear = year + 1;
  }

  return `Limited availability — currently booking for ${season} ${bookingYear}`;
}
