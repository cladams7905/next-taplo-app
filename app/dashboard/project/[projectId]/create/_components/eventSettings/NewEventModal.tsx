"use client";

import { EventType } from "@/lib/enums";
import { TablesInsert } from "@/supabase/types";
import { showToastError } from "@/components/shared/showToast";
import { sortByTimeCreated } from "@/lib/actions";
import { createEvent } from "@/lib/actions/events";
import {
  Boxes,
  Search,
  ShoppingBag,
  ShoppingCart,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";
import { RefObject, useState, useTransition } from "react";
import { useProjectContext } from "../ProjectBoard";

type EventOption = {
  title: string;
  integrations: string;
  description: string;
  type: EventType;
  color: string;
};

export default function NewEventModal({
  eventModalRef,
}: {
  eventModalRef: RefObject<HTMLDialogElement>;
}) {
  const { activeProject, events, setEvents, setActiveEvent } =
    useProjectContext();
  const [isLoading, startLoadingTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const eventOptions = getEventOptions();
  const filteredEvents: EventOption[] = eventOptions.filter(
    (event) =>
      event?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event?.integrations?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateEvent = (eventType: EventType) => {
    startLoadingTransition(async () => {
      if (activeProject) {
        const content = setEventContent(eventType);
        const event: TablesInsert<"Events"> = {
          user_id: activeProject.user_id,
          project_id: activeProject.id,
          event_type: eventType,
          content_body: content,
        };
        const { data, error } = await createEvent(event);
        if (error) {
          showToastError(error);
        } else {
          setEvents((prevEvents) => {
            const updatedEvents = sortByTimeCreated([...prevEvents, data]);
            setActiveEvent(updatedEvents[0]);
            return updatedEvents;
          });
          eventModalRef.current?.close();
        }
      }
    });
  };

  const setEventContent = (eventType: EventType) => {
    let content: string;
    switch (eventType) {
      case EventType.Purchase:
        content = "\\PERSON in \\LOCATION made a purchase.";
        break;
      case EventType.AddToCart:
        content = "\\PERSON in \\LOCATION added \\PRODUCT to cart.";
        break;
      case EventType.SomeoneViewing:
        content = "\\PERSON in \\LOCATION recently viewed \\PRODUCT.";
        break;
      case EventType.ActiveUsers:
        content = "\\NUMUSERS people are online now.";
        break;
      case EventType.Custom:
        content = "Add your content here.";
        break;
    }
    return content;
  };

  const isEventAlreadyCreated = (eventType: EventType) => {
    let isEventAlreadyCreated = false;
    events.forEach((event) => {
      if (event.event_type === eventType) {
        isEventAlreadyCreated = true;
        return;
      }
    });
    return isEventAlreadyCreated;
  };

  return (
    <dialog className="modal" ref={eventModalRef}>
      <div className="modal-box !py-0 max-w-screen-md text-base-content dark:border dark:border-gray-600">
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col w-full pt-8 sticky top-0 bg-white">
            <form method="dialog" className="modal-backdrop">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute -right-2 top-2 text-base-content !outline-none"
                onClick={() => {
                  eventModalRef?.current?.close();
                }}
              >
                ✕
              </button>
            </form>
            <div className="flex flex-row items-center gap-2">
              <h3 className="font-semibold text-lg">Select Event Type</h3>
              {isLoading && (
                <span className="loading loading-spinner loading-sm bg-base-content"></span>
              )}
            </div>
            <label className="input input-bordered flex items-center mt-6 mb-4">
              <Search
                strokeWidth={2}
                color="oklch(var(--bc))"
                height={16}
                width={16}
              />
              <input
                type="text"
                className="grow w-5 ml-4 !border-none"
                placeholder="Search by integration, event type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-row flex-wrap gap-2 w-full overflow-y-scroll p-1 py-3">
            {filteredEvents.map((eventOption, i) => (
              <div
                key={i}
                className={`flex flex-row border border-gray-300 shadow-md rounded-lg w-full lg:max-w-[352px] md:max-w-[352px] mb-1 ${
                  isEventAlreadyCreated(eventOption.type)
                    ? " hidden"
                    : "cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:-translate-y-1 transition-transform"
                }`}
                onClick={() => {
                  if (!isEventAlreadyCreated(eventOption.type))
                    handleCreateEvent(eventOption.type);
                }}
              >
                <div
                  className="flex items-center justify-center rounded-l-lg outline outline-[1px] outline-primary w-14 min-w-14 h-full bg-primary"
                  // style={{
                  //   backgroundColor: hexToRgba(eventOption.color, 0.3),
                  // }}
                >
                  {getEventIcon(eventOption.type, "#FFFFFF")}
                </div>
                <div className="flex flex-col py-4 px-2 ml-3 gap-2">
                  <div className="font-bold text-sm">{eventOption.title}</div>
                  <div className="text-xs">
                    Integrations: {eventOption.integrations}
                  </div>
                  <div className="text-xs text-wrap text-gray-400">
                    {eventOption.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center border-t border-gray-300 sticky bottom-0 bg-white pb-6 mt-2">
            <div className="flex items-center rounded-lg bg-white px-4 -mt-[10px] text-sm text-gray-500">
              or
            </div>
            <div className="btn btn-ghost mt-2">Create your own</div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

const getEventOptions = () => {
  const eventOptions = [
    {
      title: "Purchase",
      integrations: "Stripe",
      description:
        "Displays popup when a user makes a purchase or creates a checkout session.",
      type: EventType.Purchase,
      color: "#3eb981",
    },
    {
      title: "Add to Cart",
      integrations: "Stripe",
      description: "Shows what products users currently have in their cart.",
      type: EventType.AddToCart,
      color: "#3eb981",
    },
    {
      title: "Someone is Viewing",
      integrations: "Stripe",
      description: "Shows what products users are curently viewing.",
      type: EventType.SomeoneViewing,
      color: "#7A81EB",
    },
    {
      title: "Active Users",
      integrations: "Google Analytics",
      description: "Displays the current number of active users on your site.",
      type: EventType.ActiveUsers,
      color: "#7A81EB",
    },
  ] as EventOption[];
  return eventOptions;
};

const getEventIcon = (eventType: EventType, color: string) => {
  switch (eventType) {
    case EventType.Purchase:
      return <ShoppingBag width={28} height={28} color="#FFFFFF" />;
    case EventType.AddToCart:
      return <ShoppingCart width={28} height={28} color="#FFFFFF" />;
    case EventType.SomeoneViewing:
      return <UserRoundSearch width={28} height={28} color="#FFFFFF" />;
    case EventType.ActiveUsers:
      return <UsersRound width={28} height={28} color="#FFFFFF" />;
    case EventType.Custom:
      return <Boxes width={28} height={28} color="#FFFFFF" />;
  }
};
