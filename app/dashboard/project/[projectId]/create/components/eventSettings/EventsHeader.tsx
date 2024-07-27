import { showToastError } from "@/components/shared/showToast";
import { createEvent } from "@/lib/actions/events";
import { EventType } from "@/lib/enums";
import { Tables, TablesInsert } from "@/supabase/types";
import { CirclePlus } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useRef,
} from "react";

export default function EventsHeader({
  activeProject,
  setEvents,
  startEventTransition,
  isEventPending,
}: {
  activeProject: Tables<"Projects">;
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  startEventTransition: TransitionStartFunction;
  isEventPending: boolean;
}) {
  const eventDropdownRef = useRef<HTMLUListElement>(null);

  const handleCreateEvent = (eventType: EventType) => {
    startEventTransition(async () => {
      setTimeout(() => {
        eventDropdownRef.current?.classList.add("hidden");
      }, 1000);
      if (activeProject) {
        const content = setEventContent(eventType);
        const event: TablesInsert<"Events"> = {
          user_id: activeProject.user_id,
          project_id: activeProject.id,
          event_type: eventType,
          content_body: content,
        };
        const { data, error } = await createEvent(event);
        if (error) {
          showToastError(error);
        } else {
          setEvents((prevEvents) => [...prevEvents, data]);
        }
      }
    });
  };

  const setEventContent = (eventType: EventType) => {
    let content: string;
    switch (eventType) {
      case EventType.OnPurchase:
        content = "Someone in \\location made a purchase.";
        break;
      case EventType.OnReview:
        content = "Someone in \\location left a review.";
        break;
      case EventType.Custom:
        content = "Add your content here.";
        break;
    }
    return content;
  };
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="text-xs ml-2 font-semibold text-gray-400">Events</div>
        {isEventPending && (
          <span className="loading loading-spinner loading-xs bg-base-content"></span>
        )}
      </div>
      <div className="dropdown dropdown-end">
        <div
          className="btn btn-sm lg:mt-0 mt-8 lg:w-auto w-full btn-primary text-white text-xs"
          onClick={() => {
            eventDropdownRef.current?.classList.remove("hidden");
          }}
          tabIndex={0}
        >
          <CirclePlus height={18} width={18} /> New Event
        </div>
        <ul
          tabIndex={0}
          ref={eventDropdownRef}
          className="dropdown-content absolute z-10 mt-1 rounded-lg menu w-full bg-base-100 border border-base-300 min-w-80 p-2 shadow"
        >
          <li className="flex flex-col mb-2">
            <a
              className="w-full"
              onClick={() => handleCreateEvent(EventType.OnPurchase)}
            >
              <div className="flex flex-col gap-2">
                <div className="font-bold">On purchase</div>
                <div className="flex flex-col gap-1">
                  {" "}
                  <div className="text-xs text-wrap">
                    Displays popup whenever a user makes a purchase.
                  </div>
                  <div className="text-xs text-gray-400">
                    Integrations: Stripe, LemonSqueezy
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li className="flex flex-col mb-2">
            <a
              className="w-full"
              onClick={() => handleCreateEvent(EventType.OnReview)}
            >
              <div className="flex flex-col gap-2">
                <div className="font-bold">On review</div>
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-wrap">
                    Displays popup whenever a user leaves a positive review.
                  </div>
                  <div className="text-xs text-gray-400">
                    Integrations: Google, Trustpilot
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a
              className="w-full"
              onClick={() => handleCreateEvent(EventType.Custom)}
            >
              <div className="flex flex-col gap-2">
                <div className="font-bold">Custom</div>
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-wrap">
                    Fully customizable popup, including header, body, and image.
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
