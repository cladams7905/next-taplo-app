"use client";

import { Tables } from "@/supabase/types";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { IColor } from "react-color-palette";

export interface ProjectContextType {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  activeEvent: Tables<"Events"> | undefined;
  setActiveEvent: Dispatch<SetStateAction<Tables<"Events"> | undefined>>;
  events: Tables<"Events">[];
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  integrations: Tables<"Integrations">[];
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  products: Tables<"Products">[];
  setProducts: Dispatch<SetStateAction<Tables<"Products">[]>>;
  activeProduct: Tables<"Products"> | undefined;
  setActiveProduct: Dispatch<SetStateAction<Tables<"Products"> | undefined>>;
  backgroundColor: IColor;
  setBackgroundColor: Dispatch<SetStateAction<IColor>>;
  textColor: IColor;
  setTextColor: Dispatch<SetStateAction<IColor>>;
  accentColor: IColor;
  setAccentColor: Dispatch<SetStateAction<IColor>>;
  borderColor: IColor;
  setBorderColor: Dispatch<SetStateAction<IColor>>;
  displayTime: number;
  setDisplayTime: Dispatch<SetStateAction<number>>;
}

/**
 * Project context and custom hook to access context
 */
export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

/**
 * @interface ProjectContextType
 * @prop activeProject
 * @prop activeEvent
 * @prop events
 * @prop integrations
 * @prop backgroundColor
 * @prop textColor
 * @prop borderColor
 * @prop accentColor
 * @prop isPreviewMode
 * @prop displayTime
 * @returns the project context
 */
export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};
