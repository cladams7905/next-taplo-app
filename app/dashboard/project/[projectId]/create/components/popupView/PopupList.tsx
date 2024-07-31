"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, SetStateAction } from "react";
import { IColor } from "react-color-palette";

export default function PopupList({
  activeProject,
  setActiveProject,
  events,
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
}) {
  return <div className="flex w-full h-full max-w-[500px] p-4"></div>;
}
