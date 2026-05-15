"""Generate a client-facing PDF of the backlink plan.

Run from repo root:
  python3 scripts/generate-backlink-pdf.py
"""

from pathlib import Path

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    HRFlowable,
    ListFlowable,
    ListItem,
    KeepTogether,
)

BRAND_DARK = colors.HexColor("#222222")
BRAND_RED = colors.HexColor("#CC0000")
BRAND_GREY = colors.HexColor("#666666")
BRAND_LIGHT = colors.HexColor("#F5F5F5")
BRAND_BORDER = colors.HexColor("#E0E0E0")
BRAND_GREEN = colors.HexColor("#1F7A3F")


def build_styles():
    base = getSampleStyleSheet()
    styles = {}
    styles["Title"] = ParagraphStyle(
        name="Title", fontName="Helvetica-Bold", fontSize=24, leading=28,
        textColor=BRAND_DARK, alignment=TA_LEFT, spaceAfter=4)
    styles["Subtitle"] = ParagraphStyle(
        name="Subtitle", fontName="Helvetica", fontSize=11, leading=14,
        textColor=BRAND_GREY, alignment=TA_LEFT, spaceAfter=18)
    styles["H1"] = ParagraphStyle(
        name="H1", fontName="Helvetica-Bold", fontSize=16, leading=20,
        textColor=BRAND_DARK, alignment=TA_LEFT, spaceBefore=18, spaceAfter=6)
    styles["H2"] = ParagraphStyle(
        name="H2", fontName="Helvetica-Bold", fontSize=13, leading=16,
        textColor=BRAND_RED, alignment=TA_LEFT, spaceBefore=14, spaceAfter=4)
    styles["H3"] = ParagraphStyle(
        name="H3", fontName="Helvetica-Bold", fontSize=11, leading=14,
        textColor=BRAND_DARK, alignment=TA_LEFT, spaceBefore=10, spaceAfter=3)
    styles["Body"] = ParagraphStyle(
        name="Body", fontName="Helvetica", fontSize=10, leading=14,
        textColor=BRAND_DARK, alignment=TA_LEFT, spaceAfter=5)
    styles["BodySmall"] = ParagraphStyle(
        name="BodySmall", fontName="Helvetica", fontSize=9, leading=12,
        textColor=BRAND_GREY, alignment=TA_LEFT, spaceAfter=5)
    styles["Callout"] = ParagraphStyle(
        name="Callout", fontName="Helvetica-Oblique", fontSize=10, leading=14,
        textColor=BRAND_DARK, alignment=TA_LEFT, spaceAfter=8,
        leftIndent=10, rightIndent=10, borderPadding=8,
        backColor=BRAND_LIGHT, borderColor=BRAND_RED, borderWidth=0)
    styles["Bullet"] = ParagraphStyle(
        name="Bullet", fontName="Helvetica", fontSize=10, leading=14,
        textColor=BRAND_DARK, alignment=TA_LEFT, spaceAfter=3,
        leftIndent=14, bulletIndent=2)
    styles["Footer"] = ParagraphStyle(
        name="Footer", fontName="Helvetica", fontSize=8, leading=10,
        textColor=BRAND_GREY, alignment=TA_LEFT)
    return styles


S = build_styles()


def p(text, style="Body"):
    return Paragraph(text, S[style])


def bullets(items, style="Bullet"):
    return ListFlowable(
        [ListItem(Paragraph(t, S[style]), leftIndent=10, value="•") for t in items],
        bulletType="bullet", bulletColor=BRAND_RED, leftIndent=12,
    )


def hr():
    return HRFlowable(width="100%", thickness=0.5, color=BRAND_BORDER,
                      spaceBefore=8, spaceAfter=8)


def section_divider():
    return HRFlowable(width="40", thickness=2, color=BRAND_RED,
                      spaceBefore=2, spaceAfter=8, hAlign="LEFT")


def table(rows, col_widths, header=True, zebra=True):
    style = [
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("TEXTCOLOR", (0, 0), (-1, -1), BRAND_DARK),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LINEBELOW", (0, 0), (-1, -1), 0.25, BRAND_BORDER),
    ]
    if header:
        style += [
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("BACKGROUND", (0, 0), (-1, 0), BRAND_DARK),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
            ("TOPPADDING", (0, 0), (-1, 0), 8),
        ]
    if zebra and header:
        for i in range(1, len(rows)):
            if i % 2 == 0:
                style.append(("BACKGROUND", (0, i), (-1, i), BRAND_LIGHT))
    wrapped = [[Paragraph(c, S["BodySmall"]) if isinstance(c, str) else c for c in row] for row in rows]
    t = Table(wrapped, colWidths=col_widths, repeatRows=1 if header else 0)
    t.setStyle(TableStyle(style))
    return t


def header_block():
    rows = [
        [Paragraph("<b>GADGET CONSTRUCTION INC.</b>", ParagraphStyle(
            name="hdr1", fontName="Helvetica-Bold", fontSize=10,
            textColor=BRAND_RED, alignment=TA_LEFT)),
         Paragraph("Backlink &amp; Off-Page SEO Plan", ParagraphStyle(
            name="hdr2", fontName="Helvetica", fontSize=10,
            textColor=BRAND_GREY, alignment=2))],
    ]
    t = Table(rows, colWidths=[3.5 * inch, 3.5 * inch])
    t.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LINEBELOW", (0, 0), (-1, -1), 1.5, BRAND_RED),
    ]))
    return t


def page_decorations(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(BRAND_GREY)
    canvas.drawString(0.75 * inch, 0.5 * inch,
                      "gadgetconstructionsf.com  ·  CSLB #1132983  ·  (650) 771-5817")
    canvas.drawRightString(LETTER[0] - 0.75 * inch, 0.5 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build():
    out_path = Path(__file__).resolve().parents[1] / "Gadget-Construction-Backlink-Plan.pdf"
    doc = SimpleDocTemplate(
        str(out_path), pagesize=LETTER,
        leftMargin=0.75 * inch, rightMargin=0.75 * inch,
        topMargin=0.75 * inch, bottomMargin=0.75 * inch,
        title="Gadget Construction — Backlink Plan",
        author="Gadget Construction Inc.",
    )

    story = []

    # --- COVER ---
    story += [
        header_block(),
        Spacer(1, 0.4 * inch),
        p("BACKLINK &amp; OFF-PAGE SEO PLAN", "Title"),
        section_divider(),
        p("A phased plan to build domain authority and local relevance "
          "across the 31-city Bay Area service area.", "Subtitle"),
        Spacer(1, 0.15 * inch),
        p("<b>Prepared:</b> April 28, 2026", "Body"),
        p("<b>Site:</b> gadgetconstructionsf.com", "Body"),
        p("<b>Goal:</b> Lift organic rankings and qualified local "
          "traffic through high-authority, locally-relevant backlinks.", "Body"),
        Spacer(1, 0.25 * inch),
        Paragraph(
            "<b>Reality check.</b> For a local contractor, 30 high-quality, "
            "locally-relevant links beat 300 generic directory submissions. "
            "Volume is overrated. Relevance and proximity are everything. "
            "This plan is built around that principle.", S["Callout"]),
        Spacer(1, 0.15 * inch),
        p("Document overview", "H3"),
        bullets([
            "<b>Phase 0</b> — Foundation work that's non-negotiable.",
            "<b>Phase 1</b> — Free methods, ranked by ROI.",
            "<b>Phase 2</b> — Paid methods, ranked by ROI.",
            "<b>6-month action plan</b> — Month-by-month checklist.",
            "<b>Budget summary</b> — Three tiers from free-only to aggressive.",
            "<b>Measurement</b> — How we track results.",
        ]),
        PageBreak(),
    ]

    # --- PHASE 0 ---
    story += [
        p("PHASE 0", "H2"),
        p("Foundation (must-do before anything else)", "H1"),
        section_divider(),
        p("These are non-negotiable. They're free, they're table stakes, "
          "and skipping them wastes every other dollar spent further down the plan.", "Body"),
        Spacer(1, 0.1 * inch),
        table([
            ["Task", "Effort", "Notes"],
            ["<b>Google Business Profile</b> — fully optimized, every service category, weekly posts, 50+ photos, Q&amp;A populated",
             "2 hrs setup<br/>30 min/wk",
             "Highest single-source local-SEO lever."],
            ["<b>NAP consistency audit</b> — Name, Address, Phone identical everywhere",
             "1 hr",
             "Inconsistent NAP suppresses local rankings. Lock the format and use it everywhere."],
            ["<b>Citation cleanup</b> — Yelp, Bing Places, Apple Maps, BBB, Houzz, Buildzoom",
             "4 hrs",
             "Once. Then forget about most of them."],
            ["<b>CSLB license listing</b> — verify public profile is current and links to site",
             "15 min",
             "cslb.ca.gov public-facing page is a high-trust .gov inbound."],
        ], col_widths=[2.6 * inch, 1.0 * inch, 3.4 * inch]),
        PageBreak(),
    ]

    # --- PHASE 1 ---
    story += [
        p("PHASE 1", "H2"),
        p("Free methods, ranked by ROI", "H1"),
        section_divider(),

        p("Tier 1 — High ROI, low effort", "H3"),
        Spacer(1, 0.05 * inch),

        p("1. Manufacturer \"Find a Pro\" / certified-installer directories", "H3"),
        p("The single best link-building opportunity for a contractor. Each one is a "
          "do-follow link from a high-authority manufacturer site, plus they drive real leads.", "Body"),
        bullets([
            "<b>Trex Pro / TimberTech Pro</b> — composite decks",
            "<b>GAF Master Elite / CertainTeed Shingle Master</b> — roofing",
            "<b>James Hardie Preferred Contractor</b> — siding",
            "<b>Simpson Strong-Tie SST Pro</b> — foundations &amp; structural",
            "<b>Fiberon, Azek</b> — composite decking dealer locators",
            "<b>Owens Corning Preferred Contractor</b> — roofing",
        ]),
        Paragraph(
            "<b>Effort:</b> ~1 hr per application × 6-10 applications. "
            "<b>Result:</b> 6-10 high-DA, hyper-relevant links plus qualified leads. "
            "This alone is worth roughly 30% of the entire plan's value.",
            S["Callout"]),

        p("2. Local trade &amp; business associations", "H3"),
        bullets([
            "Marin Builders Association (paid tier ~$350/yr)",
            "Bay Area NAHB chapter",
            "SF, Marin, Berkeley, Oakland, or Palo Alto chambers — pick 2-3 cities with the most leads",
            "Build It Green (sustainable building network)",
        ]),

        p("3. Supplier &amp; vendor partner pages", "H3"),
        p("Every contractor has trusted suppliers — local lumber yards, concrete suppliers, "
          "ADU prefab partners. Many maintain \"preferred contractor\" pages. "
          "Ask: \"Will you list us as a contractor you work with?\" Most will. "
          "1 email × 10 suppliers = ~30% conversion.", "Body"),

        p("4. Architect &amp; designer partner pages", "H3"),
        p("Per the ADU pivot (\"We Work With Your Designer\"), Gadget already collaborates "
          "with architects. Ask each partner for a \"Trusted Builders\" listing, and "
          "reciprocate with a \"Designers We Work With\" section. Compound benefit: "
          "referral pipeline plus backlinks.", "Body"),

        PageBreak(),

        p("Tier 2 — Medium ROI, medium effort", "H3"),

        p("5. Digital PR &amp; local media pitching", "H3"),
        p("The Bay Area has dozens of local publications hungry for expert quotes. "
          "Dry rot, ADU permits, seismic retrofits, and El Niño storm prep are seasonal "
          "stories every year.", "Body"),
        p("<b>Targets:</b> SF Standard, SFGATE, Mission Local, Berkeleyside, The Bold Italic, "
          "Marin Independent Journal, East Bay Times, San Jose Spotlight, KQED housing desk.", "Body"),
        p("<b>Hooks:</b>", "Body"),
        bullets([
            "Most common dry rot problems in Eichler / Doelger / Victorian / Craftsman homes",
            "Bay Area ADU permit timeline by city — what to expect in 2026",
            "What every Bay Area homeowner should check before the rainy season",
            "Why Bay Area foundations fail differently than the rest of California",
        ]),
        p("<b>Tools:</b> Qwoted, Featured.com (free tiers — replaced HARO), Help A B2B Writer. "
          "<b>Cadence:</b> 2-3 pitches per week.", "Body"),

        p("6. Original data study (one-time, big payoff)", "H3"),
        p("Contractors almost never do this, which is why it works so well. Examples:", "Body"),
        bullets([
            "<b>Bay Area Dry Rot Index 2026</b> — analyze 100 inspections, map cost-per-zip, publish, pitch to media",
            "<b>ADU permit timeline by Bay Area city</b> — pull permit data from 31 cities, rank fastest to slowest",
            "<b>Cost to fix a Doelger</b> vs. <b>Cost to remodel an Eichler</b> — proprietary cost data nobody else has",
        ]),
        Paragraph(
            "Studies like this earn links for years. They get cited by real estate sites, "
            "blogs, news outlets, and increasingly AI answer engines like ChatGPT, Perplexity, "
            "and Google AI Overviews. <b>Recommended starting study:</b> ADU permit timeline by "
            "Bay Area city — uses public records, high media appeal, defensible methodology.",
            S["Callout"]),

        p("7. Local nonprofit &amp; community sponsorships (in-kind)", "H3"),
        p("Donate labor or materials to local causes — many list sponsors with backlinks.", "Body"),
        bullets([
            "Habitat for Humanity East Bay / Greater SF",
            "Rebuilding Together (SF, Peninsula, East Bay chapters)",
            "Local school auctions and PTAs in Tier-1 cities (Mill Valley, Berkeley, Palo Alto)",
        ]),

        p("8. Existing-content link reclamation", "H3"),
        p("Search Google for <i>\"Gadget Construction\" -site:gadgetconstructionsf.com</i> "
          "to surface unlinked brand mentions. Email site owners: \"Thanks for the mention — "
          "would you mind hyperlinking to us?\" ~40% conversion.", "Body"),

        PageBreak(),

        p("Tier 3 — Low ROI, do as fill", "H3"),

        p("9. Niche directories", "H3"),
        bullets([
            "Houzz — full portfolio with 50+ photos is its own ranking play",
            "Angi free profile, Thumbtack free profile, Porch, Networx",
            "Nextdoor business profile (per-neighborhood — free)",
            "Local Reddit AMAs — answer questions, link to relevant blog posts, never spam",
        ]),

        p("10. Forum &amp; Q&amp;A presence", "H3"),
        bullets([
            "Quora — answer \"best contractor in [city]\" or \"ADU questions in California\" with genuine expertise",
            "BiggerPockets forums — real estate investors hire contractors",
            "Reddit threads about Bay Area renovations",
        ]),
        p("Mostly no-follow links, but they drive referral traffic and brand visibility.", "BodySmall"),

        p("11. Resource-page link building", "H3"),
        p("Search <i>\"Bay Area contractors\" inurl:resources</i> or "
          "<i>\"general contractor\" + \"best of\" + 2026</i>. "
          "Email list owners asking for inclusion. One campaign per quarter.", "Body"),

        PageBreak(),
    ]

    # --- PHASE 2 ---
    story += [
        p("PHASE 2", "H2"),
        p("Paid methods, ranked by ROI", "H1"),
        section_divider(),

        p("Tier 1 — Highest ROI", "H3"),

        p("1. Sponsored content / advertorials on local publications", "H3"),
        p("<b>SF Standard, SFGATE, Mission Local, Berkeleyside</b> — sponsored articles run "
          "~$1,500-$5,000 per piece. Always negotiate do-follow links before booking.", "Body"),
        p("<b>Tip:</b> Write a genuinely useful piece (e.g., \"How Bay Area homeowners should "
          "think about dry rot\") rather than a sales puff. The link survives indefinitely; "
          "the puff piece gets unpublished after a year.", "Body"),
        p("<b>Budget:</b> $3-5K for 2-3 placements over 6 months.", "BodySmall"),

        p("2. Houzz Pro paid membership", "H3"),
        p("$65-$399/mo. Boosted profile, paid ads on Houzz, but more importantly: priority "
          "placement in their geo-locator and project gallery. The backlink alone is worth "
          "it given Houzz's domain rating.", "Body"),
        p("<b>Budget:</b> ~$3K/yr.", "BodySmall"),

        p("3. Manufacturer paid certifications", "H3"),
        p("These unlock the free backlinks in Phase 1.1.", "Body"),
        bullets([
            "GAF Master Elite (roofing) — $499/yr application + ongoing volume requirements",
            "CertainTeed Shingle Master Select — paid",
        ]),
        p("<b>Budget:</b> $1-2K/yr across 2-3 certifications.", "BodySmall"),

        Spacer(1, 0.1 * inch),
        p("Tier 2 — Targeted plays", "H3"),

        p("4. Digital PR agency or freelancer", "H3"),
        p("If in-house pitching is too time-consuming, hire a Bay Area-focused freelance "
          "digital PR person to handle media pitching at scale. Look for someone with "
          "bylines at SFGATE, KQED, or Curbed-era contributors.", "Body"),
        bullets([
            "<b>What good looks like:</b> 2-3 placements/quarter at DR 60+ publications",
            "<b>What to avoid:</b> agencies promising 20 links/mo for $500 — they use private blog networks Google penalizes",
        ]),
        p("<b>Budget:</b> $1.5-3K/mo. $9-18K/yr if engaged.", "BodySmall"),

        p("5. Local podcast sponsorships", "H3"),
        p("Bay Area real estate / home / lifestyle podcasts have small audiences but "
          "high-intent listeners. Many include website backlinks in show notes.", "Body"),
        p("<b>Budget:</b> $500-2K per placement.", "BodySmall"),

        p("6. Trade show / industry event presence", "H3"),
        bullets([
            "Pacific Coast Builders Conference (PCBC) — biggest Bay Area builder event",
            "Bay Area Build Expo",
            "Local home + garden shows",
        ]),
        p("Booth or sponsorship typically gets a website link on the event page (high authority).", "Body"),
        p("<b>Budget:</b> $2-10K depending on tier.", "BodySmall"),

        Spacer(1, 0.1 * inch),
        p("Tier 3 — Avoid or use carefully", "H3"),

        p("7. Link-building services &amp; guest-post agencies", "H3"),
        p("Most are scams or low-quality private blog networks. <b>Recommendation:</b> "
          "skip entirely unless you have a vetted Bay Area-specific operator.", "Body"),

        p("8. Press release distribution (PRWeb, Newswire)", "H3"),
        p("$200-500 per release. Mostly low-quality syndication. Only useful with a "
          "genuine news hook (new license, major project, expansion). <b>Skip in year 1.</b>", "Body"),

        PageBreak(),
    ]

    # --- 6-MONTH PLAN ---
    story += [
        p("6-MONTH ACTION PLAN", "H2"),
        p("Month-by-month checklist", "H1"),
        section_divider(),

        p("Month 1 — Foundation", "H3"),
        bullets([
            "Phase 0 entirely (GBP, NAP audit, citation cleanup, CSLB)",
            "Apply to Trex Pro, James Hardie, GAF (or CertainTeed), Simpson Strong-Tie installer programs",
            "Email 10 suppliers asking for partner-page link",
            "Email all current architect / designer partners asking for \"Trusted Builder\" listing",
        ]),
        p("<b>Cost:</b> $0  ·  <b>Time:</b> ~10 hrs total", "BodySmall"),

        p("Month 2 — Local authority push", "H3"),
        bullets([
            "Join 2 local chambers (SF + Marin or East Bay)",
            "Begin media pitching: 2 expert pitches per week via Qwoted / Featured.com",
            "Establish Reddit / Nextdoor / Quora presence — answer 5 questions per week",
        ]),
        p("<b>Cost:</b> ~$500-1K (chamber fees)  ·  <b>Time:</b> ~5 hrs/wk", "BodySmall"),

        p("Month 3 — Begin original data study", "H3"),
        bullets([
            "Scope and start: \"Bay Area ADU Permit Timeline by City\" (recommended)",
            "First sponsored advertorial in a Bay Area publication ($1.5-3K)",
        ]),
        p("<b>Cost:</b> ~$1.5-3K  ·  <b>Time:</b> ~10-15 hrs", "BodySmall"),

        p("Month 4 — Publish &amp; promote data study", "H3"),
        bullets([
            "Publish study on site with shareable graphics",
            "Pitch study to all media targets",
            "First nonprofit sponsorship (Rebuilding Together SF or Habitat East Bay)",
        ]),

        p("Month 5 — Scale media outreach", "H3"),
        bullets([
            "Decide: hire freelance digital PR person, or continue in-house",
            "Houzz Pro membership upgrade",
            "Audit results so far — which links drove traffic? Which didn't?",
        ]),

        p("Month 6 — Review and optimize", "H3"),
        bullets([
            "Backlink audit via Ahrefs / Semrush (free tier or one-month paid)",
            "Identify what's working, double down. Drop what isn't.",
            "Plan Year 2 based on data.",
        ]),
        PageBreak(),
    ]

    # --- BUDGET ---
    story += [
        p("BUDGET SUMMARY", "H2"),
        p("Three tiers", "H1"),
        section_divider(),
        table([
            ["Tier", "Annual Cost", "Time / Week", "What's included"],
            ["<b>Free-only</b><br/>(Phase 0 + Phase 1)",
             "$0",
             "6-10 hrs",
             "Foundation + manufacturer directories + media pitching + supplier outreach + nonprofit sponsorships"],
            ["<b>Free + Tier-1 paid</b><br/>(recommended starting point)",
             "$8-12K",
             "5-8 hrs",
             "Above + 2-3 sponsored advertorials + Houzz Pro + manufacturer certifications"],
            ["<b>Aggressive</b>",
             "$25-35K",
             "2-3 hrs",
             "Above + freelance digital PR ($1.5-3K/mo) + larger event sponsorships + expanded sponsored content"],
        ], col_widths=[1.7 * inch, 1.0 * inch, 0.9 * inch, 3.4 * inch]),
        Spacer(1, 0.1 * inch),
        Paragraph(
            "<b>Recommended starting tier:</b> Free + Tier-1 paid. Costs ~$10K/yr, "
            "generates 30-60 quality backlinks in Year 1, and pairs well with the "
            "Google Ads spend already planned.", S["Callout"]),
        Spacer(1, 0.2 * inch),

        p("MEASUREMENT", "H2"),
        p("Track monthly", "H1"),
        section_divider(),
        bullets([
            "<b>Total referring domains</b> — Ahrefs / Semrush / Google Search Console",
            "<b>Domain Rating / Authority Score</b> trend",
            "<b>Local pack rankings</b> for target keywords across 5 priority cities (SF, Mill Valley, Berkeley, Palo Alto, San Jose)",
            "<b>GBP insights</b> — search views, calls, direction requests",
            "<b>Referral traffic</b> to site from new backlinks (GA4)",
            "<b>Branded search volume</b> trend (proxy for off-site authority growth)",
        ]),
        Spacer(1, 0.2 * inch),

        p("WHAT NOT TO DO", "H2"),
        p("Common mistakes to avoid", "H1"),
        section_divider(),
        bullets([
            "<b>Don't buy links</b> from \"50 backlinks for $500\" sellers — these are PBNs, Google will penalize",
            "<b>Don't mass-submit</b> to 200 directories — most are low-quality and dilute the link profile. Stick to ~20 high-authority directories",
            "<b>Don't write guest posts</b> on irrelevant blogs — construction-and-real-estate-relevant only",
            "<b>Don't ignore the technical SEO foundation</b> — backlinks amplify what's already there",
            "<b>Don't chase Domain Rating as a vanity metric</b> — the goal is qualified local traffic that converts, not a higher Ahrefs DR",
        ]),
        Spacer(1, 0.3 * inch),
        hr(),
        Paragraph(
            "Prepared for Gadget Construction Inc. by the digital strategy team.<br/>"
            "Questions? Contact (650) 771-5817 or visit gadgetconstructionsf.com.",
            S["Footer"]),
    ]

    doc.build(story, onFirstPage=page_decorations, onLaterPages=page_decorations)
    print(f"PDF written to {out_path}")


if __name__ == "__main__":
    build()
