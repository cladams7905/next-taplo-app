"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, SetStateAction, useRef } from "react";
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
  const scrollParentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={scrollParentRef}
      className="rounded-none w-full h-full border-r border-neutral shadow-lg z-[3] bg-white dark:bg-base-100 overflow-y-scroll overflow-x-hidden"
    >
      <EventSettings
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        events={events}
        setEvents={setEvents}
        integrations={integrations}
        scrollRef={scrollParentRef}
      />
      <div className="border-t border-b bg-white border-base-300 p-4 pb-10 sticky bottom-[74px]">
        <div className="text-xs ml-2 font-semibold text-gray-400">Style</div>
      </div>
      <div className="flex flex-col bg-white gap-3 border-b border-base-300 p-4 pb-10 sticky bottom-0">
        <div className="text-xs ml-2 font-semibold text-gray-400">Settings</div>
      </div>
    </div>
  );
}
