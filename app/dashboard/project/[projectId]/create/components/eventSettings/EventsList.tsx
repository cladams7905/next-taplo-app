"use client";

import { deleteEvent, updateEvent } from "@/lib/actions/events";
import { showToast, showToastError } from "@/components/shared/showToast";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { Tables } from "@/supabase/types";
import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useRef,
  useState,
} from "react";
import IntegrationSelect from "./IntegrationSelect";
import ContentBody from "./ContentBody";

export default function EventsList({
  activeProject,
  setActiveProject,
  events,
  setEvents,
  fetchedIntegrations,
  startEventTransition,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  fetchedIntegrations: Tables<"Integrations">[];
  startEventTransition: TransitionStartFunction;
}) {
  const toggleElement = useRef<HTMLUListElement>(null);
  const [integrations, setIntegrations] =
    useState<Tables<"Integrations">[]>(fetchedIntegrations);

  const toggleAccordion = (e: DOMTokenList) => {
    if (e.contains("collapse-open")) {
      e.remove("collapse-open");
      e.add("collapse-close");
    } else {
      e.remove("collapse-close");
      e.add("collapse-open");
    }
  };

  const handleEventDelete = (eventId: number) => {
    startEventTransition(async () => {
      if (activeProject) {
        const { data, error } = await deleteEvent(eventId);
        if (error) {
          showToastError(error);
        } else {
          setEvents((prevEvents) => {
            const updatedToasts = prevEvents.filter(
              (event) => event.id !== data.id
            );
            return updatedToasts;
          });
          toggleElement?.current?.classList.add("hidden");
          showToast(`Successfully deleted \"${data.event_type}\" event`);
        }
      }
    });
  };

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
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === event.id ? { ...e, integration_id: integrationId } : e
        )
      );
    }
  };

  return events.map((event, i) => (
    <div
      key={i}
      className="collapse collapse-arrow rounded-lg text-sm border border-base-300"
      onClick={(e) => toggleAccordion(e.currentTarget.classList)}
    >
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
          className="dropdown dropdown-end"
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
            <Ellipsis width={22} height={22} />
          </div>
          <ul
            tabIndex={1}
            ref={toggleElement}
            className="menu menu-sm dropdown-content mr-1 -mt-[10px] border border-neutral z-[10] shadow bg-base-100 rounded-md min-w-40"
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
        <div className="w-full flex flex-col gap-2">
          <ContentBody
            currentEvent={event}
            setEvents={setEvents}
            startEventTransition={startEventTransition}
          />
        </div>
      </div>
    </div>
  ));
}
