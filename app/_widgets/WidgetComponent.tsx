// Embeddable Widget Component
import React, { lazy, useCallback, useEffect, useRef, useState } from "react";
import { Tables } from "@/supabase/types";
import { DisplayNotification, EventData, MessageData } from "@/lib/types";
import { EventType, ScreenAlignment } from "@/lib/enums";
import Stripe from "stripe";
import { convertDateTime, replaceVariablesInContentBody } from "@/lib/actions";
import ExitPopupToast from "./ExitPopupToast";

interface WidgetConfig {
  siteUrl: string;
  projectId: string;
}

const Popup = lazy(() => import("./Popup"));

/**
 * Embed workflow:
 *
 * 1. Fetch project
 * 2. Fetch events and products associated with a project
 * 3. Fetch integrations associated with events (do so within a backend api call.)
 * 4. Fetch data from integrations
 * 5. Create a queue of events to be shown based on integration data.
 * 6. Display events
 */
const WidgetComponent = ({ siteUrl, projectId }: WidgetConfig) => {
  const [projectData, setProjectData] = useState<Tables<"Projects">>();
  const [eventData, setEventData] = useState<EventData>();
  const [productData, setProductData] = useState<Tables<"Products">[]>([]);
  const [notificationQueue, setNotificationQueue] = useState<
    DisplayNotification[]
  >([]);
  const [animation, setAnimation] = useState<string>("");
  const [isExitPopup, setExitPopup] = useState<boolean>(false);
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const [currentNotification, setCurrentNotification] = useState<
    DisplayNotification | undefined
  >(undefined);

  /**
   * Get the project data
   */
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `${siteUrl}/api/v1/projects?project_id=${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result: Tables<"Projects"> = (await response.json())?.data;
        setProjectData(result);
      } catch (error: any) {
        throw new Error("Error getting Taplo project: " + error.message);
      }
    };

    fetchProject();
  }, [projectId, siteUrl]);

  /**
   * Get the events data
   */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${siteUrl}/api/v1/events?project_id=${projectId}${
            projectData?.event_interval
              ? `&event_interval=${projectData.event_interval}`
              : ""
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result: EventData = await response.json();
        setEventData({
          events: result?.events,
          stripeData: result?.stripeData,
        });
      } catch (error: any) {
        throw new Error("Error getting Taplo events: " + error.message);
      }
    };
    fetchEvents();
  }, [projectData, projectId, siteUrl]);

  /**
   * Get the products associated with the project
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${siteUrl}/api/v1/products?project_id=${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result: Tables<"Products">[] = (await response.json())?.data;
        setProductData(result);
      } catch (error: any) {
        throw new Error("Error getting Taplo products: " + error.message);
      }
    };

    fetchProducts();
  }, [projectId, siteUrl]);

  /**
   * Create a queue of notification events to be shown based on integration data
   */
  useEffect(() => {
    const queue: DisplayNotification[] = [];

    const getFullStateName = (abbreviation: string) =>
      stateAbbreviations[abbreviation] || abbreviation;
    const getFullCountryName = (abbreviation: string) =>
      countryAbbreviations[abbreviation] || abbreviation;
    const getFirstName = (fullName: string) => fullName.split(" ")[0];

    console.log("eventData:", eventData);

    if (eventData?.stripeData?.charges) {
      createChargesQueueEvents(
        eventData,
        productData,
        getFirstName,
        getFullStateName,
        getFullCountryName,
        queue,
        projectData
      );
    }
    if (eventData?.stripeData?.checkoutSessions) {
      createCheckoutQueueEvents(
        eventData,
        productData,
        getFirstName,
        getFullStateName,
        getFullCountryName,
        queue,
        projectData
      );
    }

    //Randomize queue order before setting it

    setNotificationQueue(queue);
  }, [eventData, productData, projectData]);

  useEffect(() => {
    console.log("queue:", JSON.parse(JSON.stringify(notificationQueue)));
  }, [notificationQueue]);

  /**
   * Set the current notification in the queue based on the current index
   */
  useEffect(() => {
    setCurrentNotification(notificationQueue[currentNotificationIndex]);
  }, [notificationQueue, currentNotificationIndex]);

  /*
   * Set the animation based on the screen alignment
   */
  useEffect(() => {
    if (projectData) {
      const animation =
        projectData.screen_alignment === ScreenAlignment.BottomLeft ||
        projectData.screen_alignment === ScreenAlignment.TopLeft
          ? "animate-twSlideInLeft"
          : projectData.screen_alignment === ScreenAlignment.BottomRight ||
            projectData.screen_alignment === ScreenAlignment.TopRight
          ? "animate-twSlideInRight"
          : projectData.screen_alignment === ScreenAlignment.TopCenter
          ? "animate-twSlideInTop"
          : "animate-twSlideInBottom";

      setAnimation(animation);
    }
  }, [projectData]);

  /**
   * The interval allows the updateAnimation function to trigger in a loop every [displayTime] seconds.
   */
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getAnimation = (
    prevAnimation: string,
    orientation: string,
    isExitPopup: boolean
  ) => {
    if (isExitPopup || prevAnimation === `animate-twSlideIn${orientation}`) {
      return `animate-twSlideOut${orientation}`;
    } else {
      return `animate-twSlideIn${orientation}`;
    }
  };

  /**
   * Determine the animation direction based on the screen alignment
   */
  const determineAnimationDirection = useCallback(
    (prevAnimation: string, isExitPopup = false) => {
      if (!projectData) return prevAnimation;
      if (
        projectData.screen_alignment === ScreenAlignment.BottomLeft ||
        projectData.screen_alignment === ScreenAlignment.TopLeft
      ) {
        return getAnimation(prevAnimation, "Left", isExitPopup);
      } else if (
        projectData.screen_alignment === ScreenAlignment.BottomRight ||
        projectData.screen_alignment === ScreenAlignment.TopRight
      ) {
        return getAnimation(prevAnimation, "Right", isExitPopup);
      } else if (projectData.screen_alignment === ScreenAlignment.TopCenter) {
        return getAnimation(prevAnimation, "Top", isExitPopup);
      } else {
        return getAnimation(prevAnimation, "Bottom", isExitPopup);
      }
    },
    [projectData]
  );

  /**
   * Update the animation and notification queue in a rotating fashion
   */
  useEffect(() => {
    if (isExitPopup || notificationQueue.length === 0) return;

    const updateAnimationAndNotification = () => {
      setAnimation((prevAnimation) => {
        const newAnimation = determineAnimationDirection(prevAnimation);
        if (newAnimation.includes("In")) {
          setCurrentNotificationIndex(
            (prevIndex) => (prevIndex + 1) % notificationQueue.length
          );
        }
        return newAnimation;
      });
    };

    const getDisplayTime = () => projectData?.display_time || 8000;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(
      updateAnimationAndNotification,
      getDisplayTime()
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    projectData,
    isExitPopup,
    notificationQueue,
    determineAnimationDirection,
  ]);

  /**
   * Pause popups for 2 minutes when isExitPopup is set to true
   */
  const [showExitPopupToast, setShowExitPopupToast] = useState(false);
  useEffect(() => {
    let exitPopupTimer: NodeJS.Timeout;
    let toastTimer: NodeJS.Timeout;

    setShowExitPopupToast(true);

    if (isExitPopup) {
      exitPopupTimer = setTimeout(() => {
        setExitPopup(false);
      }, 600000); //5 minutes

      toastTimer = setTimeout(() => {
        setShowExitPopupToast(false);
      }, 4000);
    }
    return () => {
      clearTimeout(exitPopupTimer);
      clearTimeout(toastTimer);
    };
  }, [isExitPopup]);

  if (!projectData) return null;

  const getAlignmentClasses = () => {
    switch (projectData.screen_alignment) {
      case ScreenAlignment.BottomLeft:
        return "bottom-4 left-4";
      case ScreenAlignment.TopLeft:
        return "top-4 left-4";
      case ScreenAlignment.BottomRight:
        return "bottom-4 right-4";
      case ScreenAlignment.TopRight:
        return "top-4 right-4";
      case ScreenAlignment.BottomCenter:
        return "bottom-4 flex items-center justify-center w-full px-4";
      case ScreenAlignment.TopCenter:
        return "top-4 flex items-center justify-center w-full px-4";
      default:
        return "";
    }
  };

  return (
    <>
      <div className={`fixed z-50 ${getAlignmentClasses()}`}>
        {currentNotification?.event &&
          currentNotification?.message &&
          currentNotification?.time && (
            <div
              className={`${
                isExitPopup
                  ? `${determineAnimationDirection(
                      animation,
                      true //isExitPopup = true
                    )}`
                  : animation
              }`}
            >
              <Popup
                project={projectData}
                notification={currentNotification}
                setExitPopup={setExitPopup}
              />
            </div>
          )}
      </div>
      {isExitPopup && (
        <ExitPopupToast
          projectData={projectData}
          showExitPopupToast={showExitPopupToast}
        />
      )}
    </>
  );
};

export default WidgetComponent;

/**
 * Creates a queue of events to be shown based on stripe charges data
 */
const createChargesQueueEvents = (
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
    const product = productData.find(
      (product) =>
        product.stripe_product_id ===
        (
          (charge?.invoice as Stripe.Invoice)
            ?.subscription as Stripe.Subscription
        )?.items.data[0].price.product
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
      product: product,
    } as DisplayNotification);
  });
};

/**
 * Creates a queue of events to be shown based on stripe checkout session data
 */
const createCheckoutQueueEvents = (
  eventData: EventData,
  productData: Tables<"Products">[],
  getFirstName: (fullName: string) => string,
  getFullStateName: (abbreviation: string) => string,
  getFullCountryName: (abbreviation: string) => string,
  queue: DisplayNotification[],
  projectData: Tables<"Projects"> | undefined
) => {
  console.log("checkout sessions:", eventData.stripeData?.checkoutSessions);
};

const stateAbbreviations: { [key: string]: string } = {
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

const countryAbbreviations: { [key: string]: string } = {
  US: "United States",
  USA: "United States",
};
