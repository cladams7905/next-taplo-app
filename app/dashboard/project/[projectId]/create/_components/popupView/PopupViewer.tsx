"use client";

import { Tables } from "@/supabase/types";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IColor } from "react-color-palette";
import { Pencil } from "lucide-react";
import ContentList from "./ContentList";
import ContentPopup from "./ContentPopup";
import { EventType } from "@/lib/enums";

export default function PopupViewer({
  activeProject,
  setActiveProject,
  events,
  activeEvent,
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  activeEvent: Tables<"Events"> | undefined;
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
}) {
  const [contentBody, setContentBody] = useState<string[]>(
    (activeEvent?.content_body as string[]) || []
  );
  const [activeContent, setActiveContent] = useState<string>(
    (activeEvent?.content_body as string[])[0] || ""
  );

  const getVariableList = useCallback(() => {
    let variableList: string[] = [];
    if (activeEvent) {
      switch (activeEvent.event_type) {
        case EventType.OnPurchase:
          variableList = ["person", "location", "product", "price"];
          break;
        case EventType.OnReview:
          variableList = [
            "person",
            "location",
            "rating",
            "review",
            "project",
            "provider",
            "numreviews",
          ];
          break;
        case EventType.ActiveUsers:
          variableList = ["numusers", "recentusers"];
          break;
      }
    }
    return variableList;
  }, [activeEvent]);

  const [variableList, setVariableList] = useState<string[]>(getVariableList());

  useEffect(() => {
    setContentBody((activeEvent?.content_body as string[]) || []);
    setActiveContent((activeEvent?.content_body as string[])[0] || "");
    setVariableList(getVariableList());
  }, [activeEvent, contentBody, getVariableList]);

  const replaceVariablesInContentBody = (
    contentStr?: string | null,
    shouldReturnHTML?: boolean
  ) => {
    if (!contentStr && !activeContent) return "";

    let words;
    if (contentStr) {
      words = contentStr.split(" ");
    } else {
      words = activeContent.split(" ");
    }

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
    return `<span key=${index} class="text-primary bg-primary/20 font-extrabold px-1 uppercase rounded-lg">${word}</span>`;
  };

  const replaceVariable = (variable: string) => {
    let returnWord = "";
    switch (variable) {
      case "person":
        returnWord = "Someone";
        break;
      case "location":
        returnWord = "Seattle, Washington, USA";
        break;
      case "product":
        returnWord = "Tennis Shoes";
        break;
      case "rating":
        returnWord = "4";
        break;
      case "review":
        returnWord = "I love this product!";
        break;
      case "project":
        returnWord = activeProject.name;
        break;
      case "provider":
        returnWord = "Google";
        break;
      case "numreviews":
        returnWord = "20";
        break;
      case "numusers":
        returnWord = "20";
        break;
      case "recentusers":
        returnWord = "40";
        break;
      default:
        returnWord = "undefined";
    }
    return returnWord;
  };

  return (
    <div className="flex flex-col w-full items-center gap-3 lg:max-w-[45vw] p-4 px-6 rounded-lg">
      <div className="flex flex-col w-full items-center rounded-lg bg-white/40 max-w-[35vw] border border-gray-300">
        <div className="w-full mb-12">
          <div className="px-4 py-2 w-fit text-sm font-bold">
            {activeEvent ? activeEvent.event_type : ""}
          </div>
        </div>
        <ContentPopup
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          events={events}
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          verifiedColor={verifiedColor}
          borderColor={borderColor}
          contentBody={contentBody}
          activeContent={activeContent}
          replaceVariablesInContentBody={replaceVariablesInContentBody}
        />
        <div className="flex w-full justify-end items-center max-w-[320px] mt-2 mb-12">
          <div className="btn btn-sm lg:mt-0 mt-8 lg:w-auto w-full btn-ghost text-xs font-bold">
            <Pencil height={14} width={14} />
            Change Template
          </div>
        </div>
      </div>
      <ContentList
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        events={events}
        activeEvent={activeEvent}
        backgroundColor={backgroundColor}
        accentColor={accentColor}
        textColor={textColor}
        verifiedColor={verifiedColor}
        borderColor={borderColor}
        contentBody={contentBody}
        setContentBody={setContentBody}
        activeContent={activeContent}
        setActiveContent={setActiveContent}
        variableList={variableList}
        replaceVariablesInContentBody={replaceVariablesInContentBody}
      />
    </div>
  );
}
