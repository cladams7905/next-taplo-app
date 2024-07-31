import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  TransitionStartFunction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Tables } from "@/supabase/types";
import { Pencil } from "lucide-react";
import { EventType } from "@/lib/enums";
import { updateEvent } from "@/lib/actions/events";
import { showToastError } from "@/components/shared/showToast";

export default function ContentBody({
  currentEvent,
  setEvents,
  startEventTransition,
}: {
  currentEvent: Tables<"Events">;
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  startEventTransition: TransitionStartFunction;
}) {
  const VARCHECK = "\\";
  const MAXINPUTCHARS = 80;
  const [currentNumChars, setCurrentNumChars] = useState(
    currentEvent.content_body?.length || 0
  );
  const [isValidInput, setIsValidInput] = useState(true);
  const [isEditContent, setEditContent] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editContentRef = useRef<HTMLDivElement>(null);
  const varDropdownRef = useRef<HTMLUListElement>(null);

  const getVariableList = () => {
    let variableList: string[] = [];
    switch (currentEvent.event_type) {
      case EventType.OnPurchase:
        variableList = ["person", "location", "product", "price"];
        break;
      case EventType.OnReview:
        variableList = ["person", "location", "rating", "review"];
      case EventType.ActiveUsers:
        variableList = ["activeusers", "location"];
        break;
    }
    return variableList;
  };

  const [variableList, setVariableList] = useState<string[]>(getVariableList());

  useEffect(() => {
    if (isEditContent && textareaRef.current) {
      setCurrentNumChars(textareaRef.current.defaultValue.length);
    }
  }, [isEditContent]);

  const handleContentSave = () => {
    startEventTransition(async () => {
      const { data, error } = await updateEvent(currentEvent.id, {
        ...currentEvent,
        content_body: textareaRef.current?.value,
      });
      if (error) {
        showToastError(error);
      } else {
        setEvents((prevEvents) =>
          prevEvents.map((e) =>
            e.id === currentEvent.id
              ? { ...e, content_body: textareaRef.current!.value }
              : e
          )
        );
        setEditContent(false);
      }
    });
  };

  const locateVariablesInContentBody = (contentBody: string | null) => {
    if (!contentBody) return "";

    const words = contentBody.split(/(\\\w+|\w+|[^\w\s])/g).filter(Boolean);
    const transformedWords = words.map((word, index) => {
      const slicedWord = word.substring(1);
      if (
        word.startsWith(VARCHECK) &&
        variableList.includes(slicedWord.toLowerCase())
      ) {
        return `<span key=${index} class="text-primary bg-primary/20 font-extrabold px-1 uppercase">${slicedWord}</span>`;
      } else {
        return word;
      }
    });

    const htmlContent = transformedWords.join(" ");
    return htmlContent;
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
    varDropdownRef.current?.classList.add("hidden");
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
      /* Check to make sure that the variable the dropdown is hovering over 
    is not already matching one on the variable list */
      setDropdownIndex(index);
      const currVar = getCurrentVariable(content, index + 1);

      if (
        index !== -1 &&
        textareaRef.current &&
        !variableList.includes(currVar.toLocaleLowerCase())
      ) {
        const rect = textareaRef.current.getBoundingClientRect();
        const { top, left } = getCaretCoordinates(textareaRef.current, index);
        const lineHeight = 20;

        setDropdownPosition({
          top: rect.top + lineHeight + top,
          left: rect.left + left,
        });

        varDropdownRef.current?.classList.remove("hidden");
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
    if (textareaRef.current?.value) {
      const content = textareaRef.current.value;
      const currVar = getCurrentVariable(content, dropdownIndex);
      const beforeInsert = content.substring(0, dropdownIndex);
      const afterInsert = content.substring(dropdownIndex + currVar.length);
      textareaRef.current.value =
        beforeInsert + "\\" + variable.toLocaleUpperCase() + afterInsert;
      varDropdownRef.current?.classList.add("hidden");
    }
  };

  /* Handle clicking outside of content body box or pressing enter */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | KeyboardEvent) {
      if (
        editContentRef.current &&
        editContentRef.current.contains(e.target as Node)
      ) {
        return;
      }
      setEditContent(false);
      setDropdownVisible(false);
    }
    function handleKeyPress(e: KeyboardEvent) {
      if (e.code === "Enter") {
        e.preventDefault();
        handleClickOutside(e);
      }
    }

    if (isEditContent) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyPress);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isEditContent]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 font-bold">Text Content</div>
        <div
          className="btn btn-sm lg:mt-0 mt-8 lg:w-auto w-full btn-ghost text-xs"
          onClick={() => {
            setEditContent(!isEditContent);
            setIsValidInput(true);
          }}
        >
          <Pencil height={14} width={14} />
          Edit
        </div>
      </div>
      {isEditContent ? (
        <div className="flex flex-col gap-2" ref={editContentRef}>
          <textarea
            ref={textareaRef}
            className="textarea textarea-bordered rounded-lg"
            placeholder="Type your content body here."
            onInput={handleInputChange}
            defaultValue={
              currentEvent?.content_body ? currentEvent.content_body : ""
            }
          ></textarea>
          {dropdownVisible && (
            <ul
              className="fixed border border-neutral z-[10] shadow bg-base-100 rounded-md min-w-24 p-1"
              style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
              ref={varDropdownRef}
            >
              {variableList.map((variable, i) => (
                <li key={i}>
                  <a
                    className="flex flex-col items-start rounded-md py-1 px-2"
                    onClick={() => handleAddVariableFromDropdown(variable)}
                  >
                    <div className="flex items-center gap-2 uppercase">
                      \{variable}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <div className="text-xs text-gray-400">
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
              className={`btn btn-primary btn-sm w-20 text-white text-xs -mt-3 ${
                !isValidInput && "btn-disabled"
              }`}
              onClick={handleContentSave}
            >
              Save
            </div>
          </div>
        </div>
      ) : (
        <div
          className="p-2 px-3 inline-block border border-base-300 rounded-lg text-sm"
          dangerouslySetInnerHTML={{
            __html: locateVariablesInContentBody(currentEvent.content_body),
          }}
        />
      )}
    </>
  );
}
