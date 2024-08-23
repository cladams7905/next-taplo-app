"use client";

import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  TransitionStartFunction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { updateEvent } from "@/lib/actions/events";
import { showToastError } from "@/components/shared/showToast";
import { Tables } from "@/supabase/types";
import { ContentVars, EventType } from "@/lib/enums";
import { useProjectContext } from "../ProjectBoard";

export default function ContentBodyEditor({
  currentEvent,
  setEditContentMode,
  startLoadTransition,
}: {
  currentEvent: Tables<"Events"> | undefined;
  setEditContentMode: Dispatch<SetStateAction<boolean>>;
  startLoadTransition: TransitionStartFunction;
}) {
  const { setActiveEvent } = useProjectContext();
  const VARCHECK = "\\";
  const MAXINPUTCHARS = 80;
  const [currentNumChars, setCurrentNumChars] = useState(
    currentEvent?.content_body?.length || 0
  );
  const [isValidInput, setIsValidInput] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const varDropdownRef = useRef<HTMLUListElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef?.current && currentEvent) {
      textAreaRef.current.value = currentEvent?.content_body;
      setCurrentNumChars(textAreaRef.current.defaultValue.length);
    }
  }, [textAreaRef, currentEvent]);

  const handleContentSave = () => {
    startLoadTransition(async () => {
      if (
        currentEvent &&
        textAreaRef.current?.value != currentEvent.content_body
      ) {
        const updatedContentBody = textAreaRef.current!.value;
        const { data, error } = await updateEvent(currentEvent.id, {
          content_body: updatedContentBody,
        });
        if (error) {
          showToastError(error);
        } else {
          setActiveEvent((prevEvent) =>
            prevEvent
              ? {
                  ...prevEvent,
                  content_body: updatedContentBody,
                }
              : prevEvent
          );
          setEditContentMode(false);
        }
      }
    });
  };

  const getVariableList = useCallback(() => {
    let variableList: string[] = [];
    if (currentEvent) {
      switch (currentEvent.event_type) {
        case EventType.Purchase:
          variableList = [
            ContentVars.Person,
            ContentVars.Location,
            ContentVars.Product,
            ContentVars.Price,
          ];
          break;
        case EventType.ActiveUsers:
          variableList = [ContentVars.NumUsers, ContentVars.RecentUsers];
          break;
        case EventType.AddToCart:
        case EventType.SomeoneViewing:
          variableList = [
            ContentVars.Person,
            ContentVars.Location,
            ContentVars.Product,
          ];
          break;
      }
    }
    return variableList;
  }, [currentEvent]);

  const variableList = getVariableList();

  const getCaretCoordinates = (
    element: HTMLTextAreaElement,
    position: number
  ) => {
    const div = document.createElement("div");
    const style = window.getComputedStyle(element);

    const properties = [
      "boxSizing",
      "width",
      "height",
      "overflowX",
      "overflowY",
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "borderLeftWidth",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "fontStyle",
      "fontVariant",
      "fontWeight",
      "fontStretch",
      "fontSize",
      "fontSizeAdjust",
      "lineHeight",
      "fontFamily",
      "textAlign",
      "textTransform",
      "textIndent",
      "textDecoration",
      "letterSpacing",
      "wordSpacing",
    ];

    properties.forEach((prop) => {
      div.style[prop as any] = style[prop as any];
    });

    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.whiteSpace = "pre-wrap";
    div.style.wordWrap = "break-word";
    div.style.overflow = "hidden";
    div.style.width = element.offsetWidth + "px";
    div.style.height = element.offsetHeight + "px";
    div.textContent = element.value.substring(0, position);
    document.body.appendChild(div);

    const span = document.createElement("span");
    span.textContent = element.value.substring(position) || ".";
    div.appendChild(span);

    const { offsetTop: top, offsetLeft: left } = span;
    document.body.removeChild(div);

    return { top, left };
  };

  const handleInputChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const content = e.currentTarget.value;
    setCurrentNumChars(content.length);

    if (content.length > MAXINPUTCHARS) {
      setIsValidInput(false);
    } else if (!isValidInput) {
      setIsValidInput(true);
    }

    let lastVarCheckIndexes = getAllIndexes(content, VARCHECK);

    function getAllIndexes(str: string, char: string) {
      const indexes = [];
      for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
          indexes.push(i);
        }
      }
      return indexes;
    }

    lastVarCheckIndexes.some((index) => {
      /* Check to make sure that the variable index the dropdown is hovering over 
    is not already matching one on the variable list */
      setDropdownIndex(index);
      const currVar = getCurrentVariable(content, index + 1);

      if (
        index !== -1 &&
        textAreaRef.current &&
        !variableList.includes(currVar.toLocaleLowerCase())
      ) {
        const { top, left } = getCaretCoordinates(textAreaRef.current, index);
        const lineHeight = 20;

        setDropdownPosition({
          top: top + lineHeight,
          left: left,
        });

        setDropdownVisible(true);
        varDropdownRef.current?.classList.remove("hidden");
        return true; //break out of loop
      } else {
        setDropdownVisible(false);
      }
    });
  };

  const getCurrentVariable = (content: string, index: number) => {
    let currVar = "";
    const regex = /^[A-Za-z]$/;

    if (index < content.length && regex.test(content[index])) {
      for (let i = index; i < content.length; i++) {
        if (!regex.test(content[i])) {
          // Stop if the current character is not part of the variable
          break;
        }
        currVar += content[i];
      }
    }

    return currVar;
  };

  const handleAddVariableFromDropdown = (variable: string) => {
    if (textAreaRef.current?.value) {
      const content = textAreaRef.current.value;
      const currVar = getCurrentVariable(content, dropdownIndex + 1);

      if (dropdownIndex >= 0) {
        const beforeInsert = content.substring(0, dropdownIndex);
        const afterInsert = content.substring(
          dropdownIndex + currVar.length + 1
        );

        textAreaRef.current.value =
          beforeInsert + "\\" + variable.toLocaleUpperCase() + afterInsert;

        varDropdownRef.current?.classList.add("hidden");
      }
    }
  };

  const getVariableTooltip = (variable: ContentVars) => {
    let returnStr = "";
    switch (variable) {
      case ContentVars.Person:
        returnStr =
          'The first name of the user (ex: "Jamie"). If this field is unknown, it will be replaced with "Someone".';
        break;
      case ContentVars.Location:
        returnStr =
          'The location of the user, displayed as City, Country (ex: "Seattle, USA").';
        break;
      case ContentVars.Product:
        returnStr =
          'The name of the product (ex: "Airpods Pro"). If there is no corresponding product found, this field will default to "a product".';
        break;
      case ContentVars.Price:
        returnStr =
          "The price associated with a purchase. If there is no price found, this field will be left blank.";
        break;
      case ContentVars.NumUsers:
        returnStr =
          "The total number of users online now. If this number is not found, this field will default to 0.";
        break;
      case ContentVars.RecentUsers:
        returnStr =
          "The total number of users online within the past 24 hours. If this number is not found, this field will default to 0.";
        break;
    }
    return returnStr;
  };

  return (
    <div className="relative flex flex-col gap-2 mb-6">
      <textarea
        ref={textAreaRef}
        className="textarea textarea-bordered rounded-lg"
        placeholder="Type your content body here."
        onInput={handleInputChange}
        defaultValue={currentEvent?.content_body || ""}
      ></textarea>
      {dropdownVisible && (
        <ul
          className="absolute border border-neutral z-[10] shadow bg-base-100 rounded-md min-w-24 p-1 max-h-[100px] overflow-y-scroll"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
          ref={varDropdownRef}
        >
          {variableList.map((variable, i) => (
            <li key={i}>
              <a
                className="flex flex-col items-start rounded-md py-1 px-2"
                onClick={() => handleAddVariableFromDropdown(variable)}
              >
                <div className="flex items-center gap-2 uppercase text-sm">
                  \{variable}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-xs text-gray-400 max-w-[360px]">
            Available variables:{" "}
            {variableList.map((variable, i) => (
              <span
                key={i}
                className="text-primary uppercase tooltip tooltip-bottom tooltip-info mr-1"
                data-tip={getVariableTooltip(variable as ContentVars)}
              >
                {"\\" +
                  variable +
                  `${i != variableList.length - 1 ? ", " : ""}`}
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-400">
            {" "}
            Type &quot;\&quot; to add a variable
          </div>
        </div>
        <div className={`text-xs ${!isValidInput && "text-error"}`}>
          {currentNumChars}/{MAXINPUTCHARS}
        </div>
      </div>
      <div className="flex justify-end">
        <div
          className={`btn btn-primary btn-sm w-20 text-white text-xs -mt-4 ${
            !isValidInput && "btn-disabled"
          }`}
          onClick={() => handleContentSave()}
        >
          Save
        </div>
      </div>
    </div>
  );
}
