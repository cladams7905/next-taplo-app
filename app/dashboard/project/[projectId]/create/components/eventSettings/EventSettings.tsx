"use client";

import { Tables } from "@/supabase/types";
import EventsHeader from "./EventsHeader";
import { Dispatch, SetStateAction, useTransition } from "react";
import EventsList from "./EventsList";

export default function EventSettings({
  activeProject,
  setActiveProject,
  events,
  setEvents,
  integrations,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  integrations: Tables<"Integrations">[];
}) {
  const [isEventPending, startEventTransition] = useTransition();
  return (
    <>
      <EventsHeader
        activeProject={activeProject}
        setEvents={setEvents}
        startEventTransition={startEventTransition}
        isEventPending={isEventPending}
      />
      <EventsList
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        events={events}
        setEvents={setEvents}
        fetchedIntegrations={integrations}
        startEventTransition={startEventTransition}
      />
    </>
  );
}
