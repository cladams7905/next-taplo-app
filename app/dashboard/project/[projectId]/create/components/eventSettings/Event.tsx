"use client";

import { Tables } from "@/supabase/types";
import IntegrationSelect from "./integrations/IntegrationSelect";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  TransitionStartFunction,
  useEffect,
  useState,
} from "react";
import { EventType } from "@/lib/enums";
import { Ellipsis, Trash } from "lucide-react";
import ProductList from "./ProductList";
import { updateEvent } from "@/lib/actions/events";
import { showToastError } from "@/components/shared/showToast";

export default function Event({
  fetchedEvent,
  events,
  activeProject,
  setActiveProject,
  fetchedIntegrations,
  startEventTransition,
  isCollapseOpen,
  handleEventDelete,
  toggleElement,
}: {
  fetchedEvent: Tables<"Events">;
  events: Tables<"Events">[];
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  fetchedIntegrations: Tables<"Integrations">[];
  startEventTransition: TransitionStartFunction;
  isCollapseOpen: boolean;
  handleEventDelete: (eventId: number) => void;
  toggleElement: RefObject<HTMLUListElement>;
}) {
  const [event, setEvent] = useState<Tables<"Events">>(fetchedEvent);
  const [integrations, setIntegrations] =
    useState<Tables<"Integrations">[]>(fetchedIntegrations);

  useEffect(() => {
    setEvent(fetchedEvent);
  }, [fetchedEvent]);

  /* Event state variables */
  const [isShowPriceChecked, setShowPriceChecked] = useState<boolean>(
    event?.show_price || true
  );
  const [
    isShowAddToCartNotificationsChecked,
    setShowAddToCartNotificationsChecked,
  ] = useState<boolean>(event?.show_add_to_cart || true);
  const [
    isShowRecentlyViewedProductsChecked,
    setShowRecentlyViewedProductsChecked,
  ] = useState<boolean>(event?.show_viewed_products || true);
  const [isShowRecentlyActiveUsersChecked, setShowRecentlyActiveUsersChecked] =
    useState<boolean>(event?.show_recently_active_users || true);
  const [isShowPositiveReviewsChecked, setShowPositiveReviewsChecked] =
    useState<boolean>(event?.show_positive_reviews || true);

  const getIntegrationById = (integrationId: number) => {
    return integrations.find((integration) => integration.id === integrationId);
  };

  const handleUpdateIntegration = async (
    event: Tables<"Events">,
    integrationId: number
  ) => {
    const eventUpdateResult = await updateEvent(event.id, {
      ...event,
      integration_id: integrationId,
    });

    if (eventUpdateResult.error) {
      showToastError(eventUpdateResult.error);
    } else {
      setEvent({ ...event, integration_id: integrationId });
    }
  };

  const handleShowPriceToggle = (event: Tables<"Events">) => {
    startEventTransition(async () => {
      setShowPriceChecked(!isShowPriceChecked);
      const eventUpdateResult = await updateEvent(event.id, {
        ...event,
        show_price: !event.show_price,
      });

      if (eventUpdateResult.error) {
        showToastError(eventUpdateResult.error);
      } else {
        setEvent({ ...event, show_price: !event.show_price });
      }
    });
  };

  const handleShowAddToCartNotifications = (event: Tables<"Events">) => {
    startEventTransition(async () => {
      setShowAddToCartNotificationsChecked(
        !isShowAddToCartNotificationsChecked
      );
      const eventUpdateResult = await updateEvent(event.id, {
        ...event,
        show_add_to_cart: !event.show_add_to_cart,
      });

      if (eventUpdateResult.error) {
        showToastError(eventUpdateResult.error);
      } else {
        setEvent({ ...event, show_add_to_cart: !event.show_add_to_cart });
      }
    });
  };

  const handleShowRecentlyViewedProductsNotifications = (
    event: Tables<"Events">
  ) => {
    startEventTransition(async () => {
      setShowRecentlyViewedProductsChecked(
        !isShowRecentlyViewedProductsChecked
      );
      const eventUpdateResult = await updateEvent(event.id, {
        ...event,
        show_viewed_products: !event.show_viewed_products,
      });

      if (eventUpdateResult.error) {
        showToastError(eventUpdateResult.error);
      } else {
        setEvent({
          ...event,
          show_viewed_products: !event.show_viewed_products,
        });
      }
    });
  };

  const handleShowRecentlyActiveUsersNotifications = (
    event: Tables<"Events">
  ) => {
    startEventTransition(async () => {
      setShowRecentlyActiveUsersChecked(!isShowRecentlyActiveUsersChecked);
      const eventUpdateResult = await updateEvent(event.id, {
        ...event,
        show_recently_active_users: !event.show_recently_active_users,
      });

      if (eventUpdateResult.error) {
        showToastError(eventUpdateResult.error);
      } else {
        setEvent({
          ...event,
          show_recently_active_users: !event.show_recently_active_users,
        });
      }
    });
  };

  const handleShowPositiveReviews = (event: Tables<"Events">) => {
    startEventTransition(async () => {
      setShowPositiveReviewsChecked(!isShowPositiveReviewsChecked);
      const eventUpdateResult = await updateEvent(event.id, {
        ...event,
        show_positive_reviews: !event.show_positive_reviews,
      });

      if (eventUpdateResult.error) {
        showToastError(eventUpdateResult.error);
      } else {
        setEvent({
          ...event,
          show_positive_reviews: !event.show_positive_reviews,
        });
      }
    });
  };
  return (
    <>
      <input type="radio" className="-z-10" />
      <div className="collapse-title flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="font-bold">{event.event_type}</div>
          <div className="text-xs text-gray-400">
            Listens to:{" "}
            {event.integration_id ? (
              getIntegrationById(event.integration_id)?.provider
            ) : (
              <span className="text-error">None Selected</span>
            )}
          </div>
        </div>
        <div
          className={`dropdown ${
            isCollapseOpen ? "dropdown-end" : "dropdown-left"
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleElement?.current?.classList.remove("hidden");
          }}
        >
          <div
            className="p-2 -mt-[10px] rounded-lg cursor-pointer hover:bg-primary/20"
            tabIndex={1}
          >
            <Ellipsis width={20} height={20} />
          </div>
          <ul
            tabIndex={1}
            ref={toggleElement}
            className={`menu menu-sm dropdown-content ${
              !isCollapseOpen && "-mt-[10px] mr-1"
            } border border-neutral z-[10] shadow bg-base-100 rounded-md min-w-40`}
          >
            <li>
              <a
                className="flex flex-col items-start rounded-md"
                onClick={() => handleEventDelete(event.id)}
              >
                <div className="flex items-center gap-2">
                  {" "}
                  <Trash width={16} height={16} />
                  Delete
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="collapse-content flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex flex-col gap-2">
          <IntegrationSelect
            activeProject={activeProject}
            setActiveProject={setActiveProject}
            currentEvent={event}
            events={events}
            integrations={integrations}
            setIntegrations={setIntegrations}
            startEventTransition={startEventTransition}
            handleUpdateIntegration={handleUpdateIntegration}
          />
        </div>
        {event.event_type === EventType.OnPurchase && (
          <div className="w-full flex flex-col gap-2">
            <ProductList
              currentEvent={event}
              setEvent={setEvent}
              startEventTransition={startEventTransition}
            />
          </div>
        )}
        <div className="w-full flex flex-col gap-2 pb-2">
          <div className="flex flex-row w-full justify-between">
            <div className="flex items-center gap-2 font-bold">Settings</div>
          </div>
          {event.event_type === EventType.OnPurchase && (
            <div className="flex flex-col w-full gap-3 mt-2 ml-2">
              <div className="flex flex-row items-center gap-2 text-sm">
                Show price
                <input
                  type="checkbox"
                  checked={isShowPriceChecked}
                  className="toggle toggle-primary toggle-sm"
                  onChange={() => handleShowPriceToggle(event)}
                />
              </div>
              <div className="flex flex-row items-center gap-2 text-sm">
                Show add to cart notifications{" "}
                <input
                  type="checkbox"
                  checked={isShowAddToCartNotificationsChecked}
                  className="toggle toggle-primary toggle-sm"
                  onChange={() => handleShowAddToCartNotifications(event)}
                />
              </div>
              <div className="flex flex-row items-center gap-2 text-sm">
                Show recently viewed products notifications{" "}
                <input
                  type="checkbox"
                  checked={isShowRecentlyViewedProductsChecked}
                  className="toggle toggle-primary toggle-sm"
                  onChange={() =>
                    handleShowRecentlyViewedProductsNotifications(event)
                  }
                />
              </div>
            </div>
          )}
          {event.event_type === EventType.OnReview && (
            <div className="flex flex-col w-full gap-3 mt-2 ml-2">
              {" "}
              <div className="flex flex-row items-center gap-2 text-sm">
                Only show 4-5 star reviews{" "}
                <input
                  type="checkbox"
                  checked={isShowPositiveReviewsChecked}
                  className="toggle toggle-primary toggle-sm"
                  onChange={() => handleShowPositiveReviews(event)}
                />
              </div>
            </div>
          )}
          {event.event_type === EventType.ActiveUsers && (
            <div className="flex flex-col w-full gap-3 mt-2 ml-2">
              {" "}
              <div className="flex flex-row items-center gap-2 text-sm">
                Show recently active users notifications
                <input
                  type="checkbox"
                  checked={isShowRecentlyActiveUsersChecked}
                  className="toggle toggle-primary toggle-sm"
                  onChange={() =>
                    handleShowRecentlyActiveUsersNotifications(event)
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
