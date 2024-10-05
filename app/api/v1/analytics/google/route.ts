import { NextRequest, NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "@google-analytics/data/build/protos/protos";
import { getIntegrationById } from "@/lib/actions/integrations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const integrationId = searchParams.get("integration_id");

    if (!integrationId) {
      return NextResponse.json({
        error: "Integration ID is required",
        status: 400,
      });
    }

    const { data: integration, error } = await getIntegrationById(
      parseInt(integrationId),
      true
    );

    if (!integration || error) {
      return NextResponse.json({
        error: `Get Integration Error: ${error?.message}`,
        status: 500,
      });
    }

    const googlePropertyId = integration.google_property_id || "";
    const googleProjectId = integration.google_project_id || "";
    const googleClientEmail = integration.google_client_email || "";
    const googlePrivateKey =
      integration.google_private_key?.split(String.raw`\n`).join("\n") || "";

    const analyticsDataClient = new BetaAnalyticsDataClient({
      projectId: googleProjectId,
      credentials: {
        private_key: googlePrivateKey,
        client_email: googleClientEmail,
      },
    });

    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${googlePropertyId}`,
      dimensions: [
        {
          name: "country",
        },
        {
          name: "city",
        },
      ],
      metrics: [
        {
          name: "activeUsers",
        },
      ],
    });

    if (!response.rows) {
      console.log("No rows returned.");
      return NextResponse.json({
        error: "No rows returned.",
        status: 500,
      });
    }
    const formattedRealtimeReport = formatRealtimeReport(response);
    return NextResponse.json(formattedRealtimeReport);
  } catch (error: any) {
    return NextResponse.json({
      error: `Error: ${error.message}`,
      status: 500,
    });
  }
}

function formatRealtimeReport(
  response: google.analytics.data.v1beta.IRunRealtimeReportResponse
) {
  let formattedResponse: {
    country: string;
    city: string;
    visitorCount: string;
  }[] = [];

  response.rows?.forEach((row) => {
    formattedResponse.push({
      country: row.dimensionValues?.[0]?.value ?? "N/A",
      city: row.dimensionValues?.[1]?.value ?? "N/A",
      visitorCount: row.metricValues?.[0]?.value ?? "N/A",
    });
  });

  return formattedResponse;
}
