"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, SetStateAction } from "react";
import { IColor } from "react-color-palette";

export default function TemplateList({
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
  return (
    <div className="flex w-full max-w-[40vw] h-24 mt-12 flex-nowrap items-center gap-4 overflow-x-scroll rounded-lg bg-white/40 px-6 py-4">
      <div className="flex w-32 min-w-32 h-full rounded-lg bg-white border-2 border-primary px-4 py-2"></div>
      <div className="flex w-32 min-w-32 h-full rounded-lg bg-white px-4 py-2"></div>
      <div className="flex w-32 min-w-32 h-full rounded-lg bg-white px-4 py-2"></div>
      <div className="flex w-32 min-w-32 h-full rounded-lg bg-white px-4 py-2"></div>
      <div className="flex w-32 min-w-32 h-full rounded-lg bg-white px-4 py-2"></div>
      <div className="flex w-32 min-w-32 h-full rounded-lg bg-white px-4 py-2"></div>
    </div>
  );
}
