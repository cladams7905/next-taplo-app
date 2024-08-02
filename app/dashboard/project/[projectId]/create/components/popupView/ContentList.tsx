"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, SetStateAction } from "react";
import { IColor } from "react-color-palette";

export default function ContentList({
  activeProject,
  setActiveProject,
  events,
  activeEvent,
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
  contentBody,
  setContentBody,
  activeContent,
  setActiveContent,
  variableList,
  replaceVariablesInContentBody,
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
  contentBody: string[];
  setContentBody: Dispatch<SetStateAction<string[]>>;
  activeContent: string;
  setActiveContent: Dispatch<SetStateAction<string>>;
  variableList: string[];
  replaceVariablesInContentBody: (
    contentStr?: string | null,
    shouldReturnHTML?: boolean
  ) => string;
}) {
  const handleToggleActiveContent = (content: string) => {
    if (content !== activeContent) {
      setActiveContent(content);
    }
  };

  return (
    <div className="flex flex-col w-full h-fit max-h-56 mt-12 items-center gap-3 overflow-y-scroll py-2 px-6 cursor-pointer">
      {contentBody.map((entry, i) => (
        <div
          key={i}
          onClick={() => handleToggleActiveContent(entry)}
          className={`inline-block w-full h-fit bg-white/50 rounded-lg py-2 px-5 text-sm ${
            activeContent === entry
              ? "ring-2 ring-primary"
              : "border border-gray-200"
          }`}
          dangerouslySetInnerHTML={{
            __html: replaceVariablesInContentBody(entry, true),
          }}
        ></div>
      ))}
    </div>
  );
}
