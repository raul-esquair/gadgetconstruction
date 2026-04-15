import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, phone, email, service, timeline, scope, message } = body;

    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: "Name, phone, and service are required." },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Push notification via ntfy
    if (process.env.NTFY_TOPIC) {
      fetch(`https://ntfy.sh/${process.env.NTFY_TOPIC}`, {
        method: "POST",
        headers: {
          Title: `New Lead: ${service}`,
          Priority: "high",
          Tags: "hammer,phone",
        },
        body: `${name} — ${phone}${email ? ` — ${email}` : ""}${timeline ? `\nTimeline: ${timeline}` : ""}${message ? `\n"${message}"` : ""}`,
      }).catch(() => {});
    }

    await resend.emails.send({
      from: "Gadget Construction <estimates@gadgetconstructionsf.com>",
      to: process.env.CONTACT_EMAIL!,
      subject: `New Estimate Request — ${service}`,
      replyTo: email || undefined,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #222; margin-bottom: 4px;">New Estimate Request</h2>
          <p style="color: #888; font-size: 13px; margin-top: 0;">${submittedAt} PT</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; width: 110px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222; font-weight: 500;">
                <a href="tel:${phone}" style="color: #222; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            ${email ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222; font-weight: 500;">
                <a href="mailto:${email}" style="color: #222; text-decoration: none;">${email}</a>
              </td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; vertical-align: top;">Service</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222; font-weight: 500;">${service}</td>
            </tr>
            ${timeline ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; vertical-align: top;">Timeline</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${timeline}</td>
            </tr>` : ""}
            ${scope ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; vertical-align: top;">Scope</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${scope}</td>
            </tr>` : ""}
            ${message ? `
            <tr>
              <td style="padding: 10px 0; color: #888; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #222;">${message}</td>
            </tr>` : ""}
          </table>

          <p style="margin-top: 24px; font-size: 12px; color: #aaa;">
            Submitted via gadgetconstructionsf.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
