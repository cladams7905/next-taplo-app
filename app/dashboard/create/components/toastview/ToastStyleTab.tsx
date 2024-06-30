"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, SetStateAction } from "react";
import { ColorPicker, IColor } from "react-color-palette";
import "react-color-palette/css";

export const ToastStyleTab = ({
  activeToast,
  backgroundToastColor,
  setBackgroundToastColor,
  textColor,
  setTextColor,
  accentColor,
  setAccentColor,
  verifiedColor,
  setVerifiedColor,
}: {
  activeToast: Tables<"Toasts"> | undefined;
  backgroundToastColor: IColor;
  setBackgroundToastColor: Dispatch<SetStateAction<IColor>>;
  textColor: IColor;
  setTextColor: Dispatch<SetStateAction<IColor>>;
  accentColor: IColor;
  setAccentColor: Dispatch<SetStateAction<IColor>>;
  verifiedColor: IColor;
  setVerifiedColor: Dispatch<SetStateAction<IColor>>;
}) => {
  return (
    <div className="flex flex-col w-2/3 gap-6">
      <p className="text-xl font-bold">Toast Style</p>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col w-1/2 gap-4">
          <div className="w-full">
            <p>Background color</p>
            <div className="flex flex-row gap-2 dropdown dropdown-right">
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
                className="dropdown-content bg-base-100 rounded-box z-[1] w-72 p-2 shadow border border-gray-300"
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
            <div className="flex flex-row gap-2 dropdown dropdown-right">
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
                className="dropdown-content bg-base-100 rounded-box z-[1] w-72 p-2 shadow border border-gray-300"
              >
                <ColorPicker color={textColor} onChange={setTextColor} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p>Accent color</p>
            <div className="flex flex-row gap-2 dropdown dropdown-right">
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
                className="dropdown-content bg-base-100 rounded-box z-[1] w-72 p-2 shadow border border-gray-300"
              >
                <ColorPicker color={accentColor} onChange={setAccentColor} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p>Verified color</p>
            <div className="flex flex-row gap-2 dropdown dropdown-right">
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
                className="dropdown-content bg-base-100 rounded-box z-[1] w-72 p-2 shadow border border-gray-300"
              >
                <ColorPicker
                  color={verifiedColor}
                  onChange={setVerifiedColor}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-4">
          <div className="w-full">
            {" "}
            <p>Screen alignment</p>
            <input
              type="text"
              placeholder={activeToast?.title ? activeToast.title : "New Toast"}
              className="input input-bordered border border-neutral w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
