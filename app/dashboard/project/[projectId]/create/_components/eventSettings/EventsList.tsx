"use client";

import { memo, TransitionStartFunction } from "react";
import { deleteEvent } from "@/lib/actions/events";
import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { sortByTimeCreated } from "@/lib/actions";
import Event from "./Event";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import { Tables } from "@/lib/supabase/types";

const EventsList = ({
  startEventTransition,
}: {
  startEventTransition: TransitionStartFunction;
}) => {
  const { activeProject, activeEvent, setActiveEvent, events, setEvents } =
    useProjectContext();

  const toggleAccordion = (e: DOMTokenList) => {
    if (e.contains("collapse-open")) {
      e.remove("collapse-open");
      e.add("collapse-close");
    } else {
      e.remove("collapse-close");
      e.add("collapse-open");
    }
  };

  const handleEventDelete = (event: Tables<"Events">) => {
    startEventTransition(async () => {
      if (activeProject) {
        const { data, error } = await deleteEvent(event);
        if (error) {
          showToastError(error);
        } else {
          setEvents((prevEvents) => {
            const updatedEvents = sortByTimeCreated(
              prevEvents.filter((event) => event.id !== data.id)
            );
            setActiveEvent(
              updatedEvents.length > 0 ? updatedEvents[0] : undefined
            );
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
        className={`relative collapse collapse-arrow text-sm border border-gray-200 bg-white rounded-lg shadow-sm pl-2 overflow-visible`}
        onClick={(e) => toggleAccordion(e.currentTarget.classList)}
      >
        <div
          className={`absolute w-[6px] h-full z-[0] rounded-l-lg ${
            activeEvent && activeEvent.id === event.id
              ? "block bg-primary"
              : "hidden"
          }`}
        />
        <Event
          currentEvent={event}
          startEventTransition={startEventTransition}
          handleEventDelete={handleEventDelete}
        />
      </div>
    ))
  ) : (
    <div className="px-4 text-xs text-center text-gray-400">
      You haven&apos;t created any events yet. Click &quot;+&quot; to create a
      new one!
    </div>
  );
};

const areEqual = (prevProps: any, nextProps: any) => {
  const { activeEvent: prevActiveEvent } = prevProps;
  const { activeEvent: nextActiveEvent } = nextProps;
  const activeEventChanged = prevActiveEvent?.id !== nextActiveEvent?.id;
  return !activeEventChanged;
};

export default memo(EventsList, areEqual);
