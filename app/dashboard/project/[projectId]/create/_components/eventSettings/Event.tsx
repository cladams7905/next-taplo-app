"use client";

import { Tables } from "@/supabase/types";
import { TransitionStartFunction, useState } from "react";
import {
  Boxes,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  UserRoundSearch,
  UsersRound,
  XCircle,
} from "lucide-react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import IntegrationSelect from "./IntegrationSelect";
import ContentBodyEditor from "./ContentBodyEditor";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import { EventType } from "@/lib/enums";

export default function Event({
  currentEvent,
  startEventTransition,
  handleEventDelete,
}: {
  currentEvent: Tables<"Events">;
  startEventTransition: TransitionStartFunction;
  handleEventDelete: (eventId: number) => void;
}) {
  const {
    activeEvent,
    setActiveEvent,
    integrations,
    replaceVariablesInContentBody,
  } = useProjectContext();

  const [isEditContentMode, setEditContentMode] = useState<boolean>(false);

  const contentBodyHtml = replaceVariablesInContentBody(
    currentEvent.content_body,
    true
  );

  const getIntegrationById = (integrationId: number) => {
    return integrations.find((integration) => integration.id === integrationId);
  };

  const handleToggleActiveEvent = () => {
    if (!activeEvent || activeEvent.id !== currentEvent.id) {
      setActiveEvent(currentEvent);
    }
  };

  const getEventIcon = (eventType: EventType) => {
    switch (eventType) {
      case EventType.Purchase:
        return <ShoppingBag width={20} height={20} />;
      case EventType.AddToCart:
        return <ShoppingCart width={20} height={20} />;
      case EventType.SomeoneViewing:
        return <UserRoundSearch width={20} height={20} />;
      case EventType.ActiveUsers:
        return <UsersRound width={20} height={20} />;
      case EventType.Custom:
        return <Boxes width={20} height={20} />;
    }
  };

  const getEventDescription = (eventType: EventType) => {
    switch (eventType) {
      case EventType.Purchase:
        return "This event displays when visitors make a purchase. If no products are created, then a generic purchase notification is displayed.";
      case EventType.AddToCart:
        return "This event displays products that visitors have added to their cart. There must be at least one product created for this event to trigger.";
      case EventType.SomeoneViewing:
        return "This event displays products that visitors are currently viewing. There must be at least one product created for this event to trigger.";
      case EventType.ActiveUsers:
        return "This event displays the number of visitors actively viewing your website. You may also use this event to display the number of recent visitors from the past 24 hours.";
      case EventType.Custom:
        return "Custom events can be triggered by other API calls or display static messages.";
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
            {currentEvent.event_type}
            <div className="text-xs text-gray-400">
              {currentEvent.integration_id ? (
                "Listens to: " +
                getIntegrationById(currentEvent.integration_id)?.provider
              ) : (
                <span className="text-error">No Integration Selected</span>
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
        <div className="text-xs mt-4">
          {getEventDescription(currentEvent.event_type as EventType)}
        </div>
        <div className="w-full flex flex-col gap-2">
          <IntegrationSelect
            currentEvent={currentEvent}
            startEventTransition={startEventTransition}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">Text Content</div>
            <div
              className="btn btn-sm w-auto btn-ghost text-xs"
              onClick={() => setEditContentMode(!isEditContentMode)}
            >
              {isEditContentMode ? (
                <>
                  {" "}
                  Cancel
                  <XCircle height={16} width={16} />
                </>
              ) : (
                <>
                  {" "}
                  Edit
                  <Pencil1Icon height={16} width={16} />
                </>
              )}
            </div>
          </div>
          {isEditContentMode ? (
            <ContentBodyEditor
              currentEvent={currentEvent}
              setEditContentMode={setEditContentMode}
              startLoadTransition={startEventTransition}
            />
          ) : (
            <p
              className="border border-gray-200 rounded-lg p-2"
              dangerouslySetInnerHTML={{
                __html: contentBodyHtml,
              }}
            ></p>
          )}
        </div>
        <div className="flex w-full justify-end items-center">
          <div
            className="flex items-center gap-1 btn btn-sm text-xs btn-error text-white"
            onClick={() => handleEventDelete(currentEvent.id)}
          >
            Delete
            <Trash2 width={16} height={16} />
          </div>
        </div>
      </div>
    </>
  );
}
