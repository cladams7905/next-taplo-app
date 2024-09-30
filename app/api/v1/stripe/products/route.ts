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

    if (!stripe_api_key) {
      return NextResponse.json({
        error: `Stripe API Key not found`,
        status: 500,
      });
    }

    const stripe = new Stripe(stripe_api_key);
    const productData = await stripe.products.list({
      expand: ["data.default_price"],
      active: true,
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

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });

  return response;
}
