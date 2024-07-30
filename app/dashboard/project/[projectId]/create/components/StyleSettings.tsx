"use client";

import { showToastError } from "@/components/shared/showToast";
import { updateProject } from "@/lib/actions/projects";
import { PopupTemplates, ScreenAlignment } from "@/lib/enums";
import useScroll from "@/lib/hooks/use-scroll";
import { Tables } from "@/supabase/types";
import { Undo2 } from "lucide-react";
import { Dispatch, RefObject, SetStateAction, useTransition } from "react";
import { ColorPicker, IColor } from "react-color-palette";
import "react-color-palette/css";

export const StyleSettings = ({
  activeProject,
  setActiveProject,
  backgroundColor,
  setBackgroundColor,
  textColor,
  setTextColor,
  accentColor,
  setAccentColor,
  verifiedColor,
  setVerifiedColor,
  borderColor,
  setBorderColor,
  scrollRef,
  styleHeaderRef,
  eventHeaderHeight,
}: {
  activeProject: Tables<"Projects"> | undefined;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  backgroundColor: IColor;
  setBackgroundColor: Dispatch<SetStateAction<IColor>>;
  textColor: IColor;
  setTextColor: Dispatch<SetStateAction<IColor>>;
  accentColor: IColor;
  setAccentColor: Dispatch<SetStateAction<IColor>>;
  verifiedColor: IColor;
  setVerifiedColor: Dispatch<SetStateAction<IColor>>;
  borderColor: IColor;
  setBorderColor: Dispatch<SetStateAction<IColor>>;
  scrollRef: RefObject<HTMLDivElement>;
  styleHeaderRef: RefObject<HTMLDivElement>;
  eventHeaderHeight: number | undefined;
}) => {
  const screenAlignmentTypes = Object.values(ScreenAlignment);
  const templateTypes = Object.values(PopupTemplates);
  const [isStylePending, startStyleTransition] = useTransition();
  const scrolled = useScroll(eventHeaderHeight, scrollRef);

  const handleResetClick = () => {
    startStyleTransition(async () => {
      if (activeProject) {
        setActiveProject({
          ...activeProject,
          bg_color: "#FFFFFF",
          text_color: "#172554",
          accent_color: "#6b7280",
          border_color: "#D1D3D7",
          verified_color: "#4ade80",
        });
        const { error } = await updateProject(activeProject.id, {
          ...activeProject,
          bg_color: "#FFFFFF",
          text_color: "#172554",
          accent_color: "#6b7280",
          border_color: "#D1D3D7",
          verified_color: "#4ade80",
        });
        if (error) {
          showToastError(error);
        }
      }
    });
  };

  const handleBackgroundColorChange = (newColor: string) => {
    startStyleTransition(async () => {
      if (newColor !== activeProject?.bg_color && activeProject) {
        setActiveProject({
          ...activeProject,
          bg_color: newColor,
        });
        const { error } = await updateProject(activeProject.id, {
          ...activeProject,
          bg_color: newColor,
        });
        if (error) {
          showToastError(error);
        }
      }
    });
  };

  const handleTextColorChange = (newColor: string) => {
    startStyleTransition(async () => {
      if (newColor !== activeProject?.text_color && activeProject) {
        setActiveProject({
          ...activeProject,
          text_color: newColor,
        });
        const { error } = await updateProject(activeProject.id, {
          ...activeProject,
          text_color: newColor,
        });
        if (error) {
          showToastError(error);
        }
      }
    });
  };

  const handleAccentColorChange = (newColor: string) => {
    startStyleTransition(async () => {
      if (newColor !== activeProject?.accent_color && activeProject) {
        setActiveProject({
          ...activeProject,
          accent_color: newColor,
        });
        const { error } = await updateProject(activeProject.id, {
          ...activeProject,
          accent_color: newColor,
        });
        if (error) {
          showToastError(error);
        }
      }
    });
  };

  const handleBorderColorChange = (newColor: string) => {
    startStyleTransition(async () => {
      if (newColor !== activeProject?.border_color && activeProject) {
        setActiveProject({
          ...activeProject,
          border_color: newColor,
        });
        const { error } = await updateProject(activeProject.id, {
          ...activeProject,
          border_color: newColor,
        });
        if (error) {
          showToastError(error);
        }
      }
    });
  };

  const handleVerifiedColorChange = (newColor: string) => {
    startStyleTransition(async () => {
      if (newColor !== activeProject?.verified_color && activeProject) {
        setActiveProject({
          ...activeProject,
          verified_color: newColor,
        });
        const { error } = await updateProject(activeProject.id, {
          ...activeProject,
          verified_color: newColor,
        });
        if (error) {
          showToastError(error);
        }
      }
    });
  };

  const handleScreenAlignmentSelect = (screenAlignment: ScreenAlignment) => {
    startStyleTransition(async () => {
      if (activeProject && screenAlignment) {
        setActiveProject({
          ...activeProject,
          screen_alignment: screenAlignment,
        });
        const { error } = await updateProject(activeProject.id, {
          ...activeProject,
          screen_alignment: screenAlignment,
        });
        if (error) {
          showToastError(error);
        }
      }
    });
  };

  const handleTemplateSelect = (template: PopupTemplates) => {
    startStyleTransition(async () => {
      if (activeProject && template) {
        setActiveProject({
          ...activeProject,
          template: template,
        });
        const { error } = await updateProject(activeProject.id, {
          ...activeProject,
          template: template,
        });
        if (error) {
          showToastError(error);
        }
      }
    });
  };
  return (
    <div ref={styleHeaderRef} className="flex flex-col w-full h-fit mb-8">
      <div
        className={`flex items-center sticky top-[-1px] text-xs z-[2] px-4 py-6 gap-2 bg-white border-t border-base-300 ${
          scrolled ? "border-b -mb-[1px]" : ""
        }`}
      >
        <div className="font-semibold text-gray-400 ml-2">Style</div>
        {isStylePending && (
          <span className="loading loading-spinner loading-xs bg-base-content"></span>
        )}
      </div>
      <div className="flex flex-col p-4 gap-6">
        <div className="flex flex-col gap-6 rounded-lg border border-base-300 px-5 pt-3 pb-5">
          <div className="flex flex-row items-center w-full justify-between">
            <p className="text-sm font-bold">Colors</p>
            <div
              className="btn btn-sm lg:mt-0 lg:w-auto w-full btn-ghost text-xs"
              onClick={() => handleResetClick()}
            >
              <Undo2 height={16} width={16} /> Reset
            </div>
          </div>
          <div className="flex lg:flex-row md:flex-row flex-col lg:gap-10 gap-6">
            <div className="flex flex-col lg:w-1/2 w-full gap-4">
              <div className="flex flex-col w-full gap-2">
                <p className="text-sm">Background color</p>
                <div
                  className="flex flex-row gap-2 dropdown dropdown-right"
                  onBlur={() =>
                    handleBackgroundColorChange(backgroundColor.hex)
                  }
                >
                  <input
                    type="text"
                    value={backgroundColor.hex.toUpperCase()}
                    className="input input-bordered input-sm h-[38px] border border-neutral w-full max-w-52"
                    readOnly
                  />
                  <div
                    tabIndex={0}
                    style={{
                      backgroundColor: backgroundColor.hex.toString(),
                    }}
                    className="max-h-[38px] max-w-[38px] h-full w-full border border-gray-300 rounded-lg aspect-square"
                  />
                  <div
                    tabIndex={0}
                    className="dropdown-content bg-base-100 -ml-11 -mt-56 rounded-box z-[5] w-72 p-2 shadow border border-gray-300"
                  >
                    <ColorPicker
                      color={backgroundColor}
                      onChange={setBackgroundColor}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <p className="text-sm">Text color</p>
                <div
                  className="flex flex-row gap-2 dropdown dropdown-right"
                  onBlur={() => handleTextColorChange(textColor.hex)}
                >
                  <input
                    type="text"
                    value={textColor.hex.toUpperCase()}
                    className="input input-bordered input-sm h-[38px] border border-neutral w-full max-w-52"
                    readOnly
                  />
                  <div
                    tabIndex={0}
                    style={{
                      backgroundColor: textColor.hex.toString(),
                    }}
                    className="max-h-[38px] max-w-[38px] h-full w-full border border-gray-300 rounded-lg aspect-square"
                  />
                  <div
                    tabIndex={0}
                    className="dropdown-content bg-base-100 -ml-11 -mt-56 rounded-box z-[5] w-72 p-2 shadow border border-gray-300"
                  >
                    <ColorPicker color={textColor} onChange={setTextColor} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <p className="text-sm">Accent color</p>
                <div
                  className="flex flex-row gap-2 dropdown dropdown-right"
                  onBlur={() => handleAccentColorChange(accentColor.hex)}
                >
                  <input
                    type="text"
                    value={accentColor.hex.toUpperCase()}
                    className="input input-bordered input-sm h-[38px] border border-neutral w-full max-w-52"
                    readOnly
                  />
                  <div
                    tabIndex={0}
                    style={{
                      backgroundColor: accentColor.hex.toString(),
                    }}
                    className="max-h-[38px] max-w-[38px] h-full w-full border border-gray-300 rounded-lg aspect-square"
                  />
                  <div
                    tabIndex={0}
                    className="dropdown-content bg-base-100 -ml-11 -mt-56 rounded-box z-[5] w-72 p-2 shadow border border-gray-300"
                  >
                    <ColorPicker
                      color={accentColor}
                      onChange={setAccentColor}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:w-1/2 w-full gap-4">
              <div className="flex flex-col w-full gap-2">
                <p className="text-sm">Border color</p>
                <div
                  className="flex flex-row gap-2 dropdown dropdown-left"
                  onBlur={() => handleBorderColorChange(borderColor.hex)}
                >
                  <input
                    type="text"
                    value={borderColor.hex.toUpperCase()}
                    className="input input-bordered input-sm h-[38px] border border-neutral w-full max-w-52"
                    readOnly
                  />
                  <div
                    tabIndex={0}
                    style={{
                      backgroundColor: borderColor.hex.toString(),
                    }}
                    className="max-h-[38px] max-w-[38px] h-full w-full border border-gray-300 rounded-lg aspect-square"
                  />
                  <div
                    tabIndex={0}
                    className="dropdown-content bg-base-100 -mr-11 -mt-56 rounded-box z-[5] w-72 p-2 shadow border border-gray-300"
                  >
                    <ColorPicker
                      color={borderColor}
                      onChange={setBorderColor}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <p className="text-sm">Verified color</p>
                <div
                  className="flex flex-row gap-2 dropdown dropdown-left"
                  onBlur={() => handleVerifiedColorChange(verifiedColor.hex)}
                >
                  <input
                    type="text"
                    value={verifiedColor.hex.toUpperCase()}
                    className="input input-bordered input-sm h-[38px] border border-neutral w-full max-w-52"
                    readOnly
                  />
                  <div
                    tabIndex={0}
                    style={{
                      backgroundColor: verifiedColor.hex.toString(),
                    }}
                    className="max-h-[38px] max-w-[38px] h-full w-full border border-gray-300 rounded-lg aspect-square"
                  />
                  <div
                    tabIndex={0}
                    className="dropdown-content bg-base-100 rounded-box -mr-11 -mt-56 z-[5] w-72 p-2 shadow border border-gray-300"
                  >
                    <ColorPicker
                      color={verifiedColor}
                      onChange={setVerifiedColor}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          {" "}
          <p className="text-sm font-bold">Template</p>
          <select
            className="select select-bordered border-neutral w-full"
            value={activeProject?.template || "default"}
            onChange={(e) => {
              handleTemplateSelect(e.target.value as PopupTemplates);
            }}
          >
            <option value={"default"}>Select</option>
            {templateTypes.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full gap-2">
          {" "}
          <p className="text-sm font-bold">Screen alignment</p>
          <select
            className="select select-bordered border-neutral w-full"
            value={activeProject?.screen_alignment || "default"}
            onChange={(e) =>
              handleScreenAlignmentSelect(e.target.value as ScreenAlignment)
            }
          >
            <option value={"default"}>Select</option>
            {screenAlignmentTypes.map((screenAlignment, i) => (
              <option key={i} value={screenAlignment}>
                {screenAlignment}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
