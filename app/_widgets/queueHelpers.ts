import { EventType } from "@/lib/enums";
import Stripe from "stripe";
import { convertDateTime, replaceVariablesInContentBody } from "@/lib/actions";
import { DisplayNotification, EventData, MessageData } from "@/lib/types";
import { Tables } from "@/lib/supabase/types";

/**
 * Randomizes the order of the queue
 */
export const randomizeQueueOrder = (queue: DisplayNotification[]) => {
  return queue.sort(() => Math.random() - 0.5);
};

/**
 * Creates a queue of events to be shown based on stripe charges data
 */
export const createChargesQueueEvents = (
  eventData: EventData,
  productData: Tables<"Products">[],
  getFirstName: (fullName: string) => string,
  getFullStateName: (abbreviation: string) => string,
  getFullCountryName: (abbreviation: string) => string,
  queue: DisplayNotification[],
  projectData: Tables<"Projects"> | undefined
) => {
  const purchaseEvent = eventData.events.find(
    (event) => event.event_type === EventType.Purchase
  );

  eventData.stripeData?.charges?.forEach((charge) => {
    const product =
      productData.find(
        (product) =>
          product.stripe_product_id ===
          (
            (charge?.invoice as Stripe.Invoice)
              ?.subscription as Stripe.Subscription
          )?.items.data[0].price.product
      ) || // if product is not found, try to find product by matching price
      productData.find(
        (product) => Math.round((product?.price ?? 0) * 100) === charge.amount
      );

    const messageData: MessageData = {
      customerName: getFirstName(
        charge.billing_details.name ||
          (charge?.invoice as Stripe.Invoice)?.customer_name ||
          "Someone"
      ),
      customerAddress: {
        city:
          charge.billing_details.address?.city ||
          (charge?.invoice as Stripe.Invoice)?.customer_address?.city,
        state: getFullStateName(
          charge.billing_details.address?.state ||
            (charge?.invoice as Stripe.Invoice)?.customer_address?.state ||
            ""
        ),
        country: getFullCountryName(
          charge.billing_details.address?.country ||
            (charge?.invoice as Stripe.Invoice)?.customer_address?.country ||
            ""
        ),
      },
    };

    queue.push({
      message: replaceVariablesInContentBody(
        product,
        projectData?.bg_color || "#FFFFFF",
        projectData?.accent_color || "#7A81EB",
        purchaseEvent?.content_body || "",
        true, // isPopup
        true, // isLiveMode
        messageData
      ),
      time: convertDateTime(
        new Date(charge.created * 1000).toUTCString(),
        false,
        true
      ),
      event: purchaseEvent,
      product: purchaseEvent?.content_body.includes("\\PRODUCT")
        ? product
        : null,
    } as DisplayNotification);
  });
};

/**
 * Creates a queue of events to be shown based on stripe checkout session data
 */
export const createCheckoutQueueEvents = (
  eventData: EventData,
  productData: Tables<"Products">[],
  getFirstName: (fullName: string) => string,
  getFullStateName: (abbreviation: string) => string,
  getFullCountryName: (abbreviation: string) => string,
  queue: DisplayNotification[],
  projectData: Tables<"Projects"> | undefined
) => {
  const checkoutEvent = eventData.events.find(
    (event) => event.event_type === EventType.Checkout
  );

  eventData.stripeData?.checkoutSessions?.forEach((checkoutSession) => {
    const product =
      productData.find(
        (product) =>
          product.stripe_product_id ===
          checkoutSession?.line_items?.data[0]?.price?.product
      ) || // if product is not found, try to find product by matching price
      productData.find(
        (product) =>
          Math.round((product?.price ?? 0) * 100) ===
          checkoutSession?.line_items?.data[0]?.price?.unit_amount
      );

    const messageData: MessageData = {
      customerName: getFirstName(
        checkoutSession.customer_details?.name ||
          (checkoutSession?.invoice as Stripe.Invoice)?.customer_name ||
          "Someone"
      ),
      customerAddress: {
        city:
          checkoutSession.customer_details?.address?.city ||
          (checkoutSession?.invoice as Stripe.Invoice)?.customer_address?.city,
        state: getFullStateName(
          checkoutSession.customer_details?.address?.state ||
            (checkoutSession?.invoice as Stripe.Invoice)?.customer_address
              ?.state ||
            ""
        ),
        country: getFullCountryName(
          checkoutSession.customer_details?.address?.country ||
            (checkoutSession?.invoice as Stripe.Invoice)?.customer_address
              ?.country ||
            ""
        ),
      },
    };

    queue.push({
      message: replaceVariablesInContentBody(
        product,
        projectData?.bg_color || "#FFFFFF",
        projectData?.accent_color || "#7A81EB",
        checkoutEvent?.content_body || "",
        true, // isPopup
        true, // isLiveMode
        messageData
      ),
      time: convertDateTime(
        new Date(checkoutSession.created * 1000).toUTCString(),
        false,
        true
      ),
      event: checkoutEvent,
      product: checkoutEvent?.content_body.includes("\\PRODUCT")
        ? product
        : null,
    } as DisplayNotification);
  });
};

export const stateAbbreviations: { [key: string]: string } = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

export const countryAbbreviations: { [key: string]: string } = {
  US: "United States",
  USA: "United States",
};
