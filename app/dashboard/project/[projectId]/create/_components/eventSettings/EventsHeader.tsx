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
        <div className="flex flex-col ml-2 font-semibold text-sm">
          <p>Events ({events.length})</p>
          {events.length > 0 && (
            <div className="text-xs font-normal text-gray-400">
              Viewing: {activeEvent?.event_type}
            </div>
          )}
        </div>
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
