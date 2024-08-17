"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import EventSettings from "./eventSettings/EventSettings";
import { StyleSettings } from "./StyleSettings";
import { IColor } from "react-color-palette";
import AdditionalSettings from "./AdditionalSettings";

export default function Sidebar({
  activeProject,
  setActiveProject,
  activeEvent,
  setActiveEvent,
  events,
  setEvents,
  integrations,
  setIntegrations,
  backgroundColor,
  setBackgroundColor,
  textColor,
  setTextColor,
  accentColor,
  setAccentColor,
  borderColor,
  setBorderColor,
  isPreviewMode,
  displayTime,
  setDisplayTime,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  activeEvent: Tables<"Events"> | undefined;
  setActiveEvent: Dispatch<SetStateAction<Tables<"Events"> | undefined>>;
  events: Tables<"Events">[];
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  integrations: Tables<"Integrations">[];
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  backgroundColor: IColor;
  setBackgroundColor: Dispatch<SetStateAction<IColor>>;
  textColor: IColor;
  setTextColor: Dispatch<SetStateAction<IColor>>;
  accentColor: IColor;
  setAccentColor: Dispatch<SetStateAction<IColor>>;
  borderColor: IColor;
  setBorderColor: Dispatch<SetStateAction<IColor>>;
  isPreviewMode: boolean;
  displayTime: number;
  setDisplayTime: Dispatch<SetStateAction<number>>;
}) {
  const scrollParentRef = useRef<HTMLDivElement>(null);
  const eventHeaderRef = useRef<HTMLDivElement>(null);
  const styleHeaderRef = useRef<HTMLDivElement>(null);
  const [eventHeaderHeight, setEventHeaderHeight] = useState<
    number | undefined
  >(undefined);
  const [styleHeaderHeight, setStyleHeaderHeight] = useState<
    number | undefined
  >(undefined);

  /* Detect changes in sticky subheadings in sidebar */
  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        if (entry.target === eventHeaderRef.current) {
          setEventHeaderHeight(entry.contentRect.height);
        }
        if (entry.target === styleHeaderRef.current) {
          if (eventHeaderHeight) {
            setStyleHeaderHeight(entry.contentRect.height + eventHeaderHeight);
          }
        }
      }
    };
    const eventHeader = eventHeaderRef.current;
    const styleHeader = styleHeaderRef.current;

    const resizeObserver = new ResizeObserver(handleResize);
    if (eventHeader) {
      resizeObserver.observe(eventHeader);
    }
    if (styleHeader) {
      resizeObserver.observe(styleHeader);
    }
    return () => {
      if (eventHeader) {
        resizeObserver.unobserve(eventHeader);
      }
      if (styleHeader) {
        resizeObserver.unobserve(styleHeader);
      }
    };
  }, [eventHeaderHeight]);

  return (
    <div
      ref={scrollParentRef}
      className="rounded-none relative w-full h-full border-l border-gray-300 bg-white overflow-y-scroll overflow-x-hidden shadow-xl"
    >
      <EventSettings
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        activeEvent={activeEvent}
        setActiveEvent={setActiveEvent}
        events={events}
        setEvents={setEvents}
        integrations={integrations}
        setIntegrations={setIntegrations}
        scrollRef={scrollParentRef}
        eventHeaderRef={eventHeaderRef}
        isPreviewMode={isPreviewMode}
      />
      <StyleSettings
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        textColor={textColor}
        setTextColor={setTextColor}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        borderColor={borderColor}
        setBorderColor={setBorderColor}
        scrollRef={scrollParentRef}
        styleHeaderRef={styleHeaderRef}
        eventHeaderHeight={eventHeaderHeight}
        isPreviewMode={isPreviewMode}
      />
      <AdditionalSettings
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        scrollRef={scrollParentRef}
        styleHeaderHeight={styleHeaderHeight}
        isPreviewMode={isPreviewMode}
        displayTime={displayTime}
        setDisplayTime={setDisplayTime}
      />
    </div>
  );
}
