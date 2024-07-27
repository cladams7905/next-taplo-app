import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Tables } from "@/supabase/types";
import { Pencil } from "lucide-react";

export default function ContentBody({
  currentEvent,
}: {
  currentEvent: Tables<"Events">;
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditContent && textareaRef.current) {
      setCurrentNumChars(textareaRef.current.defaultValue.length);
    }
  }, [isEditContent]);

  const locateVariablesInContentBody = (contentBody: string | null) => {
    if (!contentBody) return "";

    const words = contentBody.split(" ");
    const transformedWords = words.map((word, index) => {
      if (word.startsWith(VARCHECK)) {
        return `<span key=${index} class="text-primary bg-primary/20 font-extrabold px-1">${word.slice(
          1,
          word.length
        )}</span>`;
      }
      return word;
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
    setCurrentNumChars(content.length);

    if (content.length > MAXINPUTCHARS) {
      setIsValidInput(false);
    } else if (!isValidInput) {
      setIsValidInput(true);
    }

    const lastVarCheckIndex = content.lastIndexOf(VARCHECK);

    if (lastVarCheckIndex !== -1 && textareaRef.current) {
      const rect = textareaRef.current.getBoundingClientRect();
      const { top, left } = getCaretCoordinates(
        textareaRef.current,
        lastVarCheckIndex
      );
      const lineHeight = 20;

      setDropdownPosition({
        top: rect.top + lineHeight + top,
        left: rect.left + left,
      });
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
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
        <div className="flex items-center gap-1 font-bold">Content</div>
        <div
          className="btn btn-sm lg:mt-0 mt-8 lg:w-auto w-full btn-ghost text-xs"
          onClick={() => setEditContent(!isEditContent)}
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
              className="fixed border border-neutral z-[10] shadow bg-base-100 rounded-md min-w-40 p-1"
              style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
            >
              <li>
                <a className="flex flex-col items-start rounded-md py-1 px-2">
                  <div className="flex items-center gap-2">Variable 1</div>
                </a>
              </li>
            </ul>
          )}
          <div className="flex w-full justify-between">
            <div className="flex flex-col lg:w-1/2">
              <div className="text-xs text-gray-400">
                Available variables:{" "}
                <span className="text-primary">location</span>
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
