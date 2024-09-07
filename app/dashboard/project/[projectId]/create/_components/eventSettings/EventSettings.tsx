"use client";

import EventsHeader from "./EventsHeader";
import { RefObject, useTransition } from "react";
import EventsList from "./EventsList";
import useScroll from "@/lib/hooks/use-scroll";

const EventSettings = ({
  scrollRef,
  eventHeaderRef,
  isPreviewMode,
}: {
  scrollRef: RefObject<HTMLDivElement>;
  eventHeaderRef: RefObject<HTMLDivElement>;
  isPreviewMode: boolean;
}) => {
  const [isEventPending, startEventTransition] = useTransition();
  const scrolled = useScroll(1, scrollRef);

  return (
    <div
      ref={eventHeaderRef}
      className={`flex relative ${
        isPreviewMode && "z-[0]"
      } flex-col w-full h-fit`}
    >
      <div
        className={`sticky top-0 w-full min-h-[65px] p-4 bg-white ${
          scrolled ? "border-b border-gray-300 -mb-[1px] shadow-sm" : ""
        } ${isPreviewMode ? "z-[1]" : "z-[2]"}`}
      >
        <EventsHeader isEventPending={isEventPending} />
      </div>
      <div className="flex flex-col min-w-full p-4 pb-10 gap-3">
        <EventsList startEventTransition={startEventTransition} />
      </div>
    </div>
  );
};

export default EventSettings;
