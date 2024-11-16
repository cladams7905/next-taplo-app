// Embeddable Widget Component
import React, { lazy, useCallback, useEffect, useRef, useState } from "react";
import { Tables } from "@/lib/supabase/types";
import { Tables as StripeTables } from "@/lib/stripe/types";
import { DisplayNotification, EventData } from "@/lib/types";
import ExitPopupToast from "./ExitPopupToast";
import {
  createChargesQueueEvents,
  createCheckoutQueueEvents,
  randomizeQueueOrder,
  getFullCountryName,
  getFullStateName,
  createActiveUsersQueueEvents,
} from "./queueHelpers";
import { ScreenAlignment } from "@/lib/enums";

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
  const [animation, setAnimation] = useState<string>("");
  const [isExitPopup, setExitPopup] = useState<boolean>(false);
  const [isActiveSubscription, setActiveSubscription] =
    useState<boolean>(false);
  const [notificationQueue, setNotificationQueue] = useState<
    DisplayNotification[]
  >([]);
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const [currentNotification, setCurrentNotification] = useState<
    DisplayNotification | undefined
  >(undefined);

  /**
   * Get the project data
   */
  const fetchProject = useCallback(async () => {
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
  }, [projectId, siteUrl]);

  /**
   * Get the events associated with the project
   */
  const fetchEvents = useCallback(async () => {
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
        googleData: result?.googleData,
      });
    } catch (error: any) {
      throw new Error("Error getting Taplo events: " + error.message);
    }
  }, [siteUrl, projectId, projectData?.event_interval]);

  /**
   * Fetch the user's active subscription, if one exists
   * If no active subscription is found, then don't show the popup notifications
   */
  const fetchActiveSubscription = useCallback(async () => {
    try {
      const response = await fetch(
        `${siteUrl}/api/v1/stripe/subscriptions?user_id=${projectData?.user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const {
        data: subscription,
        error,
        status,
      }: {
        data: StripeTables<"subscriptions">;
        error: string;
        status: number;
      } = await response.json();

      if (
        !error &&
        status === 200 &&
        (subscription?.status === "active" ||
          subscription?.status === "trialing")
      ) {
        setActiveSubscription(true);
      }
    } catch (error: any) {
      throw new Error("Error getting Taplo project: " + error.message);
    }
  }, [siteUrl, projectData?.user_id]);

  /**
   * Get the products associated with the project
   */
  const fetchProducts = useCallback(async () => {
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
  }, [siteUrl, projectId]);

  /**
   * Fetch project, events, active subscription, and products
   */
  useEffect(() => {
    const fetchData = async () => {
      await fetchProject();
    };
    fetchData();
  }, [fetchProject]);

  useEffect(() => {
    if (projectData) {
      fetchEvents(); // Only call fetchEvents if projectData is available
    }
  }, [projectData, fetchEvents]);

  useEffect(() => {
    if (projectData) {
      fetchActiveSubscription();
      fetchProducts();
    }
  }, [projectData, fetchActiveSubscription, fetchProducts]);

  /**
   * Create a queue of notification events to be shown based on integration data
   */
  useEffect(() => {
    const queue: DisplayNotification[] = [];

    const getFirstName = (fullName: string) => fullName.split(" ")[0];

    if (window.location.hostname === "localhost") {
      console.log("eventData:", eventData);
    }

    if (
      eventData?.stripeData?.charges &&
      eventData.stripeData.charges.length > 0
    ) {
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
    if (
      eventData?.stripeData?.checkoutSessions &&
      eventData.stripeData.checkoutSessions.length > 0
    ) {
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
    if (
      eventData?.googleData?.activeUsers &&
      eventData.googleData.activeUsers.length > 0
    ) {
      createActiveUsersQueueEvents(eventData, queue, projectData);
    }

    //Randomize queue order before setting it
    setNotificationQueue(randomizeQueueOrder(queue));
  }, [eventData, productData, projectData]);

  useEffect(() => {
    if (window.location.hostname === "localhost") {
      console.log("queue:", JSON.parse(JSON.stringify(notificationQueue)));
    }
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
   * Pause popups for 5 minutes when isExitPopup is set to true
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
    isActiveSubscription && (
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
    )
  );
};

export default WidgetComponent;
