"use client";

import { memo, TransitionStartFunction, useRef, useState } from "react";
import { deleteEvent } from "@/lib/actions/events";
import { showToast, showToastError } from "@/components/shared/showToast";
import { sortByTimeCreated } from "@/lib/actions";
import Event from "./Event";
import { useProjectContext } from "../ProjectBoard";

const EventsList = ({
  startEventTransition,
}: {
  startEventTransition: TransitionStartFunction;
}) => {
  const { activeProject, activeEvent, setActiveEvent, events, setEvents } =
    useProjectContext();
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
        className={`relative collapse collapse-arrow text-sm border border-gray-300 rounded-lg shadow-sm pl-2`}
        onClick={(e) => toggleAccordion(e.currentTarget.classList)}
      >
        <div
          className={`absolute w-[8px] h-full ${
            activeEvent && activeEvent.id === event.id
              ? "block bg-primary"
              : "hidden"
          }`}
        />
        <Event
          currentEvent={event}
          isCollapseOpen={isCollapseOpen}
          startEventTransition={startEventTransition}
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

const areEqual = (prevProps: any, nextProps: any) => {
  const { activeEvent: prevActiveEvent } = prevProps;
  const { activeEvent: nextActiveEvent } = nextProps;
  const activeEventChanged = prevActiveEvent?.id !== nextActiveEvent?.id;
  return !activeEventChanged;
};

export default memo(EventsList, areEqual);
