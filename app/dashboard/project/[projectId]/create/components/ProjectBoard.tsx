"use client";

import { Tables } from "@/supabase/types";
import ActiveToastView from "./ActiveToastView";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function ProjectBoard({
  fetchedActiveProject,
  integrations,
  fetchedEvents,
}: {
  fetchedActiveProject: Tables<"Projects">;
  integrations: Tables<"Integrations">[];
  fetchedEvents: Tables<"Events">[];
}) {
  const [activeProject, setActiveProject] =
    useState<Tables<"Projects">>(fetchedActiveProject);
  const [events, setEvents] = useState<Tables<"Events">[]>(fetchedEvents);

  return (
    <main className="flex lg:columns-2 w-full h-screen-minus-navbar">
      <div className="lg:w-1/3">
        <Sidebar
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          events={events}
          setEvents={setEvents}
          integrations={integrations}
        />
      </div>
      <div className="lg:w-2/3 w-full">
        <ActiveToastView
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          integrations={integrations}
        />
      </div>
    </main>
  );
}
