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
  activeEvent,
  setActiveEvent,
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  startLoadTransition,
  replaceVariablesInContentBody,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  activeEvent: Tables<"Events"> | undefined;
  setActiveEvent: Dispatch<SetStateAction<Tables<"Events"> | undefined>>;
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  startLoadTransition: TransitionStartFunction;
  replaceVariablesInContentBody: (
    contentStr?: string | null,
    shouldReturnHTML?: boolean
  ) => string;
}) {
  const templateModalRef = useRef<HTMLDialogElement>(null);
  const [activeTemplate, setActiveTemplate] = useState<TemplateTypes>(
    activeProject.template as TemplateTypes
  );
  const [shouldTriggerBounceAnimation, setTriggerBounceAnimation] =
    useState<boolean>(false);

  useEffect(() => {
    setTriggerBounceAnimation(true);
    setTimeout(() => {
      setTriggerBounceAnimation(false);
    }, 1000);
  }, [activeEvent]);

  return (
    <div className="flex flex-col w-full items-center gap-3 py-4 rounded-lg">
      <div className="flex flex-col w-full relative items-center rounded-lg gap-14 bg-white/20 lg:max-w-[35vw] mb-12 mt-6 lg:my-0 md:my-0 pb-28 px-4">
        <div className="w-full mt-1 ml-2">
          <div className="py-2 w-fit text-sm font-bold">
            {activeEvent ? activeEvent.event_type : ""}
          </div>
        </div>
        <PopupTemplate
          activeProject={activeProject}
          activeEvent={activeEvent}
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          borderColor={borderColor}
          bounceAnimation={shouldTriggerBounceAnimation}
          replaceVariablesInContentBody={replaceVariablesInContentBody}
        />
        <div
          className="flex flex-row gap-2 items-center justify-center absolute w-full h-fit px-10 py-3 outline-1 outline-primary bottom-0 rounded-b-lg bg-primary text-xs text-white font-bold cursor-pointer"
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
