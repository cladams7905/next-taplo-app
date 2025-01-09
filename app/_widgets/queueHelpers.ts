import { EventType } from "@/lib/enums";
import Stripe from "stripe";
import { convertDateTime, replaceVariablesInContentBody } from "@/lib/actions";
import { DisplayNotification, EventData, MessageData } from "@/lib/types";
import { Tables } from "@/lib/supabase/types";
import countryCodes from "./countrycodes.json";
import stateCodes from "./statecodes.json";

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
        purchaseEvent?.message || "",
        true, // isPopup
        true, // isLiveMode
        true, //isShowProductAsLink
        product,
        projectData?.name,
        projectData?.bg_color || "#FFFFFF",
        projectData?.accent_color || "#7A81EB",
        messageData
      ),
      time: convertDateTime(
        new Date(charge.created * 1000).toUTCString(),
        false,
        true
      ),
      event: purchaseEvent,
      product: purchaseEvent?.message.includes("\\PRODUCT")
        ? product
        : undefined,
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
        checkoutEvent?.message || "",
        true, // isPopup
        true, // isLiveMode
        true, //isShowProductAsLink = true
        product,
        projectData?.name,
        projectData?.bg_color || "#FFFFFF",
        projectData?.accent_color || "#7A81EB",
        messageData
      ),
      time: convertDateTime(
        new Date(checkoutSession.created * 1000).toUTCString(),
        false,
        true
      ),
      event: checkoutEvent,
      product: checkoutEvent?.message.includes("\\PRODUCT")
        ? product
        : undefined,
    } as DisplayNotification);
  });
};

/**
 * Creates a queue of events to be shown based on google analytics active users data
 * (used for "Someone is Viewing" and "Active Users" events)
 */
export const createActiveUsersQueueEvents = (
  eventData: EventData,
  queue: DisplayNotification[],
  projectData: Tables<"Projects"> | undefined
) => {
  const activeUsersEvent = eventData.events.find(
    (event) => event.event_type === EventType.ActiveUsers
  );
  const someoneIsViewingEvent = eventData.events.find(
    (event) => event.event_type === EventType.SomeoneViewing
  );

  if (activeUsersEvent) {
    const activeUserCount = eventData.googleData?.activeUsers?.reduce(
      (acc, user) => acc + (parseInt(user.visitorCount) || 0),
      0
    );
    const usersPastDayCount = eventData.googleData?.usersPastDay?.reduce(
      (acc, user) => acc + (parseInt(user.visitorCount) || 0),
      0
    );
    if (activeUserCount && activeUserCount > 0) {
      const messageData: MessageData = {
        numActiveUsers: activeUserCount,
      };
      queue.push({
        message: replaceVariablesInContentBody(
          activeUsersEvent?.message || "",
          true, // isPopup
          true, // isLiveMode
          false, //isShowProductAsLink = false
          undefined,
          projectData?.name,
          projectData?.bg_color || "#FFFFFF",
          projectData?.accent_color || "#7A81EB",
          messageData
        ),
        time: convertDateTime(new Date().toUTCString(), false, true),
        event: activeUsersEvent,
        product: undefined,
      } as DisplayNotification);
    }
    if (usersPastDayCount && usersPastDayCount > 0) {
      const messageData: MessageData = {
        numUsersPastDay: usersPastDayCount,
      };
      queue.push({
        message: replaceVariablesInContentBody(
          `${usersPastDayCount} users in the past 24 hours have visited ${projectData?.name}'s site.`,
          true, // isPopup
          true, // isLiveMode
          false, //isShowProductAsLink = false
          undefined,
          projectData?.name,
          projectData?.bg_color || "#FFFFFF",
          projectData?.accent_color || "#7A81EB",
          messageData
        ),
        time: convertDateTime(new Date().toUTCString(), false, true),
        event: activeUsersEvent,
        product: undefined,
      } as DisplayNotification);
    }
  }

  if (someoneIsViewingEvent) {
    eventData.googleData?.activeUsers?.forEach((activeUser) => {
      const messageData: MessageData = {
        customerAddress: {
          city: activeUser.city,
          country: activeUser.country,
        },
      };
      queue.push({
        message: replaceVariablesInContentBody(
          someoneIsViewingEvent?.message || "",
          true, // isPopup
          true, // isLiveMode
          false, //isShowProductAsLink = false
          undefined,
          projectData?.name,
          projectData?.bg_color || "#FFFFFF",
          projectData?.accent_color || "#7A81EB",
          messageData
        ),
        time: convertDateTime(new Date().toUTCString(), false, true),
        event: someoneIsViewingEvent,
        product: undefined,
      } as DisplayNotification);
    });
  }
};

/**
 * Gets the full name of a country based on the Stripe abbreviation code.
 * @param countryKey the two-letter country abbreviation
 * @returns the country name, or empty string if not found
 */
export const getFullCountryName = (countryKey: string) => {
  const country = countryCodes.find((c) => c.key === countryKey);
  return country?.name || "";
};

/**
 * Gets the full name of a state based on the abbreviation code.
 * @param stateKey the two-letter state abbreviation
 * @returns the state name, or empty string if not found
 */
export const getFullStateName = (stateKey: string) => {
  const state = stateCodes.find((s) => s.key === stateKey);
  return state?.name || "";
};
