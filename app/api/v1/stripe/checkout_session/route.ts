import { getURL } from "@/lib/actions";
import { stripe } from "@/stripe/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { price_id } = await request.json();

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      return_url: `${getURL()}/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
    });

    return NextResponse.json({
      clientSecret: session.client_secret,
    });
  } catch (error: any) {
    return Response.json({
      error: `Create Checkout Session Error: ${error?.message}`,
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { session_id } = await request.json();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email,
    });
  } catch (error: any) {
    return Response.json({
      error: `Get Checkout Session Error: ${error?.message}`,
      status: 500,
    });
  }
}
