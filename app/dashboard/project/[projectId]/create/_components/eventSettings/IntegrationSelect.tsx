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
import NewIntegrationModal from "../../../connect/_components/NewIntegrationModal";
import { EventType, Providers } from "@/lib/enums";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import Image from "next/image";
import StripeLogo from "@/public/images/providers/stripe-logo.svg";
import { convertDateTime } from "@/lib/actions";
import { updateEvent } from "@/lib/actions/events";
import { showToastError } from "@/app/_components/shared/showToast";

export default function IntegrationSelect({
  currentEvent,
  startEventTransition,
}: {
  currentEvent: Tables<"Events">;
  startEventTransition: TransitionStartFunction;
}) {
  const { events, setActiveEvent, integrations } = useProjectContext();
  const toggleModalRef = useRef<HTMLDivElement>(null);
  const newIntegrationModalRef = useRef<HTMLDialogElement>(null);

  const handleUpdateIntegration = async (
    currentEvent: Tables<"Events"> | undefined,
    integrationId: number
  ) => {
    if (currentEvent) {
      const eventUpdateResult = await updateEvent(currentEvent.id, {
        ...currentEvent,
        integration_id: integrationId,
      });

      if (eventUpdateResult.error) {
        showToastError(eventUpdateResult.error);
      } else {
        setActiveEvent({ ...currentEvent, integration_id: integrationId });
      }
    }
  };

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
            <div className="flex items-center gap-2">
              <Image
                width={16}
                height={16}
                alt={"provider logo"}
                src={StripeLogo}
                className="rounded-sm"
              />
              {getIntegrationById(currentEvent.integration_id)?.name}
            </div>
          ) : (
            <span className="text-gray-400">Select an integration</span>
          )}
          <ChevronDown width={16} height={16} />
        </div>
        <div
          tabIndex={0}
          ref={toggleModalRef}
          className="menu menu-sm dropdown-content bg-white border border-gray-200 shadow-md z-[1] rounded-lg w-full mt-1 h-fit min-h-16 max-h-48"
        >
          <ul className="h-full w-full overflow-y-scroll">
            {filteredIntegrations.length > 0 ? (
              filteredIntegrations.map((integration, i) => (
                <li key={i}>
                  <a
                    className={`flex flex-col items-start justify-between rounded-md py-2 ${
                      integration.id === currentEvent.integration_id
                        ? "text-gray-400 pointer-events-none"
                        : ""
                    }`}
                    onClick={() => {
                      startEventTransition(() => {
                        handleUpdateIntegration(currentEvent, integration.id);
                        setTimeout(() => {
                          toggleModalRef.current?.classList.add("hidden");
                        }, 1000);
                      });
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        width={16}
                        height={16}
                        alt={"provider logo"}
                        src={StripeLogo}
                        className={`rounded-sm ${
                          integration.id === currentEvent.integration_id
                            ? "grayscale opacity-50"
                            : ""
                        }`}
                      />
                      <div className="flex flex-col gap-[2px]">
                        {integration.name}{" "}
                        {integration.id === currentEvent.integration_id &&
                          "- Selected"}
                        <p className="text-xs text-gray-400">
                          {" "}
                          Created: {convertDateTime(integration.created_at)}
                        </p>
                      </div>
                    </div>
                  </a>
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
