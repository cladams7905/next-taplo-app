"use client";

import { Tables } from "@/supabase/types";
import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IColor } from "react-color-palette";
import { Pencil } from "lucide-react";
import { EventType, TemplateTypes } from "@/lib/enums";
import TemplateModal from "./TemplateModal";
import PopupTemplate from "./PopupTemplate";

export default function PopupViewer({
  activeProject,
  setActiveProject,
  events,
  activeEvent,
  setActiveEvent,
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  startLoadTransition,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  activeEvent: Tables<"Events"> | undefined;
  setActiveEvent: Dispatch<SetStateAction<Tables<"Events"> | undefined>>;
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  startLoadTransition: TransitionStartFunction;
}) {
  const [contentBody, setContentBody] = useState<string[]>(
    (activeEvent?.content_body as string[]) || []
  );
  const [activeContent, setActiveContent] = useState<string>(
    activeEvent ? (activeEvent?.content_body as string[])[0] : ""
  );

  const [activeTemplate, setActiveTemplate] = useState<TemplateTypes>(
    activeProject.template as TemplateTypes
  );

  const templateModalRef = useRef<HTMLDialogElement>(null);

  const getVariableList = useCallback(() => {
    let variableList: string[] = [];
    if (activeEvent) {
      switch (activeEvent.event_type) {
        case EventType.Purchase:
          variableList = ["person", "location", "product", "price"];
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
    if (activeEvent) {
      const newContentBody: string[] =
        (activeEvent.content_body as string[]) || [];

      setContentBody(newContentBody);
      setVariableList(getVariableList());
      if (newContentBody.length > 0) {
        setActiveContent(newContentBody[0]);
      }
    }
  }, [activeEvent, getVariableList]);

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
    <div className="flex flex-col w-full items-center gap-3 lg:max-w-[45vw] py-4 rounded-lg">
      <div className="flex flex-col w-full relative items-center rounded-lg gap-14 bg-white/40 shadow-md lg:max-w-[35vw] mb-12 mt-6 lg:my-0 md:my-0 pb-28 px-4">
        <div className="w-full mt-1 ml-2">
          <div className="py-2 w-fit text-sm font-bold">
            {activeEvent ? activeEvent.event_type : ""}
          </div>
        </div>
        <PopupTemplate
          activeProject={activeProject}
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          borderColor={borderColor}
        />
        <div
          className="flex flex-row gap-2 items-center justify-center absolute w-full h-fit px-10 py-4 outline-1 outline-primary bottom-0 rounded-b-lg bg-primary text-xs text-white font-bold cursor-pointer"
          onClick={() => templateModalRef.current?.showModal()}
        >
          Template: {activeProject.template}
          <Pencil height={14} width={14} />
        </div>
      </div>
      <TemplateModal
        templateModalRef={templateModalRef}
        activeTemplate={activeTemplate}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        setActiveTemplate={setActiveTemplate}
        backgroundColor={backgroundColor}
        accentColor={accentColor}
        textColor={textColor}
        borderColor={borderColor}
      />
    </div>
  );
}
