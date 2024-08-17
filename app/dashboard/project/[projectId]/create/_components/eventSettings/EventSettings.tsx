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
  setIntegrations,
  scrollRef,
  eventHeaderRef,
  isPreviewMode,
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
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  scrollRef: RefObject<HTMLDivElement>;
  eventHeaderRef: RefObject<HTMLDivElement>;
  isPreviewMode: boolean;
}) => {
  const [isEventPending, startEventTransition] = useTransition();
  const scrolled = useScroll(1, scrollRef);

  return (
    <div
      ref={eventHeaderRef}
      className={`flex relative ${
        isPreviewMode && "z-[0]"
      } flex-col w-full h-fit`}
    >
      <div
        className={`sticky top-0 w-full min-h-[65px] p-4 bg-white ${
          scrolled ? "border-b border-gray-300 -mb-[1px] shadow-sm" : ""
        } ${isPreviewMode ? "z-[1]" : "z-[2]"}`}
      >
        <EventsHeader
          activeProject={activeProject}
          events={events}
          setEvents={setEvents}
          setActiveEvent={setActiveEvent}
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
          integrations={integrations}
          setIntegrations={setIntegrations}
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
    setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
    integrations: Tables<"Integrations">[];
    isPreviewMode: boolean;
  },
  nextProps: {
    events: Tables<"Events">[];
    setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
    integrations: Tables<"Integrations">[];
    isPreviewMode: boolean;
  }
) {
  return (
    prevProps.events === nextProps.events &&
    prevProps.setEvents === nextProps.setEvents &&
    prevProps.integrations === nextProps.integrations &&
    prevProps.isPreviewMode === nextProps.isPreviewMode
  );
}

export default memo(EventSettings, areEqual);
