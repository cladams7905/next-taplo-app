import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the user_id from the query params
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({
        error: "user ID is required",
        status: 400,
      });
    }

    const supabase = createClient(true);
    const { data, error } = await supabase.auth.admin.getUserById(user_id);

    if (!data || error) {
      return NextResponse.json({
        error: `Get Project Error: ${error?.message}`,
        status: 500,
      });
    } else {
      return NextResponse.json({
        data: data.user.user_metadata.is_promo_user || false,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: `Get Promo User Error: ${error?.message}`,
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
