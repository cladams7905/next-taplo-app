"use client";

import React, {
  FormEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Tables, TablesUpdate } from "@/lib/supabase/types";
import { ContentVars, EventType } from "@/lib/enums";
import { getDefaultMessageOptions } from "./MessageDropdown";
import LoadingDots from "@/app/_components/shared/loadingdots";

export default function ContentBodyEditor({
  modalRef,
  currentEvent,
  handleUpdateEvent,
}: {
  modalRef: RefObject<HTMLDialogElement>;
  currentEvent: Tables<"Events"> | undefined;
  handleUpdateEvent: (
    currentEvent: Tables<"Events">,
    newEvent: TablesUpdate<"Events">
  ) => Promise<void>;
}) {
  //The delimiter used to mark the start of a new variable
  const VARCHECK = "\\";

  //The max number of characters allowed in a message
  const MAXINPUTCHARS = 80;

  //Stores the current number of characters of a message
  const [currentNumChars, setCurrentNumChars] = useState(0);

  //Boolean that stores whether message body input is valid or not
  const [isValidInput, setIsValidInput] = useState(true);

  //Boolean that stores whether the variable list dropdown menu is visible or not
  const [dropdownVisible, setDropdownVisible] = useState(false);

  //Stores the current variable list dropdown menu position
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  //Stores the index of the last variable edited/created inside of the message body
  const [varIndex, setvarIndex] = useState(0);

  //Stores whether the variable list dropdown menu is being hovered over
  const [isHovered, setIsHovered] = useState(false);

  //Stores the index of which variable in the dropdown menu is being highlighted
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const varDropdownRef = useRef<HTMLUListElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, startTransition] = useTransition();

  /**
   * Gets the variable list based on the event type
   */
  const getVariableList = useCallback(() => {
    let variableList: string[] = [];
    if (currentEvent) {
      switch (currentEvent.event_type) {
        case EventType.Purchase:
        case EventType.Checkout:
          variableList = [
            ContentVars.Person,
            ContentVars.Location,
            ContentVars.Product,
            ContentVars.Price,
          ];
          break;
        case EventType.ActiveUsers:
          variableList = [ContentVars.NumUsers];
          break;
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

  //Stores the variables that can be accessed within a certain event
  const variableList = getVariableList();

  /*
   * This useEffect handles key press events within the variable dropdown menu
   */
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!dropdownVisible || isHovered) return;

      if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        handleAddVariableFromDropdown(variableList[highlightedIndex]);
      } else if (event.key === "ArrowDown") {
        // Move down the list, loop back to the top if at the end
        setHighlightedIndex(
          (prevIndex) => (prevIndex + 1) % variableList.length
        );
      } else if (event.key === "ArrowUp") {
        // Move up the list, loop back to the bottom if at the top
        setHighlightedIndex((prevIndex) =>
          prevIndex === 0 ? variableList.length - 1 : prevIndex - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [dropdownVisible, highlightedIndex, variableList]);

  /**
   * Handles the creation of a new custom message
   */
  const handleMessageCreate = () => {
    startTransition(async () => {
      const newMessage = textAreaRef.current?.value;
      if (!newMessage) return;

      const defaultMessages = getDefaultMessageOptions(
        currentEvent?.event_type as EventType
      );

      if (
        currentEvent &&
        !defaultMessages.includes(newMessage) &&
        !(currentEvent.custom_messages as string[]).includes(newMessage)
      ) {
        //Create the message and add to event.custom_messages in db
        await handleUpdateEvent(currentEvent, {
          message: newMessage,
          custom_messages: [
            ...(currentEvent.custom_messages as string[]),
            newMessage,
          ],
        });
        modalRef.current?.close();
        textAreaRef.current.value = "";
        setCurrentNumChars(0);
        modalRef.current?.classList.add("hidden");
      }
    });
  };

  /**
   * Gets the dropdown position of the variable list dropdown menu
   * @param element the textarea element
   * @param position the position of the dropdown
   */
  const getCaretCoordinates = (
    element: HTMLTextAreaElement,
    position: number
  ) => {
    const div = document.createElement("div");
    const style = window.getComputedStyle(element);

    //Element properties to check to determine dropdown position
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

  /**
   * Handles input change within the textarea element
   */
  const handleInputChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const content = e.currentTarget.value;
    setCurrentNumChars(content.length);

    //Check to see if input is a valid length
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

    if (lastVarCheckIndexes.length > 0) {
      lastVarCheckIndexes.some((index) => {
        /* Check to make sure that the variable index the dropdown is hovering over 
        is not already matching one on the variable list */
        setvarIndex(index);
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
          return true; //break out of loop
        } else {
          setDropdownVisible(false);
        }
      });
    } else {
      setDropdownVisible(false);
    }
  };

  /**
   * Gets the current variable from within the textarea input
   * @param content the message body string
   * @param index the index to check
   * @returns the current variable
   */
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

  /**
   * Adds a variable from the dropdown list to the textarea content
   * @param variable the variable to add
   */
  const handleAddVariableFromDropdown = (variable: string) => {
    if (textAreaRef.current?.value) {
      const content = textAreaRef.current.value;
      const currVar = getCurrentVariable(content, varIndex + 1);

      if (varIndex >= 0) {
        const beforeInsert = content.substring(0, varIndex);
        const afterInsert = content.substring(varIndex + currVar.length + 1);

        textAreaRef.current.value =
          beforeInsert + "\\" + variable.toLocaleUpperCase() + afterInsert;

        varDropdownRef.current?.classList.add("hidden");
      }
    }
  };

  /**
   * Gets tooltip content for descriptions of variables (activated when hovered over).
   * @param variable the variable to get a description for
   * @returns the tooltip content
   */
  const getVariableTooltip = (variable: ContentVars) => {
    let returnStr = "";
    switch (variable) {
      case ContentVars.Person:
        returnStr =
          'The name of the user. If this field is unknown, it will be replaced with "Someone".';
        break;
      case ContentVars.Location:
        returnStr =
          'The location of the visitor, displayed as City, Country (ex: "Seattle, USA").';
        break;
      case ContentVars.Product:
        returnStr =
          'The name of a product (ex: "Airpods Pro"). If there is no corresponding product found, this field will default to "a product".';
        break;
      case ContentVars.Price:
        returnStr =
          "The price associated with a purchase. If there is no price found, this field will be left blank.";
        break;
      case ContentVars.NumUsers:
        returnStr =
          "The total number of visitors on your site now. If this number is not found, this field will default to 0.";
        break;
    }
    return returnStr;
  };

  return (
    <div className="relative flex flex-col gap-2">
      <textarea
        ref={textAreaRef}
        className="textarea textarea-bordered rounded-lg"
        placeholder="Type your message here."
        onInput={handleInputChange}
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
                className={`flex flex-col items-start rounded-md py-1 px-2 ${
                  i === highlightedIndex && !isHovered ? "bg-link-hover" : ""
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
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
          className={`btn btn-primary btn-md w-full text-white mt-4 ${
            !isValidInput || currentNumChars === 0 || isLoading
              ? "btn-disabled"
              : ""
          }`}
          onClick={() => handleMessageCreate()}
        >
          {isLoading ? <LoadingDots color="oklch(var(--bc))" /> : "Create"}
        </div>
      </div>
    </div>
  );
}
