import { getURL } from "@/lib/actions";
import { stripe } from "@/lib/stripe/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { price_id, product_id, email, customer } = await request.json();

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: customer ? customer : undefined,
      customer_email: !customer ? email : undefined,
      customer_update: customer ? { address: "auto", name: "auto" } : undefined,
      return_url: `${getURL()}/dashboard/create-project/`,
      redirect_on_completion: "if_required",
      subscription_data: {
        trial_period_days: 14,
      },
      automatic_tax: { enabled: true },
    });

    return NextResponse.json({
      id: session.id,
      clientSecret: session.client_secret,
      email: session.customer_email,
      payment_method: session.payment_method_types,
      payment_status: session.payment_status,
    });
  } catch (error: any) {
    console.error(error?.message);
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
