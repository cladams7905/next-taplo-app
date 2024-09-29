import { getEvents } from "@/lib/actions/events";
import { getIntegrations } from "@/lib/actions/integrations";
import { NextRequest, NextResponse } from "next/server";
import { Tables } from "@/supabase/types";
import { EventType } from "@/lib/enums";
import Stripe from "stripe";
import { StripeData } from "@/lib/types";

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
      const { data: integrationData, error: integrationError } =
        await getIntegrations(project_id, true);

      if (!integrationData || integrationError) {
        return NextResponse.json({
          error: `Get Integrations Error: ${integrationError?.message}`,
          status: 500,
        });
      } else {
        //3. get relevant data from integrations
        const stripeData = await getStripeData(
          eventData,
          integrationData,
          event_interval
        );

        return NextResponse.json({
          events: eventData,
          stripeData: stripeData,
        });
      }
    }
  } catch (error: any) {
    return NextResponse.json({
      error: `Get Events Error: ${error?.message}`,
      status: 500,
    });
  }
}

const getStripeData = async (
  events: Tables<"Events">[],
  integrations: Tables<"Integrations">[],
  event_interval: string
): Promise<StripeData> => {
  let stripeData: StripeData = {};

  // calculate the time to filter by based on the event interval
  const currentTime = Math.floor(Date.now() / 1000);
  const timeToFilter = currentTime - parseInt(event_interval) * 24 * 60 * 60;

  await Promise.all(
    events.map(async (event) => {
      const integration = integrations.find(
        (integration) => integration.id === event.integration_id
      );

      if (event?.event_type && integration?.provider && integration?.api_key) {
        const stripe = new Stripe(integration.api_key);

        switch (event.event_type as EventType) {
          case EventType.Purchase:
            stripeData.charges = await getChargesFromStripe(
              stripe,
              timeToFilter
            );
            break;
          case EventType.Checkout:
            stripeData.checkoutSessions = await getCheckoutSessions(
              stripe,
              timeToFilter
            );
            break;
          case EventType.CustomerTrends:
          case EventType.SomeoneViewing:
          case EventType.ActiveVisitors:
        }
      }
    })
  );
  return stripeData;
};

async function getCheckoutSessions(stripe: Stripe, timeToFilter: number) {
  const checkoutSessions = (
    await stripe.checkout.sessions.list({
      created: { gte: timeToFilter },
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
