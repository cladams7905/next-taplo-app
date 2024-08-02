"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

  const getVariableList = () => {
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
  };

  const [variableList, setVariableList] = useState<string[]>(getVariableList());

  useEffect(() => {
    setContentBody((activeEvent?.content_body as string[]) || []);
    setActiveContent((activeEvent?.content_body as string[])[0] || "");
    setVariableList(getVariableList());
  }, [activeEvent, contentBody]);

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
                ? `<span key=${i} class="text-primary bg-primary/20 font-extrabold px-1 uppercase rounded-lg">${val}</span>`
                : replaceVariable(val.substring(1).toLocaleLowerCase())
              : val;
          })
          .join("");
      } else {
        return word.startsWith("\\")
          ? shouldReturnHTML
            ? `<span key=${i} class="text-primary bg-primary/20 font-extrabold px-1 uppercase rounded-lg">${word}</span>`
            : replaceVariable(word.substring(1).toLocaleLowerCase())
          : word;
      }
    });
    return transformedWords.join(" ");
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
    <div className="flex flex-col w-full items-center gap-3 max-w-[40vw] p-4 px-6 rounded-lg">
      <div className="flex flex-col w-full items-center">
        <div className="w-full max-w-[320px]">
          <div className="px-4 py-2 w-fit text-sm font-bold mb-2">
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
      </div>
      <div className="flex w-full justify-end items-center max-w-[320px]">
        <div className="btn btn-sm lg:mt-0 mt-8 lg:w-auto w-full btn-ghost text-xs font-bold">
          <Pencil height={14} width={14} />
          Change Template
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
