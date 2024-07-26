"use client";

import { Tables } from "@/supabase/types";
import { ChevronDown, CirclePlus } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useRef,
} from "react";
import NewIntegrationModal from "../../../connect/components/NewIntegrationModal";

export default function IntegrationSelect({
  activeProject,
  setActiveProject,
  currentEvent,
  events,
  integrations,
  setIntegrations,
  startEventTransition,
  handleUpdateIntegration,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  currentEvent: Tables<"Events">;
  events: Tables<"Events">[];
  integrations: Tables<"Integrations">[];
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  startEventTransition: TransitionStartFunction;
  handleUpdateIntegration: (
    event: Tables<"Events">,
    integrationId: number
  ) => void;
}) {
  const toggleModalRef = useRef<HTMLDivElement>(null);
  const newIntegrationModalRef = useRef<HTMLDialogElement>(null);

  const getIntegrationById = (integrationId: number) => {
    return integrations.find((integration) => integration.id === integrationId);
  };
  return (
    <>
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">Integration</div>
        <div
          className="btn btn-sm lg:mt-0 mt-8 lg:w-auto w-full btn-ghost text-xs"
          onClick={() => newIntegrationModalRef.current?.showModal()}
        >
          <CirclePlus height={17} width={17} />
          New
        </div>
        <NewIntegrationModal
          newIntegrationModalRef={newIntegrationModalRef}
          integrations={integrations}
          setIntegrations={setIntegrations}
          activeProject={activeProject}
          currentEvent={currentEvent}
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
          className="flex p-2 px-3 items-center justify-between cursor-pointer border border-base-300 rounded-lg text-sm"
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
          className="menu menu-sm dropdown-content border border-neutral z-[10] shadow bg-base-100 rounded-lg w-full mt-1 h-32"
        >
          <ul className="h-full w-full overflow-y-scroll">
            {integrations.length > 0 ? (
              integrations.map((integration, i) => (
                <li key={i}>
                  {events.find((e) => e.integration_id === integration.id) ? (
                    <div className="flex items-start justify-between rounded-md text-gray-400 pointer-events-none">
                      <p>{integration.name} (Used)</p>
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
                You haven&apos;t created any integrations yet. Click
                &quot;+&quot; to create a new one!
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
