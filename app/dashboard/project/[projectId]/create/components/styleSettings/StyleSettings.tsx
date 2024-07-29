"use client";

import { showToastError } from "@/components/shared/showToast";
import { updateProject } from "@/lib/actions/projects";
import { ScreenAlignment } from "@/lib/enums";
import { Tables } from "@/supabase/types";
import { Undo2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
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
}) => {
  const screenAlignmentTypes = Object.values(ScreenAlignment);

  const handleResetClick = async () => {
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
  };

  const handleBackgroundColorChange = async (newColor: string) => {
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
  };

  const handleTextColorChange = async (newColor: string) => {
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
  };

  const handleAccentColorChange = async (newColor: string) => {
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
  };

  const handleBorderColorChange = async (newColor: string) => {
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
  };

  const handleVerifiedColorChange = async (newColor: string) => {
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
  };

  const handleScreenAlignmentSelect = async (
    screenAlignment: ScreenAlignment
  ) => {
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
  };

  return (
    <div className="flex flex-col mt-6 gap-6">
      <div className="flex flex-col gap-6 rounded-lg border border-base-300 px-5 pt-3 pb-5">
        <div className="flex flex-row items-center w-full justify-between">
          <p className="text-sm font-bold">Colors</p>
          <div
            className="btn btn-sm lg:mt-0 lg:w-auto w-full btn-ghost text-xs"
            onClick={() => handleResetClick()}
          >
            <Undo2 height={18} width={18} /> Reset
          </div>
        </div>
        <div className="flex lg:flex-row md:flex-row flex-col lg:gap-10 gap-6">
          <div className="flex flex-col lg:w-1/2 w-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <p className="text-sm">Background color</p>
              <div
                className="flex flex-row gap-2 dropdown dropdown-right"
                onBlur={() => handleBackgroundColorChange(backgroundColor.hex)}
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
                  className="dropdown-content bg-base-100 lg:-ml-12 -mt-[80px] rounded-box z-[1] w-72 p-2 shadow border border-gray-300"
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
                  className="dropdown-content bg-base-100 lg:-ml-12 -mt-[160px] rounded-box z-[1] w-72 p-2 shadow border border-gray-300"
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
                  className="dropdown-content bg-base-100 lg:-ml-12 -mt-[200px] rounded-box z-[1] w-72 p-2 shadow border border-gray-300"
                >
                  <ColorPicker color={accentColor} onChange={setAccentColor} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:w-1/2 w-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <p className="text-sm">Border color</p>
              <div
                className="flex flex-row gap-2 dropdown dropdown-right"
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
                  className="dropdown-content bg-base-100 lg:-ml-12 -mt-[80px] rounded-box z-[1] w-72 p-2 shadow border border-gray-300"
                >
                  <ColorPicker color={borderColor} onChange={setBorderColor} />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <p className="text-sm">Verified color</p>
              <div
                className="flex flex-row gap-2 dropdown dropdown-right"
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
                  className="dropdown-content bg-base-100 rounded-box lg:-ml-12 -mt-[120px] z-[1] w-72 p-2 shadow border border-gray-300"
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
  );
};
