import { NextRequest, NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "@google-analytics/data/build/protos/protos";
import { getIntegrationById } from "@/lib/actions/integrations";

/**
 * Fetch data from Google Analytics.
 */
async function fetchGoogleAnalyticsData(
  client: BetaAnalyticsDataClient,
  params: any,
  isRealtime = false
) {
  try {
    if (isRealtime) {
      const [response] = await client.runRealtimeReport(params);
      return response;
    } else {
      const [response] = await client.runReport(params);
      return response;
    }
  } catch (error: any) {
    throw new Error(`Google Analytics API Error: ${error.message}`);
  }
}

/**
 * Format the date into `YYYY-MM-DD`.
 */
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Format the Google Analytics report response.
 */
function formatReport(
  response:
    | google.analytics.data.v1beta.IRunReportResponse
    | google.analytics.data.v1beta.IRunRealtimeReportResponse
) {
  return (
    response.rows?.map((row) => ({
      country: row.dimensionValues?.[0]?.value ?? "N/A",
      city: row.dimensionValues?.[1]?.value ?? "N/A",
      visitorCount: row.metricValues?.[0]?.value ?? "N/A",
    })) || []
  );
}

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
        error: `Integration Error: ${
          error?.message || "Integration not found."
        }`,
        status: 500,
      });
    }

    const {
      google_property_id,
      google_project_id,
      google_client_email,
      google_private_key,
    } = integration;

    if (
      !google_property_id ||
      !google_project_id ||
      !google_client_email ||
      !google_private_key
    ) {
      return NextResponse.json({
        error: "Google Analytics credentials are incomplete.",
        status: 500,
      });
    }

    const analyticsClient = new BetaAnalyticsDataClient({
      projectId: google_project_id,
      credentials: {
        private_key: google_private_key.split(String.raw`\n`).join("\n"),
        client_email: google_client_email,
      },
    });

    // Fetch active users (real-time report)
    const activeUsersParams = {
      property: `properties/${google_property_id}`,
      dimensions: [{ name: "country" }, { name: "city" }],
      metrics: [{ name: "activeUsers" }],
    };

    const activeUsersResponse = await fetchGoogleAnalyticsData(
      analyticsClient,
      {
        ...activeUsersParams,
      },
      true
    );

    // Fetch users in the past 24 hours (report)
    const currentDate = new Date();
    const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const usersPastDayParams = {
      property: `properties/${google_property_id}`,
      dateRanges: [
        { startDate: formatDate(startDate), endDate: formatDate(currentDate) },
      ],
      dimensions: [{ name: "country" }, { name: "city" }],
      metrics: [{ name: "activeUsers" }],
    };

    const usersPastDayResponse = await fetchGoogleAnalyticsData(
      analyticsClient,
      {
        ...usersPastDayParams,
      }
    );

    // Format the results
    const activeUsers = formatReport(activeUsersResponse);
    const usersPastDay = formatReport(usersPastDayResponse);

    return NextResponse.json({
      activeUsers,
      usersPastDay,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: `Server Error: ${error.message}`,
      status: 500,
    });
  }
}
