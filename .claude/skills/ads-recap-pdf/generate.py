"""
Generate a client-facing Google Ads recap PDF from a payload JSON.

Usage:
  python3 generate.py --payload <path> --output <path>

Payload schema — see .claude/skills/ads-recap-pdf/SKILL.md for full spec.
The Python script does all the formatting. Claude produces only the payload JSON.
"""

import argparse
import json
from pathlib import Path

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    HRFlowable,
)

BRAND_DARK = colors.HexColor("#222222")
BRAND_RED = colors.HexColor("#CC0000")
BRAND_GREY = colors.HexColor("#666666")
BRAND_LIGHT = colors.HexColor("#F5F5F5")
BRAND_BORDER = colors.HexColor("#E0E0E0")


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="BrandTitle", fontName="Helvetica-Bold", fontSize=22, leading=26,
                              textColor=BRAND_DARK, alignment=TA_LEFT, spaceAfter=2))
    styles.add(ParagraphStyle(name="BrandSubtitle", fontName="Helvetica", fontSize=11, leading=14,
                              textColor=BRAND_GREY, alignment=TA_LEFT, spaceAfter=14))
    styles.add(ParagraphStyle(name="SectionHeader", fontName="Helvetica-Bold", fontSize=13, leading=16,
                              textColor=BRAND_RED, alignment=TA_LEFT, spaceBefore=14, spaceAfter=6))
    styles.add(ParagraphStyle(name="Body", fontName="Helvetica", fontSize=10, leading=14,
                              textColor=BRAND_DARK, alignment=TA_LEFT, spaceAfter=6))
    styles.add(ParagraphStyle(name="BodySmall", fontName="Helvetica", fontSize=9, leading=12,
                              textColor=BRAND_GREY, alignment=TA_LEFT, spaceAfter=6))
    styles.add(ParagraphStyle(name="Callout", fontName="Helvetica-Bold", fontSize=10, leading=14,
                              textColor=BRAND_DARK, alignment=TA_LEFT, spaceAfter=6))
    styles.add(ParagraphStyle(name="FindingLabel", fontName="Helvetica-Bold", fontSize=10, leading=14,
                              textColor=BRAND_RED, alignment=TA_LEFT, spaceBefore=8, spaceAfter=2))
    return styles


def divider():
    return HRFlowable(width="100%", thickness=0.5, color=BRAND_BORDER, spaceBefore=6, spaceAfter=10)


def metric_table(rows, col_widths=None):
    tbl = Table(rows, colWidths=col_widths or [2.2 * inch, 3.0 * inch], hAlign="LEFT")
    tbl.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("TEXTCOLOR", (0, 0), (0, -1), BRAND_GREY),
        ("TEXTCOLOR", (1, 0), (1, -1), BRAND_DARK),
        ("FONTNAME", (1, 0), (1, -1), "Helvetica-Bold"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("LINEBELOW", (0, 0), (-1, -2), 0.25, BRAND_BORDER),
        ("ALIGN", (1, 0), (1, -1), "LEFT"),
    ]))
    return tbl


def data_table(header, rows, col_widths):
    data = [header] + rows
    tbl = Table(data, colWidths=col_widths, hAlign="LEFT")
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), BRAND_DARK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("ALIGN", (0, 0), (-1, 0), "CENTER"),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
        ("TOPPADDING", (0, 0), (-1, 0), 8),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("TEXTCOLOR", (0, 1), (-1, -1), BRAND_DARK),
        ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
        ("ALIGN", (0, 1), (0, -1), "LEFT"),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 6),
        ("TOPPADDING", (0, 1), (-1, -1), 6),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BRAND_LIGHT]),
        ("LINEBELOW", (0, 0), (-1, -1), 0.25, BRAND_BORDER),
        ("BOX", (0, 0), (-1, -1), 0.5, BRAND_BORDER),
    ]))
    return tbl


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BRAND_RED)
    canvas.rect(0, LETTER[1] - 0.25 * inch, LETTER[0], 0.25 * inch, fill=1, stroke=0)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(BRAND_GREY)
    canvas.drawCentredString(LETTER[0] / 2, 0.5 * inch, f"Page {canvas.getPageNumber()}")
    canvas.drawString(0.75 * inch, 0.5 * inch, "Gadget Construction Inc. · CA Lic #1132983")
    canvas.drawRightString(LETTER[0] - 0.75 * inch, 0.5 * inch, "gadgetconstructionsf.com")
    canvas.restoreState()


def build_pdf(data, output_path):
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=LETTER,
        leftMargin=0.75 * inch, rightMargin=0.75 * inch,
        topMargin=0.85 * inch, bottomMargin=0.75 * inch,
        title=f"Google Ads Recap — {data.get('period_label', '')}",
        author="Gadget Construction Inc.",
    )

    S = build_styles()
    flow = []

    # Header
    flow.append(Paragraph("Google Ads Campaign Recap", S["BrandTitle"]))
    flow.append(Paragraph(
        f"Gadget Construction Inc. &nbsp;·&nbsp; {data['period_label']}",
        S["BrandSubtitle"]
    ))
    flow.append(divider())

    # Executive Summary
    flow.append(Paragraph("Executive Summary", S["SectionHeader"]))
    flow.append(Paragraph(data["executive_summary"], S["Body"]))

    # Continuity note from last report, if provided
    if data.get("continuity_note"):
        flow.append(Paragraph("Since Last Report", S["SectionHeader"]))
        flow.append(Paragraph(data["continuity_note"], S["Body"]))

    # Performance
    perf = data.get("performance") or {}
    if perf:
        flow.append(Paragraph("Performance Snapshot", S["SectionHeader"]))

        if perf.get("account_totals"):
            flow.append(Paragraph("<b>Account-Wide Totals</b>", S["Body"]))
            flow.append(metric_table(perf["account_totals"]))
            flow.append(Spacer(1, 12))

        if perf.get("by_campaign"):
            flow.append(Paragraph("<b>By Campaign</b>", S["Body"]))
            flow.append(data_table(
                header=perf["by_campaign"]["header"],
                rows=perf["by_campaign"]["rows"],
                col_widths=_col_widths_for(perf["by_campaign"]["header"]),
            ))
            flow.append(Spacer(1, 10))

        if perf.get("by_ad_group"):
            flow.append(Paragraph("<b>By Ad Group</b>", S["Body"]))
            flow.append(data_table(
                header=perf["by_ad_group"]["header"],
                rows=perf["by_ad_group"]["rows"],
                col_widths=_col_widths_for(perf["by_ad_group"]["header"]),
            ))

        flow.append(PageBreak())

    # Findings
    if data.get("findings"):
        flow.append(Paragraph("What the Data Revealed", S["SectionHeader"]))
        for f in data["findings"]:
            flow.append(Paragraph(f["label"], S["FindingLabel"]))
            flow.append(Paragraph(f["body"], S["Body"]))
            if f.get("callout"):
                flow.append(Paragraph(f["callout"], S["Callout"]))

    # Actions Completed
    if data.get("actions_completed"):
        flow.append(Paragraph("Actions Completed This Session", S["SectionHeader"]))
        for item in data["actions_completed"]:
            flow.append(Paragraph(f"✓&nbsp;&nbsp;{item}", S["Body"]))

    # Landing Page Pricing — for client verification
    if data.get("landing_page_pricing"):
        lp = data["landing_page_pricing"]
        flow.append(PageBreak())
        flow.append(Paragraph(
            lp.get("section_title", "Landing Page Pricing — For Your Verification"),
            S["SectionHeader"]
        ))
        if lp.get("intro"):
            flow.append(Paragraph(lp["intro"], S["Body"]))
            flow.append(Spacer(1, 8))
        for page in lp.get("pages", []):
            flow.append(Paragraph(
                f"<b>{page['title']}</b>"
                + (f" &nbsp;<font color='#666666'>{page['url']}</font>" if page.get("url") else ""),
                S["Body"]
            ))
            if page.get("header") and page.get("rows"):
                flow.append(data_table(
                    header=page["header"],
                    rows=page["rows"],
                    col_widths=_col_widths_for(page["header"]),
                ))
            flow.append(Spacer(1, 14))

    # Actions Pending — on own page if we have lots going on
    if data.get("actions_pending") or data.get("expectations"):
        flow.append(PageBreak())

    if data.get("actions_pending"):
        flow.append(Paragraph("Actions Pending Before Next Review", S["SectionHeader"]))
        for item in data["actions_pending"]:
            flow.append(Paragraph(f"→&nbsp;&nbsp;{item}", S["Body"]))

    # Expectations
    if data.get("expectations"):
        flow.append(Paragraph("What to Expect Next", S["SectionHeader"]))
        for item in data["expectations"]:
            flow.append(Paragraph(f"•&nbsp;&nbsp;{item}", S["Body"]))

    # Next Review
    if data.get("next_review"):
        flow.append(Paragraph("Next Performance Review", S["SectionHeader"]))
        flow.append(Paragraph(data["next_review"], S["Body"]))

    # Footer
    flow.append(Spacer(1, 18))
    flow.append(divider())
    footer = data.get("footer_note") or (
        f"Prepared {data.get('report_date', '')}. "
        "Data source: Google Ads live API (Customer ID 849-587-5417)."
    )
    flow.append(Paragraph(footer, S["BodySmall"]))

    doc.build(flow, onFirstPage=header_footer, onLaterPages=header_footer)


def _col_widths_for(header):
    """Allocate column widths based on header column count. First col is wide."""
    n = len(header)
    total = 7.0 * inch
    if n <= 1:
        return [total]
    first = 2.4 * inch if n >= 4 else 3.0 * inch
    rest = (total - first) / (n - 1)
    return [first] + [rest] * (n - 1)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--payload", required=True, help="Path to JSON payload with report data")
    ap.add_argument("--output", required=True, help="Path to write the output PDF")
    args = ap.parse_args()

    payload_path = Path(args.payload)
    output_path = Path(args.output)

    data = json.loads(payload_path.read_text())
    output_path.parent.mkdir(parents=True, exist_ok=True)
    build_pdf(data, output_path)

    print(f"Generated: {output_path}")
    print(f"Size: {output_path.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
