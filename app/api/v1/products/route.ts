import { getProducts } from "@/lib/actions/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the project_id from the query params
    const { searchParams } = new URL(request.url);
    const project_id = parseInt(searchParams.get("project_id") || "");

    if (!project_id) {
      return NextResponse.json({
        error: "Project ID is required",
        status: 400,
      });
    }

    const { data, error } = await getProducts(project_id);

    if (!data || error) {
      return NextResponse.json({
        error: `Get Products Error: ${error?.message}`,
        status: 500,
      });
    } else {
      return NextResponse.json({
        data: data,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: `Get Products Error: ${error?.message}`,
      status: 500,
    });
  }
}
