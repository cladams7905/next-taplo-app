// Embeddable Widget Component
import React, { lazy, useEffect, useRef, useState } from "react";
import { Tables } from "@/supabase/types";
import { DisplayNotification, EventData } from "@/lib/types";
import { EventType, ScreenAlignment } from "@/lib/enums";
import Stripe from "stripe";

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
    //The queue should alternate so that displayed events vary
    let queue: DisplayNotification[] = [];

    //Populate the queue with stripe data
    if (eventData?.stripeData) {
      if (eventData.stripeData.charges) {
        const purchaseEvent = eventData.events.find(
          (event) => event.event_type === EventType.Purchase
        );
        eventData.stripeData.charges.forEach((charge) => {
          queue.push({
            message: purchaseEvent?.content_body || "",
            time: new Date(charge.created * 1000).toUTCString(),
            event: purchaseEvent,
            product: productData.find(
              (product) =>
                product.id ===
                parseInt(
                  (
                    (charge?.invoice as Stripe.Invoice)
                      ?.subscription as Stripe.Subscription
                  )?.items.data[0].price.product as string
                )
            ),
          } as DisplayNotification);
        });
      }
      if (eventData.stripeData.checkoutSessions) {
      }
    }
    setNotificationQueue(queue);
  }, [eventData, productData]);

  useEffect(() => {
    console.log("queue:", JSON.parse(JSON.stringify(notificationQueue)));
  }, [notificationQueue]);

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

  const determineAnimationDirection = (
    prevAnimation: string,
    isExitPopup = false
  ) => {
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
  };

  /**
   * This controls the updating of the popup animation based on the time interval provided.
   */
  useEffect(() => {
    if (isExitPopup) return;

    const updateAnimation = () => {
      setAnimation((prevAnimation) => {
        const newAnimation = determineAnimationDirection(prevAnimation);
        return newAnimation;
      });
    };

    const getDisplayTime = () => projectData?.display_time || 5000;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(
      updateAnimation,
      animation.includes("In") ? getDisplayTime() : 750
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [animation, projectData, isExitPopup]);

  if (!projectData) return null;

  return (
    <div
      className={`fixed z-50 ${
        projectData.screen_alignment === ScreenAlignment.BottomLeft
          ? "bottom-4 left-4"
          : projectData.screen_alignment === ScreenAlignment.TopLeft
          ? "top-4 left-4"
          : projectData.screen_alignment === ScreenAlignment.BottomRight
          ? "bottom-4 right-4"
          : projectData.screen_alignment === ScreenAlignment.TopRight
          ? "top-4 right-4"
          : projectData.screen_alignment === ScreenAlignment.BottomCenter
          ? "bottom-4 flex items-center justify-center w-full"
          : projectData.screen_alignment === ScreenAlignment.TopCenter
          ? "top-4 flex items-center justify-center w-full"
          : ""
      }`}
    >
      {eventData?.events && eventData.events.length > 0 && (
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
            product={productData}
            event={eventData.events[0]}
            contentBody={eventData.events[0].content_body}
            setExitPopup={setExitPopup}
          />
        </div>
      )}
    </div>
  );
};

export default WidgetComponent;
