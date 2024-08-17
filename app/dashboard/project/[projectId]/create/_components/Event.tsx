"use client";

import { Tables } from "@/supabase/types";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  TransitionStartFunction,
  useState,
} from "react";
import {
  DoorOpen,
  Ellipsis,
  Redo,
  ShoppingBag,
  StopCircle,
  Trash,
  Undo2,
  X,
  XCircle,
} from "lucide-react";
import { updateEvent } from "@/lib/actions/events";
import { showToastError } from "@/components/shared/showToast";
import { ExitIcon, Pencil1Icon } from "@radix-ui/react-icons";
import IntegrationSelect from "./eventSettings/integrations/IntegrationSelect";
import ContentBodyEditor from "./eventSettings/contentEditor/ContentBodyEditor";

export default function currentEvent({
  currentEvent,
  events,
  activeEvent,
  setActiveEvent,
  activeProject,
  setActiveProject,
  integrations,
  setIntegrations,
  startEventTransition,
  isCollapseOpen,
  handleEventDelete,
  toggleElement,
}: {
  currentEvent: Tables<"Events">;
  events: Tables<"Events">[];
  activeEvent: Tables<"Events"> | undefined;
  setActiveEvent: Dispatch<SetStateAction<Tables<"Events"> | undefined>>;
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  integrations: Tables<"Integrations">[];
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  startEventTransition: TransitionStartFunction;
  isCollapseOpen: boolean;
  handleEventDelete: (eventId: number) => void;
  toggleElement: RefObject<HTMLDivElement>;
}) {
  const [isEditContentMode, setEditContentMode] = useState<boolean>(false);

  const getIntegrationById = (integrationId: number) => {
    return integrations.find((integration) => integration.id === integrationId);
  };

  const handleToggleActiveEvent = () => {
    if (!activeEvent || activeEvent.id !== currentEvent.id) {
      setActiveEvent(currentEvent);
    }
  };

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

  const replaceVariablesInContentBody = (
    contentStr?: string | null,
    shouldReturnHTML?: boolean
  ) => {
    if (!contentStr) return "";

    const words = contentStr.split(" ");

    // Check to contain if string contains non-alphanumeric chars other than a backslash
    const checkForInvalidCharsRegex = /[^a-zA-Z0-9\\]/;
    // Check used to split string by non-alphanumeric chars other than a backslash
    const filterInvalidCharsRegex = /(\\\w+|\w+|[^\w\s])/g;

    const transformedWords = words.flatMap((word, i) => {
      if (word.startsWith("\\") && checkForInvalidCharsRegex.test(word)) {
        const cleanedWord = word.split(filterInvalidCharsRegex).filter(Boolean);
        return cleanedWord
          .map((val) => {
            return val.startsWith("\\")
              ? shouldReturnHTML
                ? getVariableHTML(val, i)
                : replaceVariable(val.substring(1).toLocaleLowerCase())
              : val;
          })
          .join("");
      } else {
        return word.startsWith("\\")
          ? shouldReturnHTML
            ? getVariableHTML(word, i)
            : replaceVariable(word.substring(1).toLocaleLowerCase())
          : word;
      }
    });
    return transformedWords.join(" ");
  };

  const getVariableHTML = (word: string, index: number) => {
    return `<span key=${index} class="text-primary px-1 rounded-lg">${
      "[" + replaceVariable(word.substring(1).toLocaleLowerCase()) + "]"
    }</span>`;
  };

  const replaceVariable = (variable: string) => {
    let returnWord = "";
    switch (variable) {
      case "person":
        returnWord = "Person";
        break;
      case "location":
        returnWord = "City, Country";
        break;
      case "product":
        returnWord = "My Product";
        break;
      case "project":
        returnWord = activeProject.name;
        break;
      default:
        returnWord = "undefined";
    }
    return returnWord;
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
            <ShoppingBag />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-bold">{currentEvent.event_type}</div>
            <div className="text-xs text-gray-400">
              {currentEvent.integration_id ? (
                getIntegrationById(currentEvent.integration_id)?.provider
              ) : (
                <span className="text-error">No Integration Selected</span>
              )}
            </div>
          </div>
        </div>
        <div
          className={`dropdown ${
            isCollapseOpen ? "dropdown-end" : "dropdown-left"
          }`}
          ref={toggleElement}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleElement?.current?.classList.remove("hidden");
          }}
        >
          <div
            className="p-2 -mt-[10px] rounded-lg cursor-pointer hover:bg-primary/20"
            tabIndex={1}
          >
            <Ellipsis width={20} height={20} />
          </div>
          <ul
            tabIndex={1}
            className={`menu menu-sm dropdown-content ${
              !isCollapseOpen && "-mt-[10px] mr-1"
            } border border-neutral z-[1] shadow bg-base-100 rounded-md min-w-40`}
          >
            <li>
              <a
                className="flex flex-col items-start rounded-md"
                onClick={() => {
                  handleEventDelete(currentEvent.id);
                }}
              >
                <div className="flex items-center gap-2">
                  {" "}
                  <Trash width={16} height={16} />
                  Delete
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="collapse-content flex flex-col gap-8"
        onClick={(e) => {
          e.stopPropagation();
          handleToggleActiveEvent();
        }}
      >
        <div className="w-full flex flex-col gap-2">
          <IntegrationSelect
            activeProject={activeProject}
            setActiveProject={setActiveProject}
            currentEvent={currentEvent}
            events={events}
            integrations={integrations}
            setIntegrations={setIntegrations}
            startEventTransition={startEventTransition}
            handleUpdateIntegration={handleUpdateIntegration}
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
              setActiveEvent={setActiveEvent}
              setEditContentMode={setEditContentMode}
              startLoadTransition={startEventTransition}
            />
          ) : (
            <p
              className="border border-gray-300 rounded-lg p-2"
              dangerouslySetInnerHTML={{
                __html: replaceVariablesInContentBody(
                  currentEvent.content_body,
                  true
                ),
              }}
            ></p>
          )}
        </div>
      </div>
    </>
  );
}