import { NextRequest, NextResponse } from "next/server";
//import { sendGTMEvent } from "@next/third-parties/google";

export async function POST(request: NextRequest) {
  const body = await request.text();
  console.log(body);

  //    sendGTMEvent({ event: "sign_up" });
  try {
  } catch (error: any) {
    return NextResponse.json({
      message: "Webhook handler failed. View your nextjs function logs.",
      status: 400,
    });
  }
  return NextResponse.json({ received: true });
}
