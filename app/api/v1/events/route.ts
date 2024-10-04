import { getEvents } from "@/lib/actions/events";
import { getIntegrations } from "@/lib/actions/integrations";
import { NextRequest, NextResponse } from "next/server";
import { Tables } from "@/lib/supabase/types";
import { EventType } from "@/lib/enums";
import Stripe from "stripe";
import { GoogleData, StripeData } from "@/lib/types";
import { getURL } from "@/lib/actions";

/**
 * 1. get event data
 * 2. get integration data (do not return in response)
 * 3. get relevant data from integrations and return in next response
 */
export async function GET(request: NextRequest) {
  try {
    // Get the project_id from the query params
    const { searchParams } = new URL(request.url);
    const project_id = parseInt(searchParams.get("project_id") || "");
    const event_interval = searchParams.get("event_interval") || "2";

    if (!project_id) {
      return NextResponse.json({
        error: "Project ID is required",
        status: 400,
      });
    }

    //1. get event data
    const { data: eventData, error: eventError } = await getEvents(project_id);

    if (!eventData || eventError) {
      return NextResponse.json({
        error: `Get Events Error: ${eventError?.message}`,
        status: 500,
      });
    } else {
      //2. get integration data
      const { data: integrations, error: integrationError } =
        await getIntegrations(project_id, true);

      if (!integrations || integrationError) {
        return NextResponse.json({
          error: `Get Integrations Error: ${integrationError?.message}`,
          status: 500,
        });
      }

      //3. get relevant data from integrations
      const integrationData: {
        stripeData: StripeData;
        googleData: GoogleData;
      } = await getIntegrationData(eventData, integrations, event_interval);

      return NextResponse.json({
        events: eventData,
        stripeData: integrationData.stripeData,
        googleData: integrationData.googleData,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: `Get Events Error: ${error?.message}`,
      status: 500,
    });
  }
}

const getIntegrationData = async (
  events: Tables<"Events">[],
  integrations: Tables<"Integrations">[],
  event_interval: string
): Promise<{ stripeData: StripeData; googleData: GoogleData }> => {
  let stripeData: StripeData = {};
  let googleData: GoogleData = {};
  let integrationData: { stripeData: StripeData; googleData: GoogleData } = {
    stripeData,
    googleData,
  };

  // calculate the time to filter by based on the event interval
  const timeToFilter = calculateTimeToFilter(event_interval);

  await Promise.all(
    events.map(async (event) => {
      const integration = getCurrentIntegration(integrations, event);

      if (event?.event_type && integration?.provider && integration?.api_key) {
        const stripe = new Stripe(integration.api_key);

        switch (event.event_type as EventType) {
          case EventType.Purchase:
            integrationData.stripeData.charges = await getChargesFromStripe(
              stripe,
              timeToFilter
            );
            break;
          case EventType.Checkout:
            integrationData.stripeData.checkoutSessions =
              await getCheckoutSessions(stripe, timeToFilter);
            break;
          case EventType.ActiveVisitors:
            integrationData.googleData.activeVisitors =
              await getActiveVisitorsFromGoogle();
            break;
          case EventType.SomeoneViewing:
            // Google Analytics data
            break;
        }
      }
    })
  );
  return integrationData;
};

const getCurrentIntegration = (
  integrations: Tables<"Integrations">[],
  event: Tables<"Events">
) => {
  return integrations.find(
    (integration) => integration.id === event.integration_id
  );
};

function calculateTimeToFilter(event_interval: string) {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeToFilter = currentTime - parseInt(event_interval) * 24 * 60 * 60;
  return timeToFilter;
}

async function getCheckoutSessions(stripe: Stripe, timeToFilter: number) {
  const checkoutSessions = (
    await stripe.checkout.sessions.list({
      created: { gte: timeToFilter },
      status: "complete",
      expand: ["data.line_items", "data.invoice"],
    })
  )?.data;

  return checkoutSessions;
}

async function getChargesFromStripe(stripe: Stripe, timeToFilter: number) {
  const charges = (
    await stripe.charges.list({
      created: { gte: timeToFilter },
      expand: ["data.invoice.subscription"],
    })
  )?.data;

  return charges;
}

async function getActiveVisitorsFromGoogle() {
  // Google Analytics data
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  };
  const response = await fetch(
    `${getURL()}/api/v1/analytics/google`,
    requestOptions
  );
  return await response.json();
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
