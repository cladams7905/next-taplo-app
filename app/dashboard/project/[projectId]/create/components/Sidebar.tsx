"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, SetStateAction } from "react";
import EventSettings from "./eventSettings/EventSettings";

export default function Sidebar({
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
  return (
    <div className="rounded-none h-full w-full relative border-r border-neutral shadow-lg z-[3] bg-white dark:bg-base-100 overflow-y-scroll overflow-x-hidden">
      <div className="relative flex flex-col min-w-full border-b border-base-300 p-4 pb-10 gap-3">
        <EventSettings
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          events={events}
          setEvents={setEvents}
          integrations={integrations}
        />
      </div>
      <div className="flex flex-col gap-3 border-b border-base-300 p-4 pb-10">
        <div className="text-xs ml-2 font-semibold text-gray-400">Style</div>
      </div>
      <div className="flex flex-col gap-3 border-b border-base-300 p-4 pb-10">
        <div className="text-xs ml-2 font-semibold text-gray-400">Settings</div>
      </div>
    </div>
  );
}
