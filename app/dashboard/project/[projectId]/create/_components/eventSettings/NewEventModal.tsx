"use client";

import { DefaultMessages, EventType } from "@/lib/enums";
import { TablesInsert } from "@/lib/supabase/types";
import { showToastError } from "@/app/_components/shared/showToast";
import { sortByTimeCreated } from "@/lib/actions";
import { createEvent } from "@/lib/actions/events";
import { CheckIcon, Search } from "lucide-react";
import { RefObject, useState, useTransition } from "react";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import LoadingDots from "@/app/_components/shared/loadingdots";
import {
  filterIntegrationsByEventType,
  getEventIcon,
} from "../../_lib/sharedFunctions";

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
  const { activeProject, events, setEvents, setActiveEvent, integrations } =
    useProjectContext();

  const [isLoading, startLoadingTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const eventOptions = getEventOptions();
  const filteredEvents: EventOption[] = eventOptions.filter(
    (event) =>
      event?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event?.integrations?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [eventsToCreate, setEventsToCreate] = useState<EventType[]>([]);

  const handleCreateEvent = (eventType: EventType) => {
    startLoadingTransition(async () => {
      if (activeProject) {
        const content = setEventContent(eventType);
        const filteredIntegrations = filterIntegrationsByEventType(
          eventType,
          integrations
        );
        const event: TablesInsert<"Events"> = {
          user_id: activeProject.user_id,
          project_id: activeProject.id,
          event_type: eventType,
          message: content,
          integration_id:
            filteredIntegrations.length === 1
              ? filteredIntegrations[0].id
              : undefined,
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
        }
      }
    });
  };

  const addEventToCreate = (eventType: EventType) => {
    setEventsToCreate((prevEventsToCreate) => {
      return [...prevEventsToCreate, eventType];
    });
  };

  const removeEventToCreate = (eventType: EventType) => {
    setEventsToCreate((prevEventsToCreate) => {
      return prevEventsToCreate.filter((e) => e != eventType);
    });
  };

  const createSelectedEvents = () => {
    eventsToCreate.forEach((ev) => {
      handleCreateEvent(ev);
    });
    setTimeout(() => {
      setEventsToCreate([]);
      eventModalRef.current?.close();
    }, 1500);
  };

  const setEventContent = (eventType: EventType) => {
    let content: string;
    switch (eventType) {
      case EventType.ActiveUsers:
        content = DefaultMessages.ActiveUsers;
        break;
      case EventType.Purchase:
        content = DefaultMessages.Purchase;
        break;
      case EventType.Checkout:
        content = DefaultMessages.Checkout;
        break;
      case EventType.SomeoneViewing:
        content = DefaultMessages.SomeoneViewing;
        break;
      case EventType.CustomerTrends:
        content = DefaultMessages.CustomerTrends;
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
                  setEventsToCreate([]);
                  eventModalRef?.current?.close();
                }}
              >
                ✕
              </button>
            </form>
            <div className="flex flex-row items-center gap-2">
              <h3 className="font-semibold text-lg">
                Select Event(s) to Create
              </h3>
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
          <div className="flex flex-row flex-wrap gap-3 w-full overflow-y-scroll p-1 py-3">
            {filteredEvents.map((eventOption, i) => (
              <div
                key={i}
                className={`relative flex flex-row border border-gray-300 shadow-md rounded-lg w-full lg:max-w-[350px] md:max-w-[350px] mb-1 ${
                  isEventAlreadyCreated(eventOption.type)
                    ? " hidden"
                    : "cursor-pointer hover:outline hover:outline-[1px] hover:outline-primary hover:-translate-y-1 transition-transform"
                } ${
                  eventsToCreate.includes(eventOption.type) &&
                  "outline outline-[1px] outline-primary"
                }`}
                onClick={() => {
                  if (!isEventAlreadyCreated(eventOption.type)) {
                    if (!eventsToCreate.includes(eventOption.type)) {
                      addEventToCreate(eventOption.type);
                    } else {
                      removeEventToCreate(eventOption.type);
                    }
                  }
                }}
              >
                {eventsToCreate.includes(eventOption.type) && (
                  <div className="flex items-center justify-center absolute top-0 z-[2] right-0 aspect-square w-6 h-6 rounded-bl-lg rounded-tr-lg bg-primary text-white outline outline-[1px] outline-primary">
                    <CheckIcon width={16} height={16} strokeWidth={4} />
                  </div>
                )}
                <div className="relative flex items-center justify-center rounded-l-lg w-14 min-w-14 h-full bg-primary/80 border-r border-gray-300">
                  {getEventIcon(eventOption.type, 28)}
                </div>
                <div className="flex flex-col py-4 px-2 ml-3 gap-2">
                  <div className="font-semibold text-md">
                    {eventOption.title}
                  </div>
                  <div className="text-xs">
                    Integrations: {eventOption.integrations}
                  </div>
                  <div className="text-xs text-wrap text-gray-400 pr-2">
                    {eventOption.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center sticky bottom-0 bg-white pb-6">
            {eventsToCreate.length > 0 && (
              <div
                className="btn btn-primary mb-8 text-white min-w-[146px]"
                onClick={() => createSelectedEvents()}
              >
                {isLoading ? (
                  <LoadingDots color="#FFFFFF" />
                ) : (
                  `Create ${eventsToCreate.length} event(s)`
                )}
              </div>
            )}
            {/* <div className="border-t border-gray-300 w-full"></div>
            <div className="flex items-center rounded-lg bg-white px-4 -mt-[10px] text-sm text-gray-500">
              or
            </div>
            <div className="btn btn-ghost mt-2">Create your own</div> */}
          </div>
        </div>
      </div>
    </dialog>
  );
}

const getEventOptions = () => {
  const eventOptions = [
    {
      title: EventType.Purchase,
      integrations: "Stripe",
      description: "Triggers when a user purchases a product or subscription.",
      type: EventType.Purchase,
      color: "#3eb981",
    },
    {
      title: EventType.Checkout,
      integrations: "Stripe",
      description:
        "Triggers when someone adds a product to cart or enters a checkout session.",
      type: EventType.Checkout,
      color: "#3eb981",
    },
    {
      title: EventType.SomeoneViewing,
      integrations: "Google Analytics",
      description: "Exposes what users are currently viewing your site.",
      type: EventType.SomeoneViewing,
      color: "#7A81EB",
    },
    {
      title: EventType.ActiveUsers,
      integrations: "Google Analytics",
      description: "Displays the current number of active users on your site.",
      type: EventType.ActiveUsers,
      color: "#7A81EB",
    },
  ] as EventOption[];
  return eventOptions;
};
