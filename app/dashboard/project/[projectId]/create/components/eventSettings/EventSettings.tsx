"use client";

import { Tables } from "@/supabase/types";
import EventsHeader from "./EventsHeader";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useRef,
  useTransition,
} from "react";
import EventsList from "./EventsList";
import useScroll from "@/lib/hooks/use-scroll";

export default function EventSettings({
  activeProject,
  setActiveProject,
  events,
  setEvents,
  integrations,
  scrollRef,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  integrations: Tables<"Integrations">[];
  scrollRef: RefObject<HTMLDivElement>;
}) {
  const [isEventPending, startEventTransition] = useTransition();
  const scrolled = useScroll(10, scrollRef);
  return (
    <>
      <div
        className={`sticky top-0 w-full p-4 bg-white z-[3] ${
          scrolled && "border-b border-base-300 "
        } -mt-[1px]`}
      >
        <EventsHeader
          activeProject={activeProject}
          setEvents={setEvents}
          startEventTransition={startEventTransition}
          isEventPending={isEventPending}
        />
      </div>
      <div className="flex flex-col min-w-full p-4 pb-10 gap-3">
        <EventsList
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          events={events}
          setEvents={setEvents}
          fetchedIntegrations={integrations}
          startEventTransition={startEventTransition}
        />
      </div>
    </>
  );
}
