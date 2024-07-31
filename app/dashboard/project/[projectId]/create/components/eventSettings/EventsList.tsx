"use client";

import { Tables } from "@/supabase/types";
import {
  Dispatch,
  memo,
  SetStateAction,
  TransitionStartFunction,
  useRef,
  useState,
} from "react";
import Event from "./Event";
import { deleteEvent } from "@/lib/actions/events";
import { showToast, showToastError } from "@/components/shared/showToast";

const EventsList = ({
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
}) => {
  const [isCollapseOpen, setCollapseOpen] = useState(false);
  const toggleElement = useRef<HTMLUListElement>(null);

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
        const { data, error } = await deleteEvent(eventId);
        if (error) {
          showToastError(error);
        } else {
          setEvents((prevEvents) => {
            const updatedEvents = prevEvents.filter(
              (event) => event.id !== data.id
            );
            return updatedEvents;
          });
          toggleElement?.current?.classList.add("hidden");
          showToast(`Successfully deleted \"${data.event_type}\" event`);
        }
      }
    });
  };

  return events.length > 0 ? (
    events.map((event, i) => (
      <div
        key={i}
        className="collapse collapse-arrow rounded-lg text-sm border border-base-300"
        onClick={(e) => toggleAccordion(e.currentTarget.classList)}
      >
        <Event
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          fetchedEvent={event}
          events={events}
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
      You haven't created any events yet. Click "+" to create a new one!
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
