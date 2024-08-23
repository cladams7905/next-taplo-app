"use client";

import { CirclePlus, EyeIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import NewEventModal from "./NewEventModal";
import { useProjectContext } from "../ProjectBoard";

export default function EventsHeader({
  isEventPending,
}: {
  isEventPending: boolean;
}) {
  const { events, activeEvent } = useProjectContext();
  const eventModalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (events.length === 0) {
      eventModalRef.current?.showModal();
    }
  }, [events]);

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="ml-2 font-semibold">Events ({events.length})</div>
        {events.length > 0 && (
          <div className="flex items-center font-semibold gap-1 text-xs ml-2 bg-primary/20 rounded-lg p-1 px-3">
            <EyeIcon width={18} height={18} /> {activeEvent?.event_type}{" "}
          </div>
        )}
        {isEventPending && (
          <span className="loading loading-spinner loading-xs bg-base-content"></span>
        )}
      </div>
      <div
        className="btn btn-sm w-auto btn-primary text-white text-xs"
        onClick={() => {
          eventModalRef.current?.showModal();
        }}
      >
        New Event
        <CirclePlus height={18} width={18} />
      </div>
      <NewEventModal eventModalRef={eventModalRef} />
    </div>
  );
}
