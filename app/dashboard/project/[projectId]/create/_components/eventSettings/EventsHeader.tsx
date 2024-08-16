import { Tables } from "@/supabase/types";
import { CirclePlus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import NewEventModal from "./NewEventModal";

export default function EventsHeader({
  activeProject,
  events,
  setEvents,
  setActiveEvent,
  isEventPending,
}: {
  activeProject: Tables<"Projects">;
  events: Tables<"Events">[];
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  setActiveEvent: Dispatch<SetStateAction<Tables<"Events"> | undefined>>;
  isEventPending: boolean;
}) {
  const eventModalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (events.length === 0) {
      eventModalRef.current?.showModal();
    }
  }, [events]);

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="text-xs ml-2 font-semibold text-gray-400">Events</div>
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
        <CirclePlus height={18} width={18} /> New Event
      </div>
      <NewEventModal
        eventModalRef={eventModalRef}
        activeProject={activeProject}
        events={events}
        setEvents={setEvents}
        setActiveEvent={setActiveEvent}
      />
    </div>
  );
}
