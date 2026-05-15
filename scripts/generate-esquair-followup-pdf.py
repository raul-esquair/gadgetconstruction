"""Generate the Esquair Contractor Lead Follow-Up System PDF.

A reusable Esquair brand asset. Pages 1-12 are universal. Page 13 is the
per-client section — edit CLIENT_CONFIG below before running for a new pitch.

Run from repo root:
  python3 scripts/generate-esquair-followup-pdf.py
"""

from datetime import date
from pathlib import Path

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
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
    Flowable,
)


# =====================================================================
# CLIENT CONFIG — edit these fields before running for a new pitch
# =====================================================================
CLIENT_CONFIG = {
    "client_name": "Gadget Construction Inc.",
    "client_short": "Gadget Construction",
    "client_context": (
        "A Class B general contractor serving 31 cities across 6 Bay Area counties "
        "with 12+ years in market and 500+ projects completed. Average project value "
        "ranges from $15K (exterior repairs) to $400K+ (ADUs and complete remodels)."
    ),
    "client_pain_points": [
        "Lead volume is rising via Google Ads and SEO, but follow-up is manual and inconsistent",
        "No CRM or pipeline visibility — leads live in inbox + voicemail until someone gets to them",
        "Estimates sent but no structured follow-up means lost revenue on warm prospects",
        "No reactivation sequence for the 70%+ of leads that go cold without converting",
        "No post-job review/referral flow to compound the existing 500-project base",
    ],
    "client_opportunity": [
        ("Lead intake", "Instant SMS + call within 5 minutes of every form fill or call"),
        ("Pipeline", "GoHighLevel CRM with Gadget's 7-stage pipeline configured"),
        ("Follow-up", "Automated Day 0-7 + Day 30/90/180 sequences for unresponsive leads"),
        ("Post-estimate", "5-touch sequence to keep estimates active without nagging"),
        ("Reviews", "Auto-trigger Google review requests on job completion (compounds local SEO)"),
        ("Referrals", "30-day and 6-month referral asks — Gadget's 500+ past clients are an untapped channel"),
        ("Reporting", "Weekly dashboard to Raul: speed-to-lead, qualified rate, estimate-to-close, revenue"),
    ],
    "client_projection": {
        "current_close_rate": "8-12%",
        "target_close_rate": "20-25%",
        "avg_job_value": "$45,000",
        "monthly_lead_volume": "~30",
        "estimated_recovered_revenue": "$70K-$110K/mo",
    },
    "prepared_date": date.today().strftime("%B %Y"),
}


# =====================================================================
# BRAND SYSTEM — Esquair
# =====================================================================
ESQ_BLACK = colors.HexColor("#0A0A0A")
ESQ_INK = colors.HexColor("#111111")
ESQ_BLUE = colors.HexColor("#2563EB")
ESQ_BLUE_DEEP = colors.HexColor("#1E40AF")
ESQ_GREY = colors.HexColor("#525252")
ESQ_GREY_LIGHT = colors.HexColor("#737373")
ESQ_BORDER = colors.HexColor("#E5E5E5")
ESQ_BG = colors.HexColor("#FAFAFA")
ESQ_BG_DARK = colors.HexColor("#F5F5F5")
ESQ_GREEN = colors.HexColor("#059669")
ESQ_AMBER = colors.HexColor("#D97706")


def styles():
    return {
        "CoverEyebrow": ParagraphStyle(
            "CoverEyebrow", fontName="Helvetica-Bold", fontSize=10, leading=14,
            textColor=ESQ_BLUE, alignment=TA_LEFT, spaceAfter=8),
        "CoverTitle": ParagraphStyle(
            "CoverTitle", fontName="Helvetica-Bold", fontSize=36, leading=42,
            textColor=ESQ_INK, alignment=TA_LEFT, spaceAfter=12),
        "CoverSubtitle": ParagraphStyle(
            "CoverSubtitle", fontName="Helvetica", fontSize=14, leading=20,
            textColor=ESQ_GREY, alignment=TA_LEFT, spaceAfter=24),
        "CoverMeta": ParagraphStyle(
            "CoverMeta", fontName="Helvetica", fontSize=10, leading=14,
            textColor=ESQ_GREY, alignment=TA_LEFT, spaceAfter=4),
        "CoverMetaLabel": ParagraphStyle(
            "CoverMetaLabel", fontName="Helvetica-Bold", fontSize=9, leading=12,
            textColor=ESQ_BLUE, alignment=TA_LEFT, spaceAfter=2),
        "Eyebrow": ParagraphStyle(
            "Eyebrow", fontName="Helvetica-Bold", fontSize=9, leading=12,
            textColor=ESQ_BLUE, alignment=TA_LEFT, spaceAfter=4),
        "H1": ParagraphStyle(
            "H1", fontName="Helvetica-Bold", fontSize=22, leading=26,
            textColor=ESQ_INK, alignment=TA_LEFT, spaceAfter=6),
        "H2": ParagraphStyle(
            "H2", fontName="Helvetica-Bold", fontSize=14, leading=18,
            textColor=ESQ_INK, alignment=TA_LEFT, spaceBefore=14, spaceAfter=4),
        "H3": ParagraphStyle(
            "H3", fontName="Helvetica-Bold", fontSize=11, leading=14,
            textColor=ESQ_INK, alignment=TA_LEFT, spaceBefore=10, spaceAfter=3),
        "Body": ParagraphStyle(
            "Body", fontName="Helvetica", fontSize=10, leading=14,
            textColor=ESQ_INK, alignment=TA_LEFT, spaceAfter=6),
        "BodyMuted": ParagraphStyle(
            "BodyMuted", fontName="Helvetica", fontSize=9.5, leading=13,
            textColor=ESQ_GREY, alignment=TA_LEFT, spaceAfter=6),
        "BodySmall": ParagraphStyle(
            "BodySmall", fontName="Helvetica", fontSize=9, leading=12,
            textColor=ESQ_GREY, alignment=TA_LEFT, spaceAfter=4),
        "Stat": ParagraphStyle(
            "Stat", fontName="Helvetica-Bold", fontSize=42, leading=46,
            textColor=ESQ_BLUE, alignment=TA_LEFT, spaceAfter=4),
        "StatLabel": ParagraphStyle(
            "StatLabel", fontName="Helvetica-Bold", fontSize=10, leading=13,
            textColor=ESQ_INK, alignment=TA_LEFT, spaceAfter=2),
        "StatDesc": ParagraphStyle(
            "StatDesc", fontName="Helvetica", fontSize=9, leading=12,
            textColor=ESQ_GREY, alignment=TA_LEFT, spaceAfter=6),
        "Pull": ParagraphStyle(
            "Pull", fontName="Helvetica-Bold", fontSize=14, leading=20,
            textColor=ESQ_INK, alignment=TA_LEFT, spaceAfter=8,
            leftIndent=12, borderPadding=(8, 0, 8, 12),
            borderColor=ESQ_BLUE, borderWidth=0),
        "Callout": ParagraphStyle(
            "Callout", fontName="Helvetica", fontSize=10, leading=14,
            textColor=ESQ_INK, alignment=TA_LEFT, spaceAfter=6,
            leftIndent=12, rightIndent=12,
            borderPadding=10, backColor=ESQ_BG_DARK, borderRadius=4),
        "Bullet": ParagraphStyle(
            "Bullet", fontName="Helvetica", fontSize=10, leading=14,
            textColor=ESQ_INK, alignment=TA_LEFT, spaceAfter=3,
            leftIndent=14, bulletIndent=2),
        "Mono": ParagraphStyle(
            "Mono", fontName="Courier", fontSize=9, leading=12,
            textColor=ESQ_INK, alignment=TA_LEFT, spaceAfter=4,
            leftIndent=10, rightIndent=10, backColor=ESQ_BG_DARK,
            borderPadding=8),
        "Footer": ParagraphStyle(
            "Footer", fontName="Helvetica", fontSize=8, leading=10,
            textColor=ESQ_GREY_LIGHT, alignment=TA_LEFT),
        "FooterRight": ParagraphStyle(
            "FooterRight", fontName="Helvetica", fontSize=8, leading=10,
            textColor=ESQ_GREY_LIGHT, alignment=TA_RIGHT),
    }


S = styles()


def p(text, style="Body"):
    return Paragraph(text, S[style])


def bullets(items, color=ESQ_BLUE):
    return ListFlowable(
        [ListItem(Paragraph(t, S["Bullet"]), leftIndent=10, value="•") for t in items],
        bulletType="bullet", bulletColor=color, leftIndent=12, bulletFontSize=10,
    )


def hr(color=ESQ_BORDER, thickness=0.5):
    return HRFlowable(width="100%", thickness=thickness, color=color,
                      spaceBefore=6, spaceAfter=6)


def section_rule():
    return HRFlowable(width=48, thickness=2.5, color=ESQ_BLUE,
                      spaceBefore=2, spaceAfter=12, hAlign="LEFT")


def stat_row(stats):
    """stats = list of (big, label, desc)."""
    cells = []
    for big, label, desc in stats:
        inner = [
            Paragraph(big, S["Stat"]),
            Paragraph(label, S["StatLabel"]),
            Paragraph(desc, S["StatDesc"]),
        ]
        cells.append(inner)
    while len(cells) < 3:
        cells.append("")
    t = Table([cells], colWidths=[2.33 * inch] * 3)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


def callout_box(title, body, color=ESQ_BLUE):
    """Styled callout block."""
    inner = [
        Paragraph(f'<font color="{color.hexval()}"><b>{title}</b></font>',
                  ParagraphStyle("ct", fontName="Helvetica-Bold", fontSize=10,
                                 leading=13, textColor=color, spaceAfter=4)),
        Paragraph(body, S["Body"]),
    ]
    t = Table([[inner]], colWidths=[7.0 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), ESQ_BG_DARK),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("LINEBEFORE", (0, 0), (0, -1), 3, color),
    ]))
    return t


def data_table(rows, col_widths, header=True, zebra=True, header_bg=None):
    if header_bg is None:
        header_bg = ESQ_INK
    style = [
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("TEXTCOLOR", (0, 0), (-1, -1), ESQ_INK),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LINEBELOW", (0, 0), (-1, -1), 0.25, ESQ_BORDER),
    ]
    if header:
        style += [
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("BACKGROUND", (0, 0), (-1, 0), header_bg),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTSIZE", (0, 0), (-1, 0), 9),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 9),
            ("TOPPADDING", (0, 0), (-1, 0), 9),
        ]
    if zebra and header:
        for i in range(1, len(rows)):
            if i % 2 == 0:
                style.append(("BACKGROUND", (0, i), (-1, i), ESQ_BG))
    wrapped = []
    for row in rows:
        new_row = []
        for c in row:
            if isinstance(c, str):
                new_row.append(Paragraph(c, S["BodySmall"]))
            else:
                new_row.append(c)
        wrapped.append(new_row)
    t = Table(wrapped, colWidths=col_widths, repeatRows=1 if header else 0)
    t.setStyle(TableStyle(style))
    return t


# =====================================================================
# PAGE DECORATIONS
# =====================================================================
def cover_decorations(canvas, doc):
    canvas.saveState()
    # Top-right tiny brand mark
    canvas.setFillColor(ESQ_BLUE)
    canvas.rect(0.75 * inch, LETTER[1] - 0.85 * inch, 0.4 * inch, 0.04 * inch,
                fill=1, stroke=0)
    canvas.setFont("Helvetica-Bold", 10)
    canvas.setFillColor(ESQ_INK)
    canvas.drawString(0.75 * inch, LETTER[1] - 1.05 * inch, "ESQUAIR")
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(ESQ_GREY)
    canvas.drawString(1.42 * inch, LETTER[1] - 1.05 * inch,
                      "Business Process Automation & Growth Systems")
    # Footer
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(ESQ_GREY_LIGHT)
    canvas.drawString(0.75 * inch, 0.5 * inch, "esquair.com  ·  hello@esquair.com")
    canvas.drawRightString(LETTER[0] - 0.75 * inch, 0.5 * inch, "Confidential")
    canvas.restoreState()


def page_decorations(canvas, doc):
    canvas.saveState()
    # Top brand strip
    canvas.setFillColor(ESQ_BLUE)
    canvas.rect(0.75 * inch, LETTER[1] - 0.55 * inch, 0.3 * inch, 0.03 * inch,
                fill=1, stroke=0)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(ESQ_INK)
    canvas.drawString(1.13 * inch, LETTER[1] - 0.55 * inch, "ESQUAIR")
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(ESQ_GREY_LIGHT)
    canvas.drawRightString(LETTER[0] - 0.75 * inch, LETTER[1] - 0.55 * inch,
                           "Contractor Lead Follow-Up System")
    # Footer
    canvas.setStrokeColor(ESQ_BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(0.75 * inch, 0.7 * inch, LETTER[0] - 0.75 * inch, 0.7 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(ESQ_GREY_LIGHT)
    canvas.drawString(0.75 * inch, 0.5 * inch,
                      f"Prepared for {CLIENT_CONFIG['client_short']}  ·  {CLIENT_CONFIG['prepared_date']}")
    canvas.drawRightString(LETTER[0] - 0.75 * inch, 0.5 * inch, f"{doc.page - 1}")
    canvas.restoreState()


# =====================================================================
# DOCUMENT
# =====================================================================
def build():
    out_path = Path("/Users/raularias/Desktop") / "Esquair-Contractor-Followup-System-v2.pdf"
    doc = SimpleDocTemplate(
        str(out_path), pagesize=LETTER,
        leftMargin=0.75 * inch, rightMargin=0.75 * inch,
        topMargin=0.95 * inch, bottomMargin=0.85 * inch,
        title="Esquair · Contractor Lead Follow-Up System",
        author="Esquair",
    )

    story = []

    # =================================================================
    # COVER
    # =================================================================
    story += [
        Spacer(1, 1.6 * inch),
        p("BUSINESS GROWTH SYSTEM", "CoverEyebrow"),
        p("The Contractor<br/>Lead Follow-Up<br/>System.", "CoverTitle"),
        p("How top contractors convert <b>2-3× more leads</b> into closed jobs "
          "without spending more on marketing.", "CoverSubtitle"),
        Spacer(1, 0.4 * inch),
        HRFlowable(width="40%", thickness=1.5, color=ESQ_BLUE,
                   hAlign="LEFT", spaceAfter=18),
        p("PREPARED FOR", "CoverMetaLabel"),
        p(f"<b>{CLIENT_CONFIG['client_name']}</b>", "CoverMeta"),
        Spacer(1, 0.1 * inch),
        p("PREPARED BY", "CoverMetaLabel"),
        p("Esquair · Business Process Automation &amp; Growth Systems", "CoverMeta"),
        Spacer(1, 0.1 * inch),
        p("DATE", "CoverMetaLabel"),
        p(CLIENT_CONFIG["prepared_date"], "CoverMeta"),
        PageBreak(),
    ]

    # =================================================================
    # PAGE: WHY THIS MATTERS / THE COST OF DOING NOTHING
    # =================================================================
    story += [
        p("01  ·  THE OPPORTUNITY", "Eyebrow"),
        p("The cost of doing nothing.", "H1"),
        section_rule(),
        p("Most contractors don't lose deals because of a lack of demand. "
          "They lose them in the gap between a lead arriving and a human "
          "actually working it. Lead-response research is unambiguous about "
          "what that gap is worth:", "Body"),
        Spacer(1, 0.15 * inch),
        stat_row([
            ("21×", "More likely to qualify",
             "When you respond within 5 minutes vs. 30 minutes (MIT lead-response study)."),
            ("50%", "Of leads pick the first",
             "Homeowners contract with whichever contractor calls them back first."),
            ("40-60%", "Of paid leads wasted",
             "The typical contractor's leakage rate without a structured follow-up system."),
        ]),
        Spacer(1, 0.25 * inch),
        p("The math, plainly.", "H2"),
        p("Take a contractor running modest paid + organic lead flow:", "BodyMuted"),
        Spacer(1, 0.05 * inch),
        data_table([
            ["Inputs", "Without system", "With system", "Difference"],
            ["Monthly leads", "30", "30", "—"],
            ["Average job value", "$25,000", "$25,000", "—"],
            ["Close rate", "8%", "20%", "+12 pts"],
            ["<b>Closed jobs / month</b>", "<b>2.4</b>", "<b>6.0</b>", "<b>+3.6 jobs</b>"],
            ["<b>Monthly revenue</b>", "<b>$60,000</b>", "<b>$150,000</b>", "<b>+$90,000</b>"],
            ["<b>Annual revenue impact</b>", "—", "—", "<b>+$1.08M</b>"],
        ], col_widths=[1.85, 1.55, 1.55, 1.55]) if False else
        data_table([
            ["Inputs", "Without system", "With system", "Difference"],
            ["Monthly leads", "30", "30", "—"],
            ["Average job value", "$25,000", "$25,000", "—"],
            ["Close rate", "8%", "20%", "+12 pts"],
            ["<b>Closed jobs / month</b>", "<b>2.4</b>", "<b>6.0</b>", "<b>+3.6 jobs</b>"],
            ["<b>Monthly revenue</b>", "<b>$60,000</b>", "<b>$150,000</b>", "<b>+$90,000</b>"],
            ["<b>Annual revenue impact</b>", "—", "—", "<b>+$1.08M</b>"],
        ], col_widths=[1.85 * inch, 1.55 * inch, 1.55 * inch, 1.55 * inch]),
        Spacer(1, 0.2 * inch),
        callout_box(
            "The core insight",
            "More marketing spend doesn't fix this. A second Google Ads campaign "
            "still leaks at the same 40-60% rate. The leverage is in the system "
            "that runs <i>after</i> the lead arrives — and most contractors don't have one."
        ),
        PageBreak(),
    ]

    # =================================================================
    # PAGE: THE 7-STAGE PIPELINE
    # =================================================================
    story += [
        p("02  ·  THE FRAMEWORK", "Eyebrow"),
        p("The 7-stage pipeline.", "H1"),
        section_rule(),
        p("Every lead lives in exactly one stage at any time. Each stage has "
          "a defined exit criterion — meaning a clear, observable trigger that "
          "moves the lead forward (or out). This is the operating system "
          "underneath every automation that follows.", "Body"),
        Spacer(1, 0.15 * inch),
        data_table([
            ["#", "Stage", "Exit criterion (moves to next stage when…)"],
            ["1", "<b>New</b> — lead just arrived",
             "First contact attempt made within 5 min"],
            ["2", "<b>Contacted</b> — outreach started, no response yet",
             "Lead replies, OR sequence completes (Day 7) → moves to Lost"],
            ["3", "<b>Qualified</b> — lead replied, project &amp; budget confirmed",
             "Site visit scheduled, OR disqualified → Lost"],
            ["4", "<b>Site Visit Scheduled</b>",
             "Visit completed, OR no-show → back to Contacted"],
            ["5", "<b>Estimate Sent</b>",
             "Estimate accepted → Won, OR negotiation starts → Negotiating"],
            ["6", "<b>Negotiating</b>",
             "Contract signed → Won, OR pause → Nurture"],
            ["7", "<b>Won / Lost / Nurture</b>",
             "Won = invoiced project. Lost = closed out. Nurture = re-engage in 90 days."],
        ], col_widths=[0.35 * inch, 2.4 * inch, 4.25 * inch]),
        Spacer(1, 0.2 * inch),
        callout_box(
            "Why exit criteria matter",
            "Without them, leads quietly rot. \"I'll follow up later\" is not a "
            "stage — it's a graveyard. Every lead is either advancing or being "
            "explicitly closed. No middle ground."
        ),
        PageBreak(),
    ]

    # =================================================================
    # PAGE: SPEED-TO-LEAD — THE FIRST 5 MINUTES
    # =================================================================
    story += [
        p("03  ·  INTAKE", "Eyebrow"),
        p("The first 5 minutes.", "H1"),
        section_rule(),
        p("Every minute of delay after a lead arrives reduces conversion. "
          "The instant-response workflow runs whether or not a human is "
          "available — automation handles the first touch, a human handles "
          "the qualifying call.", "Body"),
        Spacer(1, 0.15 * inch),
        p("Trigger: form fill, phone call, or web chat", "H3"),
        bullets([
            "<b>0 seconds</b> — Auto-SMS to lead: <i>\"Hi [Name], thanks for reaching out to [Company]. We got your request for [project]. We'll call you in the next few minutes — or text us back here.\"</i>",
            "<b>0 seconds</b> — Internal alert (SMS + push) to whoever's on call",
            "<b>2-5 minutes</b> — Human places outbound call",
            "<b>If no answer</b> — voicemail script (below) + follow-up SMS",
            "<b>If answered</b> — run the qualifying call script (below)",
        ]),
        Spacer(1, 0.15 * inch),

        p("The qualifying call — 5 questions.", "H2"),
        p("The goal of the first call is not to sell. It's to qualify. "
          "Five questions, in this order:", "BodyMuted"),
        data_table([
            ["#", "Question", "What it tells you"],
            ["1", "What kind of project are you considering?",
             "Service fit. Disqualify out-of-scope projects fast."],
            ["2", "When are you hoping to get this done?",
             "Timeline = urgency. \"This month\" vs \"next year\" routes differently."],
            ["3", "Have you set a budget range, or are you still figuring that out?",
             "Budget realism. Filters tire-kickers without being pushy."],
            ["4", "Are you the homeowner / decision-maker, or is anyone else involved?",
             "Decision authority. Prevents wasted estimate trips."],
            ["5", "What's prompting this project — anything urgent, or planning ahead?",
             "Motivation = closeability. Damage / leak = hot. Vague want = nurture."],
        ], col_widths=[0.35 * inch, 2.6 * inch, 4.05 * inch]),
        Spacer(1, 0.15 * inch),

        p("Voicemail script (when they don't pick up).", "H3"),
        Paragraph(
            "<i>\"Hi [Name], this is [Your Name] with [Company] — got your request "
            "about [project]. I'll send you a quick text as well in case that's "
            "easier. When you have a minute, the fastest way to get a slot on "
            "our schedule is to reply to that text or give us a call back at "
            "[phone]. Talk soon.\"</i>",
            S["Mono"]),
        PageBreak(),
    ]

    # =================================================================
    # PAGE: UNRESPONSIVE LEAD SEQUENCE
    # =================================================================
    story += [
        p("04  ·  SEQUENCES", "Eyebrow"),
        p("Day 0-7 — unresponsive leads.", "H1"),
        section_rule(),
        p("If a lead doesn't engage on the first touch, this 7-day sequence "
          "runs automatically. Every message is short, casual, and ends with "
          "a clear ask. The Day 7 message intentionally forces a yes/no — "
          "no one stays in \"Contacted\" forever.", "Body"),
        Spacer(1, 0.15 * inch),
        data_table([
            ["Day", "Channel", "Message"],
            ["0", "Call + SMS",
             "Hi [Name], this is [Company]. Got your request for [project]. When's a good time to connect today?"],
            ["1", "SMS",
             "Hi [Name] — checking in to see if you still need help with your [project]."],
            ["2", "Call",
             "Following up on your request. Happy to schedule a quick visit if you'd like."],
            ["3", "SMS",
             "Wanted to check in again — are you still planning the project?"],
            ["5", "Value SMS",
             "We just wrapped a similar [project] nearby. Happy to send a couple of photos if it'd help."],
            ["7", "Final",
             "Should we keep your project open, or close it out for now? Either way is fine — just want to be clear."],
        ], col_widths=[0.6 * inch, 1.0 * inch, 5.4 * inch]),
        Spacer(1, 0.15 * inch),
        callout_box(
            "The Day 5 \"value\" rule",
            "Every sequence needs at least one message that gives something "
            "instead of asking for something. A photo, a short tip, a recent "
            "project. It changes the tone of the entire thread and lifts "
            "response rates measurably.",
            color=ESQ_AMBER,
        ),
        PageBreak(),
    ]

    # =================================================================
    # PAGE: POST-ESTIMATE FOLLOW-UP
    # =================================================================
    story += [
        p("05  ·  SEQUENCES", "Eyebrow"),
        p("Post-estimate follow-up.", "H1"),
        section_rule(),
        p("Once an estimate is sent, the clock starts. This 30-day sequence "
          "keeps the deal warm without nagging — each touch has a different "
          "purpose, and the language shifts from clarifying to deciding to "
          "re-engaging.", "Body"),
        Spacer(1, 0.15 * inch),
        data_table([
            ["Timing", "Purpose", "Message"],
            ["Same day", "Send",
             "Just sent your estimate. Let me know if you'd like to walk through it together — happy to do that on a quick call."],
            ["Day 2", "Clarify",
             "Wanted to check that everything looked clear in the estimate. Any questions on scope or pricing?"],
            ["Day 5", "Decision",
             "Are you still considering moving forward? No pressure — just want to know how to plan our schedule."],
            ["Day 10", "Close",
             "Should we keep this estimate active, or pause and circle back later? Both are fine."],
            ["Day 30", "Re-engage",
             "Thinking about you — are you still planning to move forward on the [project]? Schedules are filling up for [season]."],
        ], col_widths=[0.85 * inch, 0.95 * inch, 5.2 * inch]),
        Spacer(1, 0.2 * inch),

        p("Why the structure works.", "H3"),
        bullets([
            "<b>Day 2 = Clarify, not decide.</b> Most prospects haven't fully read the estimate yet — pushing for a yes is premature.",
            "<b>Day 5 = soft decision check.</b> By now they've thought about it. The phrasing gives permission to say \"not yet.\"",
            "<b>Day 10 = explicit close-or-pause.</b> Forces a clean state instead of a ghosted pipeline.",
            "<b>Day 30 = re-engagement, not pressure.</b> By framing it as scheduling, you create soft urgency without pushing.",
        ]),
        PageBreak(),
    ]

    # =================================================================
    # PAGE: OBJECTION HANDLING
    # =================================================================
    story += [
        p("06  ·  PLAYBOOK", "Eyebrow"),
        p("Objection handling.", "H1"),
        section_rule(),
        p("Most contractors lose deals at the objection — not because the "
          "objection is fatal, but because there's no prepared response. "
          "These are the six most common objections and the responses that "
          "actually move the deal forward.", "Body"),
        Spacer(1, 0.15 * inch),
        data_table([
            ["Objection", "Response"],
            ["<b>\"Your price is too high.\"</b>",
             "Acknowledge → reframe to value. <i>\"I hear that. Can I ask what number you were expecting? That'll help me show you exactly where the cost is going — sometimes it's a scope difference, sometimes we can adjust.\"</i>"],
            ["<b>\"We're still getting other quotes.\"</b>",
             "Don't compete on price — compete on certainty. <i>\"Totally fair. While you're comparing, here's what I'd ask the others: warranty length, license number, and how they handle change orders. Happy to share ours.\"</i>"],
            ["<b>\"I need to talk to my spouse.\"</b>",
             "Make it easier to bring them in. <i>\"Of course. Want me to put together a 5-minute summary you can share, or jump on a quick call together? Either works.\"</i>"],
            ["<b>\"Call me back next week.\"</b>",
             "Pin the next step now. <i>\"Sounds good — what day works best, Tuesday or Thursday? I'll lock it in so we don't miss each other.\"</i>"],
            ["<b>\"We're not ready yet.\"</b>",
             "Don't push — protect the relationship. <i>\"No problem at all. Mind if I check in around [season / specific date]? I'll keep your file ready.\"</i> Move to Nurture stage."],
            ["<b>\"Can you do it cash, no permit?\"</b>",
             "Hard no — protect the brand. <i>\"I can't — every job we do is permitted and inspected. That's actually what protects you, not us. Happy to walk you through why if it'd help.\"</i>"],
        ], col_widths=[1.6 * inch, 5.4 * inch]),
        PageBreak(),
    ]

    # =================================================================
    # PAGE: DATABASE REACTIVATION
    # =================================================================
    story += [
        p("07  ·  REACTIVATION", "Eyebrow"),
        p("Re-engaging old leads.", "H1"),
        section_rule(),
        p("The single highest-ROI play in any service business: messaging "
          "leads who didn't convert the first time. Most weren't \"no\" — "
          "they were \"not yet.\" A structured reactivation cadence pulls "
          "them back into the pipeline at near-zero cost.", "Body"),
        Spacer(1, 0.15 * inch),
        data_table([
            ["Trigger", "Channel", "Message intent", "Sample"],
            ["90 days after Lost",
             "SMS + email",
             "Soft check-in",
             "Hi [Name] — thinking about you. Did you end up moving forward on the [project], or is it still on the list?"],
            ["6 months after Lost",
             "Email",
             "Value-add",
             "Quick note: we just published a guide on [project]. Thought of you — happy to send it over."],
            ["12 months after Lost",
             "SMS",
             "Seasonal hook",
             "Hi [Name] — heading into [rainy season / summer]. If you ever revisited the [project], let me know. We're booking [month]."],
            ["6 months after job",
             "Email",
             "Past-client check-in",
             "How's the [completed project] holding up? Any other projects on your list this year?"],
            ["12 months after job",
             "SMS",
             "Anniversary",
             "Hard to believe it's been a year since we wrapped your [project]. Hope you're still loving it. Need anything looked at?"],
        ], col_widths=[1.25 * inch, 0.85 * inch, 1.0 * inch, 3.9 * inch]),
        Spacer(1, 0.2 * inch),
        callout_box(
            "Reactivation = found money",
            "A typical contractor with 500+ past clients and 1,000+ unconverted "
            "leads in their inbox is sitting on six figures of recoverable "
            "revenue. Nothing to spend on ads — just a sequence and a CRM."
        ),
        PageBreak(),
    ]

    # =================================================================
    # PAGE: AFTER THE JOB — REVIEWS & REFERRALS
    # =================================================================
    story += [
        p("08  ·  AFTER THE JOB", "Eyebrow"),
        p("Reviews &amp; referrals.", "H1"),
        section_rule(),
        p("The job ending is the start of the next sales cycle, not the "
          "end. A structured post-job sequence turns one closed project "
          "into reviews (compounding local SEO), referrals (free leads), "
          "and repeat work (no acquisition cost).", "Body"),
        Spacer(1, 0.15 * inch),
        data_table([
            ["When", "Action", "Sample message"],
            ["Day of completion",
             "Thank-you + photos",
             "Thanks for trusting us with the [project], [Name]. Sent over a few before/afters for your records. Anything you'd like us to circle back on?"],
            ["+3 days",
             "Review request",
             "Quick favor — if everything's going well with the [project], would you mind dropping a Google review? Link: [URL]. Takes 60 seconds and means a lot."],
            ["+14 days",
             "Photo / portfolio ask",
             "Mind if we feature your [project] on our site? We'd send you the photos for your records too — wouldn't tag the address."],
            ["+30 days",
             "Referral ask",
             "Hope the [project] is holding up beautifully. If anyone you know is thinking about a [related service], we'd love an intro. We give a [small thank-you] for any referral that books."],
            ["+6 months",
             "Check-in",
             "How's the [project] doing? Any settling, finishes, anything we should look at? Free walk-through anytime."],
            ["+12 months",
             "Anniversary + cross-sell",
             "One year already! Hope you're still loving it. Heads up — we're booking [seasonal service] now if it's on your list."],
        ], col_widths=[1.05 * inch, 1.2 * inch, 4.75 * inch]),
        PageBreak(),
    ]

    # =================================================================
    # PAGE: KPI SCORECARD
    # =================================================================
    story += [
        p("09  ·  MEASUREMENT", "Eyebrow"),
        p("The scorecard.", "H1"),
        section_rule(),
        p("If a metric isn't tracked weekly, it isn't being managed. These "
          "seven KPIs are the minimum viable dashboard for any contractor "
          "running this system. Industry benchmarks below are based on "
          "Esquair client averages and published lead-response research.", "Body"),
        Spacer(1, 0.15 * inch),
        data_table([
            ["KPI", "Definition", "Benchmark", "Best-in-class"],
            ["<b>Speed to first contact</b>",
             "Time from lead arrival to first human attempt",
             "&lt; 30 min",
             "&lt; 5 min"],
            ["<b>Call connect rate</b>",
             "% of outbound calls that reach a live person",
             "30-40%",
             "&gt; 50%"],
            ["<b>Lead-to-qualified rate</b>",
             "% of new leads that pass qualifying questions",
             "40-60%",
             "&gt; 70%"],
            ["<b>Site visit show rate</b>",
             "% of scheduled visits that actually happen",
             "70-80%",
             "&gt; 90%"],
            ["<b>Estimate-to-close rate</b>",
             "% of estimates sent that become signed contracts",
             "20-30%",
             "&gt; 40%"],
            ["<b>Avg deal value</b>",
             "Mean revenue per closed job",
             "Trade-specific",
             "Trending up"],
            ["<b>Cost per won job</b>",
             "Total marketing spend ÷ jobs closed",
             "5-12% of job value",
             "&lt; 5%"],
        ], col_widths=[1.55 * inch, 2.6 * inch, 1.3 * inch, 1.55 * inch]),
        Spacer(1, 0.2 * inch),
        callout_box(
            "What gets reviewed weekly",
            "<b>Speed to first contact</b> and <b>estimate-to-close rate</b>. "
            "Those are the two metrics most directly under operational "
            "control — and the two that most reliably predict revenue. "
            "Everything else is monthly.",
            color=ESQ_GREEN,
        ),
        PageBreak(),
    ]

    # =================================================================
    # PAGE: TECH STACK
    # =================================================================
    story += [
        p("10  ·  IMPLEMENTATION", "Eyebrow"),
        p("The tech stack.", "H1"),
        section_rule(),
        p("Three viable paths, depending on volume and budget. The right "
          "answer is the one that gets running this week — not the most "
          "feature-complete option.", "Body"),
        Spacer(1, 0.15 * inch),
        data_table([
            ["", "Tier 1 — Lean", "Tier 2 — Recommended", "Tier 3 — Enterprise"],
            ["<b>Tools</b>",
             "Google Sheet + Twilio + Zapier",
             "GoHighLevel (all-in-one CRM)",
             "Jobber / Buildertrend / HCSS"],
            ["<b>Cost</b>",
             "~$50-100 / mo",
             "~$297 / mo",
             "$150-400 / mo + setup"],
            ["<b>Best for</b>",
             "Solo / 1-crew shops with &lt; 20 leads/mo",
             "Growth-stage contractors (20-100 leads/mo)",
             "5+ crews, project-management heavy"],
            ["<b>Pros</b>",
             "Cheap, flexible, owns the data",
             "Single platform, automations native, fast setup",
             "Deep job-management features, accounting integration"],
            ["<b>Cons</b>",
             "Manual gluing, fragile, hard to scale",
             "Steep learning curve, vendor lock-in",
             "Overkill for follow-up, expensive, slow to configure"],
        ], col_widths=[1.0 * inch, 2.0 * inch, 2.0 * inch, 2.0 * inch]),
        Spacer(1, 0.2 * inch),

        p("TCPA &amp; SMS compliance — read this.", "H3"),
        Paragraph(
            "U.S. law (TCPA) requires <b>express written consent</b> before "
            "sending automated SMS to a consumer. Penalties: $500-$1,500 "
            "<b>per message</b>. Three rules:",
            S["Body"]),
        bullets([
            "Every web form must include a clearly worded SMS opt-in checkbox (not pre-checked) with a link to your privacy policy.",
            "Every automated SMS must include the brand name and a STOP-to-opt-out instruction at first contact.",
            "Honor opt-outs immediately and permanently — your CRM must enforce this without manual review.",
        ]),
        p("Esquair configures all three by default during setup. Most "
          "contractors are blasting SMS without consent and don't realize "
          "they're exposed.", "BodyMuted"),
        PageBreak(),
    ]

    # =================================================================
    # PAGE: HOW THIS LOOKS FOR [CLIENT] — the swappable page
    # =================================================================
    cfg = CLIENT_CONFIG
    proj = cfg["client_projection"]
    story += [
        p(f"11  ·  FOR {cfg['client_short'].upper()}", "Eyebrow"),
        p(f"How this looks for<br/>{cfg['client_short']}.", "H1"),
        section_rule(),
        p(cfg["client_context"], "Body"),
        Spacer(1, 0.15 * inch),

        p("Where the leakage is today.", "H2"),
        bullets(cfg["client_pain_points"], color=ESQ_AMBER),
        Spacer(1, 0.15 * inch),

        p("What we'd implement.", "H2"),
        data_table(
            [["Layer", "What gets built"]] +
            [[f"<b>{layer}</b>", desc] for layer, desc in cfg["client_opportunity"]],
            col_widths=[1.4 * inch, 5.6 * inch],
        ),
        Spacer(1, 0.2 * inch),

        p("Projected impact.", "H2"),
        data_table([
            ["Metric", "Today (estimate)", "Target"],
            ["Monthly lead volume", proj["monthly_lead_volume"], proj["monthly_lead_volume"]],
            ["Average job value", proj["avg_job_value"], proj["avg_job_value"]],
            ["<b>Close rate</b>", proj["current_close_rate"], proj["target_close_rate"]],
            ["<b>Recovered revenue</b>", "—", proj["estimated_recovered_revenue"]],
        ], col_widths=[2.4 * inch, 2.3 * inch, 2.3 * inch]),
        Spacer(1, 0.15 * inch),
        Paragraph(
            "<i>Projections based on industry benchmarks and the lead-response "
            "research cited in Section 01. Actual results vary by intake "
            "volume, service mix, and execution discipline.</i>",
            S["BodySmall"]),
        PageBreak(),
    ]

    # =================================================================
    # PAGE: WHAT ESQUAIR DOES + CTA
    # =================================================================
    story += [
        p("12  ·  THE OFFER", "Eyebrow"),
        p("What Esquair builds and runs.", "H1"),
        section_rule(),
        p("This isn't a course or a template handoff. Esquair builds the "
          "system inside your business, configures the automations, and "
          "monitors the metrics weekly. Most clients are live within 14 days.", "Body"),
        Spacer(1, 0.2 * inch),

        p("What's included.", "H2"),
        data_table([
            ["Phase", "Deliverable", "Timeline"],
            ["<b>Setup</b>",
             "CRM configured, pipeline stages, instant-response workflow, all sequences loaded, TCPA compliance, team training",
             "Days 1-14"],
            ["<b>Tuning</b>",
             "Weekly review of speed-to-lead and estimate-to-close, sequence A/B tests, message refinements",
             "Ongoing"],
            ["<b>Reporting</b>",
             "Weekly dashboard: leads in, qualified rate, estimates sent, deals won, revenue, leakage points",
             "Every Monday"],
            ["<b>Quarterly review</b>",
             "30-min session reviewing trend lines, system upgrades, expansion opportunities",
             "Every 90 days"],
        ], col_widths=[1.0 * inch, 4.5 * inch, 1.5 * inch]),
        Spacer(1, 0.25 * inch),

        p("Pricing.", "H2"),
        data_table([
            ["", "Setup (one-time)", "Monthly retainer"],
            ["<b>Foundation</b> — Tier 1 stack, 1 service line",
             "$2,500", "$750"],
            ["<b>Growth</b> — Tier 2 stack, full system, weekly tuning",
             "$5,000", "$1,500"],
            ["<b>Operate</b> — Growth + dedicated lead handler",
             "$5,000", "$3,500"],
        ], col_widths=[3.5 * inch, 1.75 * inch, 1.75 * inch]),
        Spacer(1, 0.3 * inch),

        # CTA block
        Table([[
            [
                Paragraph(
                    "<font color='#FFFFFF'><b>Next step.</b></font>",
                    ParagraphStyle("ctah", fontName="Helvetica-Bold", fontSize=16,
                                   leading=20, textColor=colors.white,
                                   alignment=TA_LEFT, spaceAfter=8)),
                Paragraph(
                    "<font color='#FFFFFF'>Book a 30-minute audit. We'll review your "
                    "current intake, identify the three biggest leakage points, and "
                    "show you what the system would look like for your business — "
                    "before you commit to anything.</font>",
                    ParagraphStyle("ctab", fontName="Helvetica", fontSize=10.5,
                                   leading=15, textColor=colors.white,
                                   alignment=TA_LEFT, spaceAfter=10)),
                Paragraph(
                    "<font color='#FFFFFF'><b>esquair.com/audit</b>  ·  "
                    "<b>hello@esquair.com</b></font>",
                    ParagraphStyle("ctac", fontName="Helvetica-Bold", fontSize=11,
                                   leading=15, textColor=colors.white,
                                   alignment=TA_LEFT)),
            ]
        ]], colWidths=[7.0 * inch], style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), ESQ_INK),
            ("LEFTPADDING", (0, 0), (-1, -1), 24),
            ("RIGHTPADDING", (0, 0), (-1, -1), 24),
            ("TOPPADDING", (0, 0), (-1, -1), 22),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 22),
            ("LINEBEFORE", (0, 0), (0, -1), 4, ESQ_BLUE),
        ])),
    ]

    doc.build(story, onFirstPage=cover_decorations, onLaterPages=page_decorations)
    print(f"PDF written to {out_path}")


if __name__ == "__main__":
    build()
