"use client";

import { Tables, TablesUpdate } from "@/lib/supabase/types";
import React, { memo, TransitionStartFunction, useRef } from "react";
import {
  CirclePlus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";
import IntegrationSelect from "./IntegrationSelect";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import { EventType } from "@/lib/enums";
import NewIntegrationModal from "../../../connect/_components/NewIntegrationModal";
import { updateEvent } from "@/lib/actions/events";
import { showToastError } from "@/app/_components/shared/showToast";
import MessageDropdown from "./MessageDropdown";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

function Event({
  currentEvent,
  startEventTransition,
  handleEventDelete,
}: {
  currentEvent: Tables<"Events">;
  startEventTransition: TransitionStartFunction;
  handleEventDelete: (event: Tables<"Events">) => void;
}) {
  const {
    activeProject,
    activeEvent,
    setActiveEvent,
    activeProduct,
    integrations,
    setIntegrations,
  } = useProjectContext();
  const newIntegrationModalRef = useRef<HTMLDialogElement>(null);

  const getIntegrationById = (integrationId: number) => {
    return integrations.find((integration) => integration.id === integrationId);
  };
  const currentIntegration = currentEvent?.integration_id
    ? getIntegrationById(currentEvent.integration_id)
    : null;

  const handleToggleActiveEvent = () => {
    if (!activeEvent || activeEvent.id !== currentEvent.id) {
      setActiveEvent(currentEvent);
    }
  };

  const getEventIcon = (eventType: EventType) => {
    switch (eventType) {
      case EventType.Purchase:
        return <ShoppingBag width={20} height={20} />;
      case EventType.Checkout:
        return <ShoppingCart width={20} height={20} />;
      case EventType.SomeoneViewing:
        return <UserRoundSearch width={20} height={20} />;
      case EventType.ActiveUsers:
        return <UsersRound width={20} height={20} />;
    }
  };

  const getIntegrationInfo = (eventType: EventType) => {
    switch (eventType) {
      case EventType.Purchase:
        return 'Requires: Stripe restricted API key with "charges" permissions set to "read".';
      case EventType.Checkout:
        return 'Requires: Stripe restricted API key with "checkout sessions" permissions set to "read".';
      default:
        return null;
    }
  };

  const handleUpdateEvent = async (
    currentEvent: Tables<"Events"> | undefined,
    newEvent: TablesUpdate<"Events">
  ) => {
    if (currentEvent) {
      // Update the event with the new integration_id
      const eventUpdateResult = await updateEvent(currentEvent.id, newEvent);

      if (eventUpdateResult.error) {
        showToastError(eventUpdateResult.error);
      } else {
        // Update the active event
        setActiveEvent({
          ...currentEvent,
          ...newEvent,
        });
      }
    }
  };

  return (
    <>
      <input type="radio" className="-z-10" />
      <div
        className={`collapse-title flex flex-row justify-between items-center`}
        onClick={handleToggleActiveEvent}
      >
        <div className="flex flex-row gap-3">
          <div className="flex items-center">
            {getEventIcon(currentEvent.event_type as EventType)}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{currentEvent.event_type}</p>
            <div className="text-xs">
              {currentEvent.integration_id ? (
                `Listens to: ${
                  currentIntegration?.provider
                    ? currentIntegration?.provider
                    : ""
                }`
              ) : (
                <span className="text-error flex items-center gap-1">
                  Please select an integration
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="collapse-content flex flex-col gap-8"
        onClick={(e) => {
          e.stopPropagation();
          handleToggleActiveEvent();
        }}
      >
        <div className="w-full flex flex-col gap-2 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              Integration{" "}
              {getIntegrationInfo(currentEvent?.event_type as EventType) !==
                null && (
                <div
                  className="tooltip tooltip-right tooltip-info"
                  data-tip={getIntegrationInfo(
                    currentEvent?.event_type as EventType
                  )}
                >
                  <QuestionMarkCircledIcon width={16} height={16} />
                </div>
              )}
            </div>
            <div
              className="btn btn-sm w-auto btn-ghost text-xs"
              onClick={() => newIntegrationModalRef.current?.showModal()}
            >
              New
              <CirclePlus height={16} width={16} />
            </div>
            <NewIntegrationModal
              activeProject={activeProject}
              integrations={integrations}
              setIntegrations={setIntegrations}
              currentEvent={currentEvent}
              newIntegrationModalRef={newIntegrationModalRef}
              handleUpdateEvent={handleUpdateEvent}
            />
          </div>
          <IntegrationSelect
            currentEvent={currentEvent}
            selectedIntegration={currentIntegration || undefined}
            startLoadingTransition={startEventTransition}
            handleUpdateEvent={handleUpdateEvent}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">Header (optional)</div>
          </div>
          <input
            type="text"
            className="input h-[38px] w-full text-sm"
            placeholder="Type header here"
            defaultValue={currentEvent.header || undefined}
            onBlur={(e) => {
              if (currentEvent.header === e.target.value) return;
              startEventTransition(async () => {
                handleUpdateEvent(currentEvent, { header: e.target.value });
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">Message Body</div>
          </div>
          <MessageDropdown
            projectName={activeProject.name}
            currentEvent={currentEvent}
            currentProduct={activeProduct}
            startLoadingTransition={startEventTransition}
            handleUpdateEvent={handleUpdateEvent}
          />
        </div>
        <div className="flex w-full justify-end items-center">
          <div
            className="flex items-center gap-1 btn btn-sm text-xs btn-ghost"
            onClick={() => handleEventDelete(currentEvent)}
          >
            <Trash2 width={16} height={16} />
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Event);
