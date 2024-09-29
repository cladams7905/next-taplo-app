import { getProjectById } from "@/lib/actions/projects";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "https://taplo.io",
  "https://www.taplo.io",
  "http://localhost:3000", // Allow localhost for development
];

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

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (!origin) return new NextResponse(null, { status: 400 });

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
        ? origin
        : "",
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    },
  });
}
