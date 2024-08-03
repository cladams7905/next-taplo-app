"use client";

import { Tables } from "@/supabase/types";
import EventsHeader from "./EventsHeader";
import {
  Dispatch,
  memo,
  RefObject,
  SetStateAction,
  useTransition,
} from "react";
import EventsList from "./EventsList";
import useScroll from "@/lib/hooks/use-scroll";

const EventSettings = ({
  activeProject,
  setActiveProject,
  events,
  setEvents,
  integrations,
  scrollRef,
  eventHeaderRef,
  isInPreview,
  activeEvent,
  setActiveEvent,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  activeEvent: Tables<"Events"> | undefined;
  setActiveEvent: Dispatch<SetStateAction<Tables<"Events"> | undefined>>;
  events: Tables<"Events">[];
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  integrations: Tables<"Integrations">[];
  scrollRef: RefObject<HTMLDivElement>;
  eventHeaderRef: RefObject<HTMLDivElement>;
  isInPreview: boolean;
}) => {
  const [isEventPending, startEventTransition] = useTransition();
  const scrolled = useScroll(1, scrollRef);
  return (
    <div ref={eventHeaderRef} className="flex flex-col w-full h-fit">
      <div
        className={`sticky top-0 w-full p-4 bg-white ${
          scrolled ? "border-b border-gray-300 -mb-[1px] shadow-sm" : ""
        } ${isInPreview ? "z-[1]" : "z-[2]"}`}
      >
        <EventsHeader
          activeProject={activeProject}
          events={events}
          setEvents={setEvents}
          startEventTransition={startEventTransition}
          isEventPending={isEventPending}
        />
      </div>
      <div className="flex flex-col min-w-full p-4 pb-10 gap-3">
        <EventsList
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
          events={events}
          setEvents={setEvents}
          fetchedIntegrations={integrations}
          startEventTransition={startEventTransition}
        />
      </div>
    </div>
  );
};

//Compares params to prevent unnecessary rerenders
function areEqual(
  prevProps: {
    events: Tables<"Events">[];
    activeEvent: Tables<"Events"> | undefined;
    setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
    integrations: Tables<"Integrations">[];
    isInPreview: boolean;
  },
  nextProps: {
    events: Tables<"Events">[];
    activeEvent: Tables<"Events"> | undefined;
    setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
    integrations: Tables<"Integrations">[];
    isInPreview: boolean;
  }
) {
  return (
    prevProps.events === nextProps.events &&
    prevProps.activeEvent === nextProps.activeEvent &&
    prevProps.setEvents === nextProps.setEvents &&
    prevProps.integrations === nextProps.integrations &&
    prevProps.isInPreview === nextProps.isInPreview
  );
}

export default memo(EventSettings, areEqual);
