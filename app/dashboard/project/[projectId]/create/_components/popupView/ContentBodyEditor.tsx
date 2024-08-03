import React, {
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  TransitionStartFunction,
  useEffect,
  useRef,
  useState,
} from "react";
import { updateEvent } from "@/lib/actions/events";
import { showToastError } from "@/components/shared/showToast";
import { Tables } from "@/supabase/types";

export default function ContentBodyEditor({
  activeEvent,
  setActiveEvent,
  activeContent,
  contentBody,
  setContentBody,
  variableList,
  modalRef,
  editContentTextAreaRef,
  startLoadTransition,
}: {
  activeEvent: Tables<"Events"> | undefined;
  setActiveEvent: Dispatch<SetStateAction<Tables<"Events"> | undefined>>;
  activeContent: string;
  contentBody: string[];
  setContentBody: Dispatch<SetStateAction<string[]>>;
  variableList: string[];
  modalRef: RefObject<HTMLDialogElement>;
  editContentTextAreaRef: RefObject<HTMLTextAreaElement>;
  startLoadTransition: TransitionStartFunction;
}) {
  const VARCHECK = "\\";
  const MAXINPUTCHARS = 80;
  const [currentNumChars, setCurrentNumChars] = useState(
    activeContent?.length || 0
  );
  const [isValidInput, setIsValidInput] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const varDropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (editContentTextAreaRef?.current) {
      editContentTextAreaRef.current.value = activeContent;
      setCurrentNumChars(editContentTextAreaRef.current.defaultValue.length);
    }
  }, [activeContent, editContentTextAreaRef]);

  const handleContentSave = () => {
    startLoadTransition(async () => {
      if (activeEvent) {
        const updatedContentBody = contentBody.map((content) =>
          content === activeContent
            ? editContentTextAreaRef.current!.value
            : content
        );
        const { data, error } = await updateEvent(activeEvent.id, {
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
          modalRef.current?.close();
        }
      }
    });
  };

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
        editContentTextAreaRef.current &&
        !variableList.includes(currVar.toLocaleLowerCase())
      ) {
        const { top, left } = getCaretCoordinates(
          editContentTextAreaRef.current,
          index
        );
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
  };

  const getCurrentVariable = (content: string, index: number) => {
    let currVar = "";
    const regex = /^[A-Z]$/;
    for (let i = index; i < content.length; i++) {
      if (!regex.test(content[i])) {
        break;
      } else {
        currVar += content[i];
      }
    }
    return currVar;
  };

  const handleAddVariableFromDropdown = (variable: string) => {
    if (editContentTextAreaRef.current?.value) {
      const content = editContentTextAreaRef.current.value;
      const currVar = getCurrentVariable(content, dropdownIndex);
      const beforeInsert = content.substring(0, dropdownIndex);
      const afterInsert = content.substring(dropdownIndex + currVar.length + 1);
      editContentTextAreaRef.current.value =
        beforeInsert + "\\" + variable.toLocaleUpperCase() + afterInsert;
      varDropdownRef.current?.classList.add("hidden");
    }
  };

  return (
    <div className="relative flex flex-col gap-2 mb-6">
      <textarea
        ref={editContentTextAreaRef}
        className="textarea textarea-bordered rounded-lg"
        placeholder="Type your content body here."
        onInput={handleInputChange}
        defaultValue={activeContent || ""}
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
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-400 max-w-[360px]">
            Available variables:{" "}
            {variableList.map((variable, i) => (
              <span key={i} className="text-primary uppercase">
                {variable + `${i != variableList.length - 1 ? ", " : ""}`}
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
