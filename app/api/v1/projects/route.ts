import { getProjectById } from "@/lib/actions/projects";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the project_id from the query params
    const { searchParams } = new URL(request.url);
    const project_id = searchParams.get("project_id");

    if (!project_id) {
      return NextResponse.json({
        error: "Project ID is required",
        status: 400,
      });
    }

    const { data, error } = await getProjectById(project_id);

    if (!data || error) {
      return NextResponse.json({
        error: `Get Project Error: ${error?.message}`,
        status: 500,
      });
    } else {
      return NextResponse.json({
        data: data,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: `Get Project Error: ${error?.message}`,
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
