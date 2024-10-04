import { NextRequest, NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "@google-analytics/data/build/protos/protos";

export async function POST(request: NextRequest) {
  try {
    const propertyId = "400908646";

    const private_key =
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4ItXJyP0LZiT7\nGkcmkgMNOUP5CX42zXSGWVKaNgXRNKvhQ8vAYWCL7yZfzMhOTsfuYWuAPQruKQVv\n3bL4Ruu51tC3d/qmuqHR6MwEyL8sXZjC2kFNgur/tPoWFTMRxEyeTpX3EeyeodzZ\niHLChwRZCvgsaILQLCMR2VJBUpEN3hS3ZGSCwNSvedp+x0rVscIZCcfXO/Z/E/WF\nnBEyBLAUC3G6GrmIZM1LYIeRonHA4J0Wyqxg8CfopT6hwKK40S2gJeYnQusu38+E\nwupHBICczMUpcAYQeP16DruELOzabyhPXZrh5nLaga9QY7k5ZNeSiYOpkOIyljtp\nniw5qhqHAgMBAAECggEARJM8mUyP6KnexeFQdC3WkxsrlFiTt6cmaU5ks+fAnNwH\n0vnjrL7XLOYgnXbvdjJixQVk+rpBEtcWHkYre8k1yt0Ul+9H2sYQs9MGABYfFE+7\nL34G6e4CxL5KkOTOQySfACn2MbBsNdvEGwN08btExECQkkFNzmdRnDkaKBeuy8Gw\nqbrSIdqjtcX9E2inL1/v5B8Y0/42cqZButcMbbdkUFs4oLC30QEWdjANX9IxKigK\nUDa/1Qe1/EpkcrpickpM/nT99JX8SA7eXBhKjZe64kemEcOCEi/iCG9BTftLhXnZ\nsyhhxNfalN1QCUSOkfIf0eECzbnP53t7wWOCGQXr+QKBgQD+S7b5L/4/bjvlo2II\nirl5TS/PPXl2SCNpKclUG4XRwoApr8M5RciTVTpYb1VTPbw7h7KT4Jqpemq1l6+Q\nPwgVLA39PkwOpMqFSwflkyG/VaMwXiJ8IU8iZDNsu5Op1n4gULQlmrAx+D375tMx\nkFn3ouWynGAQdTs2TIUx+uMXVQKBgQC5XsAJzUg2/4saZxlAPJwC+3XQasewK7rv\nolTJT04FlKqvXc7ZAkCEm3022DaEF7QH2ysvURY0TmbVDOPSWcQRgy/Z9Rm3lj+j\nqfF9iOkDBYn4No4kGgrL0iNTmHA2vvPsnnKHcUFF0QhQdymNefDFRgcDMNM9/c4c\na81+u+3yawKBgQCMPtW6uG1QLkt6apE2hMulypwDf7PtN/vPk+wlJsi21r44P2c7\nvvDP0MFM5Jn6PqIBcuVaCRVDQvB3FiENPLYIdzN/50urB9dpi+ffBTYnf+NwWXpL\nW1N5dCmoXgsiL9l/mQLBen6SEIae1r7DJwl3Oa/Uwcl5Si5N1AXheqyjwQKBgFyY\nkPMUgSs/8Vtp/roQzJnMxKgsfr1oysNjYlkA7WdqQOzCvk22i0XyadTYojrPoFWA\nTI0hQycztrhb7P2pa4CX+HI2tfb37agyfvgHSOYCgU3k6pHsFFKGELF0ZzFhp3Ue\nHPW9RC684RtYuv/51qSke2JDpHHF84xM6WSSOaUrAoGBAJhT7KSp5iGflp8IAThx\n1SAKDyxDwB2DX1tGGAwE2gEXly34JDqimKg9gaz5t24SSJJbfXGQ86THUmKZtFvu\nBch/LfdbTG89w8mwV5lm7glJPSXcUwNLxH8bwX4SFtZTIxdUw7FmcaEmIECWpLO/\nfJZ1lKaFf9IefoNh43Scj/an\n-----END PRIVATE KEY-----\n"
        .split(String.raw`\n`)
        .join("\n");

    // Using a default constructor instructs the client to use the credentials
    // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
    const analyticsDataClient = new BetaAnalyticsDataClient({
      projectId: "intelliboard-416510",
      credentials: {
        private_key: private_key,
        client_email: "testaccount@intelliboard-416510.iam.gserviceaccount.com",
      },
    });

    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
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
