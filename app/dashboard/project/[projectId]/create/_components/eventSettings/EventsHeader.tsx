"use client";

import { CirclePlus } from "lucide-react";
import { useEffect, useRef } from "react";
import NewEventModal from "./NewEventModal";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";

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
      <div className="flex items-center gap-[6px]">
        <div className="flex flex-col ml-2 gap-1">
          <div className="flex items-center gap-3">
            <p className="font-semibold text-md">Events ({events.length})</p>
            {isEventPending && (
              <span className="loading loading-spinner loading-xs bg-base-content"></span>
            )}
          </div>
          {events.length > 0 && (
            <div className="text-xs font-normal">
              Viewing: {activeEvent?.event_type}
            </div>
          )}
        </div>
      </div>
      <div
        className="btn btn-sm bg-gray-100 hover:!bg-link-hover w-auto text-xs tooltip tooltip-left tooltip-info flex items-center"
        data-tip="Create Event"
        onClick={() => {
          eventModalRef.current?.showModal();
        }}
      >
        <CirclePlus height={18} width={18} />
      </div>
      <NewEventModal eventModalRef={eventModalRef} />
    </div>
  );
}
