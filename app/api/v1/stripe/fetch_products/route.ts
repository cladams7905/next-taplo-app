import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const { stripe_api_key } = await request.json();

    const stripe = new Stripe(stripe_api_key);
    const productData = await stripe.products.list({
      expand: ["data.default_price"],
    });

    return NextResponse.json({
      products: productData,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: `Get Checkout Session Error: ${error?.message}`,
      status: 500,
    });
  }
}
