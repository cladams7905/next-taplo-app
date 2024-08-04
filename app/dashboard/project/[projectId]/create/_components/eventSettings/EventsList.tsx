"use client";

import { Tables } from "@/supabase/types";
import {
  Dispatch,
  memo,
  SetStateAction,
  TransitionStartFunction,
  useEffect,
  useRef,
  useState,
} from "react";
import Event from "./Event";
import { deleteEvent } from "@/lib/actions/events";
import { showToast, showToastError } from "@/components/shared/showToast";
import { sortByTimeCreated } from "@/lib/actions";

const EventsList = ({
  activeProject,
  setActiveProject,
  activeEvent,
  setActiveEvent,
  events,
  setEvents,
  fetchedIntegrations,
  startEventTransition,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  activeEvent: Tables<"Events"> | undefined;
  setActiveEvent: Dispatch<SetStateAction<Tables<"Events"> | undefined>>;
  events: Tables<"Events">[];
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  fetchedIntegrations: Tables<"Integrations">[];
  startEventTransition: TransitionStartFunction;
}) => {
  const [isCollapseOpen, setCollapseOpen] = useState(false);
  const toggleElement = useRef<HTMLDivElement>(null);

  const toggleAccordion = (e: DOMTokenList) => {
    if (e.contains("collapse-open")) {
      setCollapseOpen(false);
      e.remove("collapse-open");
      e.add("collapse-close");
    } else {
      setCollapseOpen(true);
      e.remove("collapse-close");
      e.add("collapse-open");
    }
  };

  const handleEventDelete = (eventId: number) => {
    startEventTransition(async () => {
      if (activeProject) {
        toggleElement?.current?.classList.add("hidden");
        const { data, error } = await deleteEvent(eventId);
        if (error) {
          showToastError(error);
        } else {
          setEvents((prevEvents) => {
            const updatedEvents = sortByTimeCreated(
              prevEvents.filter((event) => event.id !== data.id)
            );

            // Check if there are remaining events before setting the active event
            if (updatedEvents.length > 0) {
              setActiveEvent(updatedEvents[0]);
            } else {
              setActiveEvent(undefined);
            }

            return updatedEvents;
          });
          showToast(`Successfully deleted \"${data.event_type}\" event`);
        }
      }
    });
  };

  return events.length > 0 ? (
    events.map((event, i) => (
      <div
        key={i}
        className={`relative collapse collapse-arrow text-sm border border-gray-300 rounded-lg shadow-sm`}
        onClick={(e) => toggleAccordion(e.currentTarget.classList)}
      >
        <div
          className={`absolute w-[6px] h-full ${
            activeEvent && activeEvent.id === event.id
              ? "block bg-primary"
              : "hidden"
          }`}
        />
        <Event
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          fetchedEvent={event}
          events={events}
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
          fetchedIntegrations={fetchedIntegrations}
          startEventTransition={startEventTransition}
          isCollapseOpen={isCollapseOpen}
          handleEventDelete={handleEventDelete}
          toggleElement={toggleElement}
        />
      </div>
    ))
  ) : (
    <div className="px-4 text-sm text-gray-400">
      You haven&apos;t created any events yet. Click &quot;+&quot; to create a
      new one!
    </div>
  );
};

function areEqual(
  prevProps: {
    events: Tables<"Events">[];
    setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
    fetchedIntegrations: Tables<"Integrations">[];
  },
  nextProps: {
    events: Tables<"Events">[];
    setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
    fetchedIntegrations: Tables<"Integrations">[];
  }
) {
  return (
    prevProps.events === nextProps.events &&
    prevProps.setEvents === nextProps.setEvents &&
    prevProps.fetchedIntegrations === nextProps.fetchedIntegrations
  );
}

export default memo(EventsList, areEqual);
