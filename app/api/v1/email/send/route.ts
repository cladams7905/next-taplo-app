import { createClient } from "@/lib/mailgun/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { from, to, subject, template, mailgun_variables } =
    await request.json();

  const mailgun = createClient();

  const result = await mailgun.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: from,
    to: [to],
    subject: subject,
    template: template,
    "t:variables": mailgun_variables,
  });

  return NextResponse.json({ data: result });
}
