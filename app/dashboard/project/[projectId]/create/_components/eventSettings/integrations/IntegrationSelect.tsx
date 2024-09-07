"use client";

import { Tables } from "@/supabase/types";
import { ChevronDown, CirclePlus } from "lucide-react";
import {
  TransitionStartFunction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import NewIntegrationModal from "./NewIntegrationModal";
import { EventType, Providers } from "@/lib/enums";
import { useProjectContext } from "../../ProjectBoard";

export default function IntegrationSelect({
  currentEvent,
  startEventTransition,
  handleUpdateIntegration,
}: {
  currentEvent: Tables<"Events">;
  startEventTransition: TransitionStartFunction;
  handleUpdateIntegration: (
    event: Tables<"Events">,
    integrationId: number
  ) => void;
}) {
  const { events, integrations } = useProjectContext();
  const toggleModalRef = useRef<HTMLDivElement>(null);
  const newIntegrationModalRef = useRef<HTMLDialogElement>(null);

  const filterIntegrationsByEventType = useCallback(() => {
    let filteredIntegrations: Tables<"Integrations">[] = integrations;
    switch (currentEvent.event_type) {
      case EventType.AddToCart:
      case EventType.SomeoneViewing:
      case EventType.Purchase:
        filteredIntegrations = integrations.filter(
          (integration) => integration.provider === Providers.Stripe
        );
        break;
      case EventType.ActiveUsers:
        filteredIntegrations = integrations.filter(
          (integration) => integration.provider === Providers.GoogleAnalytics
        );
        break;
    }
    return filteredIntegrations;
  }, [currentEvent.event_type, integrations]);

  const [filteredIntegrations, setFilteredIntegrations] = useState<
    Tables<"Integrations">[]
  >(filterIntegrationsByEventType);

  useEffect(() => {
    setFilteredIntegrations(filterIntegrationsByEventType);
  }, [integrations, filterIntegrationsByEventType]);

  const getIntegrationById = (integrationId: number) => {
    return integrations.find((integration) => integration.id === integrationId);
  };
  return (
    <>
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">Integration</div>
        <div
          className="btn btn-sm w-auto btn-ghost text-xs"
          onClick={() => newIntegrationModalRef.current?.showModal()}
        >
          New
          <CirclePlus height={16} width={16} />
        </div>
        <NewIntegrationModal
          currentEvent={currentEvent}
          newIntegrationModalRef={newIntegrationModalRef}
          handleUpdateIntegration={handleUpdateIntegration}
        />
      </div>
      <div
        className="dropdown"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleModalRef?.current?.classList.remove("hidden");
        }}
      >
        <div
          tabIndex={0}
          className="flex p-2 px-3 items-center justify-between cursor-pointer border bg-white border-gray-200 rounded-lg text-sm"
        >
          {currentEvent.integration_id ? (
            getIntegrationById(currentEvent.integration_id)?.name
          ) : (
            <span className="text-gray-400">Select an integration</span>
          )}
          <ChevronDown width={16} height={16} />
        </div>
        <div
          tabIndex={0}
          ref={toggleModalRef}
          className="menu menu-sm dropdown-content bg-white border border-gray-300 shadow-md z-[1] rounded-lg w-full mt-1 h-fit min-h-20"
        >
          <ul className="h-full w-full overflow-y-scroll">
            {filteredIntegrations.length > 0 ? (
              filteredIntegrations.map((integration, i) => (
                <li key={i}>
                  {events.find((e) => e.integration_id === integration.id) ? (
                    <div className="flex items-start justify-between rounded-md text-gray-400 pointer-events-none">
                      <p>{integration.name} (Active)</p>
                    </div>
                  ) : (
                    <a
                      className="flex flex-col items-start justify-between rounded-md"
                      onClick={() => {
                        startEventTransition(() => {
                          handleUpdateIntegration(currentEvent, integration.id);
                          setTimeout(() => {
                            toggleModalRef.current?.classList.add("hidden");
                          }, 1000);
                        });
                      }}
                    >
                      {integration.name}
                    </a>
                  )}
                </li>
              ))
            ) : (
              <div className="text-gray-400 text-xs">
                You haven&apos;t created any integrations for this event yet.
                Click &quot;+&quot; to create a new one!
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
