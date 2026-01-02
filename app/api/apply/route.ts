import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { applicationSchema } from "@/lib/application";

export async function POST(request: Request) {
  try {
    const { EMAIL_HOST_USER, EMAIL_HOST_PASSWORD } = process.env;
    const emailTo = process.env.APPLY_TO_EMAIL || "d.rampinini@gmail.com";

    if (!EMAIL_HOST_USER || !EMAIL_HOST_PASSWORD || !emailTo) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const payload = applicationSchema.parse(await request.json());

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_HOST_USER,
        pass: EMAIL_HOST_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `Trading Itinerario <${EMAIL_HOST_USER}>`,
      to: emailTo,
      replyTo: payload.email,
      subject: `New Residency Application — ${payload.fullName}`,
      text: [
        `Name: ${payload.fullName}`,
        `Email: ${payload.email}`,
        `Location: ${payload.location}`,
        `Dates: ${payload.dates}`,
        `Goal: ${payload.goal}`,
        `Capital Range: ${payload.capitalRange}`,
        `Accommodation: ${payload.accommodation}`,
        `Market Focus: ${payload.marketFocus}`,
        `Notes: ${payload.notes || "N/A"}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit application.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
