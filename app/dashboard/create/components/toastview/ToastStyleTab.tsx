"use client";

import { showToastError } from "@/components/shared/showToast";
import { updateUserToast } from "@/lib/actions/userToasts";
import { ScreenAlignment } from "@/lib/enums";
import { Tables } from "@/supabase/types";
import { Undo2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ColorPicker, IColor } from "react-color-palette";
import "react-color-palette/css";

export const ToastStyleTab = ({
  activeToast,
  setActiveToast,
  backgroundToastColor,
  setBackgroundToastColor,
  textColor,
  setTextColor,
  accentColor,
  setAccentColor,
  verifiedColor,
  setVerifiedColor,
  borderColor,
  setBorderColor,
}: {
  activeToast: Tables<"Toasts"> | undefined;
  setActiveToast: Dispatch<SetStateAction<Tables<"Toasts"> | undefined>>;
  backgroundToastColor: IColor;
  setBackgroundToastColor: Dispatch<SetStateAction<IColor>>;
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
    if (activeToast) {
      setActiveToast({
        ...activeToast,
        bg_color: "#FFFFFF",
        text_color: "#172554",
        accent_color: "#6b7280",
        border_color: "#D1D3D7",
        verified_color: "#4ade80",
      });
      const { error } = await updateUserToast(activeToast.id, {
        ...activeToast,
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
    if (newColor !== activeToast?.bg_color && activeToast) {
      setActiveToast({
        ...activeToast,
        bg_color: newColor,
      });
      const { error } = await updateUserToast(activeToast.id, {
        ...activeToast,
        bg_color: newColor,
      });
      if (error) {
        showToastError(error);
      }
    }
  };

  const handleTextColorChange = async (newColor: string) => {
    if (newColor !== activeToast?.text_color && activeToast) {
      setActiveToast({
        ...activeToast,
        text_color: newColor,
      });
      const { error } = await updateUserToast(activeToast.id, {
        ...activeToast,
        text_color: newColor,
      });
      if (error) {
        showToastError(error);
      }
    }
  };

  const handleAccentColorChange = async (newColor: string) => {
    if (newColor !== activeToast?.accent_color && activeToast) {
      setActiveToast({
        ...activeToast,
        accent_color: newColor,
      });
      const { error } = await updateUserToast(activeToast.id, {
        ...activeToast,
        accent_color: newColor,
      });
      if (error) {
        showToastError(error);
      }
    }
  };

  const handleBorderColorChange = async (newColor: string) => {
    if (newColor !== activeToast?.border_color && activeToast) {
      setActiveToast({
        ...activeToast,
        border_color: newColor,
      });
      const { error } = await updateUserToast(activeToast.id, {
        ...activeToast,
        border_color: newColor,
      });
      if (error) {
        showToastError(error);
      }
    }
  };

  const handleVerifiedColorChange = async (newColor: string) => {
    if (newColor !== activeToast?.verified_color && activeToast) {
      setActiveToast({
        ...activeToast,
        verified_color: newColor,
      });
      const { error } = await updateUserToast(activeToast.id, {
        ...activeToast,
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
    if (activeToast && screenAlignment) {
      setActiveToast({
        ...activeToast,
        screen_alignment: screenAlignment,
      });
      const { error } = await updateUserToast(activeToast.id, {
        ...activeToast,
        screen_alignment: screenAlignment,
      });
      if (error) {
        showToastError(error);
      }
    }
  };

  return (
    <div className="flex flex-col w-2/3 gap-6">
      <div className="flex flex-row items-center w-full justify-between gap-4">
        <p className="text-xl font-bold">Toast Style</p>
        <div
          className="btn btn-ghost btn-sm"
          onClick={() => handleResetClick()}
        >
          <Undo2 height={18} width={18} /> Reset
        </div>
      </div>
      <div className="flex lg:flex-row md:flex-row flex-col lg:gap-10 gap-6">
        <div className="flex flex-col lg:w-1/2 w-full gap-4">
          <div className="w-full">
            <p>Background color</p>
            <div
              className="flex flex-row gap-2 dropdown dropdown-right"
              onBlur={() =>
                handleBackgroundColorChange(backgroundToastColor.hex)
              }
            >
              <input
                type="text"
                value={backgroundToastColor.hex.toUpperCase()}
                className="input input-bordered border border-neutral w-full max-w-52"
              />
              <div
                tabIndex={0}
                style={{
                  backgroundColor: backgroundToastColor.hex.toString(),
                }}
                className="max-h-[48px] max-w-[48px] h-full w-full border border-gray-300 rounded-lg aspect-square"
              />
              <div
                tabIndex={0}
                className="dropdown-content bg-base-100 lg:-ml-12 -mt-[80px] rounded-box z-[1] w-72 p-2 shadow border border-gray-300"
              >
                <ColorPicker
                  color={backgroundToastColor}
                  onChange={setBackgroundToastColor}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p>Text color</p>
            <div
              className="flex flex-row gap-2 dropdown dropdown-right"
              onBlur={() => handleTextColorChange(textColor.hex)}
            >
              <input
                type="text"
                value={textColor.hex.toUpperCase()}
                className="input input-bordered border border-neutral w-full max-w-52"
              />
              <div
                tabIndex={0}
                style={{
                  backgroundColor: textColor.hex.toString(),
                }}
                className="max-h-[48px] max-w-[48px] h-full w-full border border-gray-300 rounded-lg aspect-square"
              />
              <div
                tabIndex={0}
                className="dropdown-content bg-base-100 lg:-ml-12 -mt-[160px] rounded-box z-[1] w-72 p-2 shadow border border-gray-300"
              >
                <ColorPicker color={textColor} onChange={setTextColor} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p>Accent color</p>
            <div
              className="flex flex-row gap-2 dropdown dropdown-right"
              onBlur={() => handleAccentColorChange(accentColor.hex)}
            >
              <input
                type="text"
                value={accentColor.hex.toUpperCase()}
                className="input input-bordered border border-neutral w-full max-w-52"
              />
              <div
                tabIndex={0}
                style={{
                  backgroundColor: accentColor.hex.toString(),
                }}
                className="max-h-[48px] max-w-[48px] h-full w-full border border-gray-300 rounded-lg aspect-square"
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
          <div className="w-full">
            <p>Border color</p>
            <div
              className="flex flex-row gap-2 dropdown dropdown-right"
              onBlur={() => handleBorderColorChange(borderColor.hex)}
            >
              <input
                type="text"
                value={borderColor.hex.toUpperCase()}
                className="input input-bordered border border-neutral w-full max-w-52"
              />
              <div
                tabIndex={0}
                style={{
                  backgroundColor: borderColor.hex.toString(),
                }}
                className="max-h-[48px] max-w-[48px] h-full w-full border border-gray-300 rounded-lg aspect-square"
              />
              <div
                tabIndex={0}
                className="dropdown-content bg-base-100 lg:-ml-12 -mt-[80px] rounded-box z-[1] w-72 p-2 shadow border border-gray-300"
              >
                <ColorPicker color={borderColor} onChange={setBorderColor} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p>Verified color</p>
            <div
              className="flex flex-row gap-2 dropdown dropdown-right"
              onBlur={() => handleVerifiedColorChange(verifiedColor.hex)}
            >
              <input
                type="text"
                value={verifiedColor.hex.toUpperCase()}
                className="input input-bordered border border-neutral w-full max-w-52"
              />
              <div
                tabIndex={0}
                style={{
                  backgroundColor: verifiedColor.hex.toString(),
                }}
                className="max-h-[48px] max-w-[48px] h-full w-full border border-gray-300 rounded-lg aspect-square"
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
      <div className="w-full lg:max-w-[265px] mt-8">
        {" "}
        <p>Screen alignment</p>
        <select
          className="select select-bordered border-neutral w-full"
          value={activeToast?.screen_alignment || "default"}
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
