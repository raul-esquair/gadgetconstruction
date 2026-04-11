import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, service, message } = body;

    // Validate required fields
    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: "Name, phone, and service are required." },
        { status: 400 }
      );
    }

    // Log the submission (replace with email service / CRM integration)
    console.log("New contact form submission:", {
      name,
      phone,
      service,
      message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
