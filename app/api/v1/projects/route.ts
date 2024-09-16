import { getProjectById } from "@/lib/actions/projects";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { project_id } = await request.json();

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
