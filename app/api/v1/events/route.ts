import { getEvents } from "@/lib/actions/events";
import { getIntegrations } from "@/lib/actions/integrations";
import { NextRequest, NextResponse } from "next/server";
import { Tables } from "@/supabase/types";
import { EventType, Providers } from "@/lib/enums";
import Stripe from "stripe";
import { DisplayData } from "@/lib/types";

/**
 * 1. get event data
 * 2. get integration data (do not return in response)
 * 3. get relevant data from integrations and return in next response
 */
export async function GET(request: NextRequest) {
  try {
    // Get the project_id from the query params
    const { searchParams } = new URL(request.url);
    const project_id = searchParams.get("project_id");
    const event_interval = searchParams.get("event_interval") || "2";

    if (!project_id) {
      return NextResponse.json({
        error: "Project ID is required",
        status: 400,
      });
    }

    //1. get event data
    const {
      data: eventData,
      error: eventError,
    }: { data: Tables<"Events">[]; error: any } = await getEvents(project_id);

    if (!eventData || eventError) {
      return NextResponse.json({
        error: `Get Events Error: ${eventError?.message}`,
        status: 500,
      });
    } else {
      //2. get integration data
      const {
        data: integrationData,
        error: integrationError,
      }: { data: Tables<"Integrations">[]; error: any } = await getIntegrations(
        project_id,
        true
      );
      if (!integrationData || integrationError) {
        return NextResponse.json({
          error: `Get Integrations Error: ${integrationError?.message}`,
          status: 500,
        });
      } else {
        //3. for each event, get the relevant integration data
        const displayData = getDataFromIntegrations(
          eventData,
          integrationData,
          event_interval
        );

        return NextResponse.json({
          events: eventData,
          displayData: displayData,
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

const getDataFromIntegrations = (
  events: Tables<"Events">[],
  integrations: Tables<"Integrations">[],
  event_interval: string
) => {
  let displayData: DisplayData = {
    stripeData: {
      paymentIntents: [],
      checkoutSessions: [],
    },
  };
  const currentTime = Math.floor(Date.now() / 1000);
  const timeToFilter = currentTime - parseInt(event_interval) * 24 * 60 * 60;

  events.forEach(async (event) => {
    //get the corresponding integration
    const integration = integrations.find(
      (integration) => integration.id === event.integration_id
    );

    if (event?.event_type && integration?.provider && integration?.api_key) {
      switch (event.event_type as EventType) {
        case EventType.Purchase:
          // get paymentintents from stripe to represent purchase events
          if (integration.provider === Providers.Stripe) {
            if (displayData.stripeData.paymentIntents?.length === 0) {
              const stripe = new Stripe(integration.api_key);

              const paymentIntents = (
                await stripe.paymentIntents.list({
                  created: { gte: timeToFilter }, //only get events from the past [timeToFilter] days
                })
              )?.data; // To get next 25 payment intents, pass in id of last object of the previous returned list as the "starting_after" value.

              displayData.stripeData.paymentIntents = paymentIntents;
            }
          }
          break;
        case EventType.Checkout:
          // get checkout sessions from stripe to represent adding to cart
          if (integration.provider === Providers.Stripe) {
            if (displayData.stripeData.checkoutSessions?.length === 0) {
              const stripe = new Stripe(integration.api_key);

              const checkoutSessions = (
                await stripe.checkout.sessions.list({
                  created: { gte: timeToFilter },
                })
              )?.data;

              displayData.stripeData.checkoutSessions = checkoutSessions;
            }
          }
        case EventType.CustomerTrends:
        case EventType.SomeoneViewing:
        case EventType.ActiveVisitors:
      }
    }
  });
  return displayData;
};
