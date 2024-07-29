"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, SetStateAction, useRef } from "react";
import EventSettings from "./eventSettings/EventSettings";
import { StyleSettings } from "./styleSettings/StyleSettings";
import { IColor } from "react-color-palette";

export default function Sidebar({
  activeProject,
  setActiveProject,
  events,
  setEvents,
  integrations,
  backgroundColor,
  setBackgroundColor,
  textColor,
  setTextColor,
  accentColor,
  setAccentColor,
  verifiedColor,
  setVerifiedColor,
  borderColor,
  setBorderColor,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  integrations: Tables<"Integrations">[];
  backgroundColor: IColor;
  setBackgroundColor: Dispatch<SetStateAction<IColor>>;
  textColor: IColor;
  setTextColor: Dispatch<SetStateAction<IColor>>;
  accentColor: IColor;
  setAccentColor: Dispatch<SetStateAction<IColor>>;
  verifiedColor: IColor;
  setVerifiedColor: Dispatch<SetStateAction<IColor>>;
  borderColor: IColor;
  setBorderColor: Dispatch<SetStateAction<IColor>>;
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
      <div className="border-t border-b bg-white border-base-300 p-4 pb-10 z-[2]">
        <div className="text-xs ml-2 font-semibold text-gray-400">Style</div>
        <StyleSettings
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          textColor={textColor}
          setTextColor={setTextColor}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          verifiedColor={verifiedColor}
          setVerifiedColor={setVerifiedColor}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
        />
      </div>
      <div className="flex flex-col bg-white gap-3 border-b border-base-300 p-4 pb-10 z-[2]">
        <div className="text-xs ml-2 font-semibold text-gray-400">Settings</div>
        <p className="text-xs">Show city in location</p>
        <p className="text-xs">Only show events from the past ____ days</p>
      </div>
    </div>
  );
}
