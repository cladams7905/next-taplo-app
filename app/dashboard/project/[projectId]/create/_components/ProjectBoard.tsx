"use client";

import { Tables } from "@/supabase/types";
import Sidebar from "./Sidebar";
import { useCallback, useEffect, useState } from "react";
import { useColor } from "react-color-palette";
import ViewContainer from "./popupView/ViewContainer";
import { sortByTimeCreated } from "@/lib/actions";
import { ContentVars } from "@/lib/enums";

export default function ProjectBoard({
  fetchedActiveProject,
  fetchedIntegrations,
  fetchedEvents,
}: {
  fetchedActiveProject: Tables<"Projects">;
  fetchedIntegrations: Tables<"Integrations">[];
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
  const [integrations, setIntegrations] =
    useState<Tables<"Integrations">[]>(fetchedIntegrations);
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
  const [isPreviewMode, setPreviewMode] = useState(false);

  const replaceVariablesInContentBody = (
    contentStr?: string | null,
    shouldReturnHTML?: boolean
  ) => {
    if (!contentStr) return "";

    const getVariableHTML = (word: string, index: number) => {
      return `<span key=${index} class="text-primary px-1 rounded-lg">${
        "[" +
        replaceVariable(word.substring(1).toLocaleLowerCase() as ContentVars) +
        "]"
      }</span>`;
    };

    const replaceVariable = (variable: ContentVars) => {
      let returnWord = "";
      switch (variable) {
        case ContentVars.Person:
          returnWord = "Person";
          break;
        case ContentVars.Location:
          returnWord = "City, Country";
          break;
        case ContentVars.Product:
          returnWord = "My Product";
          break;
        default:
          returnWord = "undefined";
      }
      return returnWord;
    };

    const words = contentStr.split(" ");

    const checkForInvalidCharsRegex = /[^a-zA-Z0-9\\]/;
    const filterInvalidCharsRegex = /(\\\w+|\w+|[^\w\s])/g;

    const transformedWords = words.flatMap((word, i) => {
      if (word.startsWith("\\") && checkForInvalidCharsRegex.test(word)) {
        const cleanedWord = word.split(filterInvalidCharsRegex).filter(Boolean);
        return cleanedWord
          .map((val) => {
            return val.startsWith("\\")
              ? shouldReturnHTML
                ? getVariableHTML(val, i)
                : replaceVariable(
                    val.substring(1).toLocaleLowerCase() as ContentVars
                  )
              : val;
          })
          .join("");
      } else {
        return word.startsWith("\\")
          ? shouldReturnHTML
            ? getVariableHTML(word, i)
            : replaceVariable(
                word.substring(1).toLocaleLowerCase() as ContentVars
              )
          : word;
      }
    });
    return transformedWords.join(" ");
  };

  return (
    <main className="flex lg:flex-row md:flex-row flex-col w-full h-screen-minus-navbar">
      <div className="lg:w-[60%] w-full">
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
          isPreviewMode={isPreviewMode}
          setPreviewMode={setPreviewMode}
          displayTime={displayTime}
          replaceVariablesInContentBody={replaceVariablesInContentBody}
        />
      </div>
      <div className="relative lg:w-[40%] w-full">
        <Sidebar
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
          events={events}
          setEvents={setEvents}
          integrations={integrations}
          setIntegrations={setIntegrations}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          textColor={textColor}
          setTextColor={setTextColor}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
          isPreviewMode={isPreviewMode}
          displayTime={displayTime}
          setDisplayTime={setDisplayTime}
          replaceVariablesInContentBody={replaceVariablesInContentBody}
        />
      </div>
    </main>
  );
}
