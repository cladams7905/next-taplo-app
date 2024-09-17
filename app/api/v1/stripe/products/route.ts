import { getIntegrationById } from "@/lib/actions/integrations";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: NextRequest) {
  try {
    // Get the project_id from the query params
    const { searchParams } = new URL(request.url);
    const integration_id = searchParams.get("integration_id");

    if (!integration_id) {
      return NextResponse.json({
        error: "Integration id is required",
        status: 400,
      });
    }

    const { data, error } = await getIntegrationById(integration_id);

    if (!data || error) {
      return NextResponse.json({
        error: `Get Integrations Error: ${error?.message}`,
        status: 500,
      });
    }

    const stripe_api_key = data.api_key;
    const stripe = new Stripe(stripe_api_key);
    const productData = await stripe.products.list({
      expand: ["data.default_price"],
    });

    return NextResponse.json({
      products: productData,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: `Get Stripe Products Error: ${error?.message}`,
      status: 500,
    });
  }
}
