"use client";

import { Tables } from "@/supabase/types";
import Sidebar from "./Sidebar";
import { useCallback, useEffect, useState } from "react";
import { useColor } from "react-color-palette";
import ViewContainer from "./popupView/ViewContainer";
import { sortByTimeCreated } from "@/lib/actions";

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
  const [events, setEvents] = useState<Tables<"Events">[]>(
    sortByTimeCreated(fetchedEvents)
  );
  const [activeEvent, setActiveEvent] = useState<Tables<"Events"> | undefined>(
    events[0] || undefined
  );
  const [displayTime, setDisplayTime] = useState<number>(
    fetchedActiveProject.display_time ? fetchedActiveProject.display_time : 5000
  );

  const updateEvents = useCallback(
    (newEvent: Tables<"Events">) => {
      setEvents((prevEvents) =>
        prevEvents.map((prev) =>
          prev.id === newEvent.id ? { ...prev, ...newEvent } : prev
        )
      );
    },
    [setEvents]
  );

  useEffect(() => {
    if (activeEvent) {
      updateEvents(activeEvent);
    }
  }, [activeEvent, updateEvents]);

  /* Popup style state variables */
  const [backgroundColor, setBackgroundColor] = useColor(
    activeProject?.bg_color ? activeProject.bg_color : "#FFFFFF"
  );
  const [textColor, setTextColor] = useColor(
    activeProject?.text_color ? activeProject.text_color : "#172554"
  );
  const [accentColor, setAccentColor] = useColor(
    activeProject?.accent_color ? activeProject.accent_color : "#6b7280"
  );
  const [borderColor, setBorderColor] = useColor(
    activeProject?.border_color ? activeProject.border_color : "#D1D3D7"
  );
  const [isInPreview, setIsInPreview] = useState(false);

  return (
    <main className="flex lg:columns-2 w-full h-screen-minus-navbar">
      <div className="lg:w-[60%]">
        <ViewContainer
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
          events={events}
          setEvents={setEvents}
          backgroundColor={backgroundColor}
          textColor={textColor}
          accentColor={accentColor}
          borderColor={borderColor}
          isInPreview={isInPreview}
          setIsInPreview={setIsInPreview}
          displayTime={displayTime}
        />
      </div>
      <div className="relative lg:w-[40%]">
        <Sidebar
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
          events={events}
          setEvents={setEvents}
          integrations={integrations}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          textColor={textColor}
          setTextColor={setTextColor}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
          isInPreview={isInPreview}
          displayTime={displayTime}
          setDisplayTime={setDisplayTime}
        />
      </div>
    </main>
  );
}
