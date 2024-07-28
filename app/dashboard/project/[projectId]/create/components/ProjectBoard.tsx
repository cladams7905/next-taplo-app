"use client";

import { Tables } from "@/supabase/types";
import ActiveToastView from "./ActiveToastView";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useColor } from "react-color-palette";

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

  /* Popup style state variables */
  const [backgroundToastColor, setBackgroundToastColor] = useColor(
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
  const [verifiedColor, setVerifiedColor] = useColor(
    activeProject?.verified_color ? activeProject.verified_color : "#4ade80"
  );

  return (
    <main className="flex lg:columns-2 w-full h-screen-minus-navbar">
      <div className="relative lg:w-1/3">
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
