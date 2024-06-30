"use client";

import { Tables } from "@/supabase/types";
import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import "animate.css";
import { IColor } from "react-color-palette";

export default function ToastPopup({
  activeToast,
  backgroundToastColor,
  textColor,
  accentColor,
  verifiedColor,
}: {
  activeToast: Tables<"Toasts">;
  backgroundToastColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
}) {
  const [isFirstClicked, setIsFirstClicked] = useState(false);
  useEffect(() => {
    setIsFirstClicked(true);
    setTimeout(() => {
      setIsFirstClicked(false);
    }, 1000);
  }, [activeToast]);
  return (
    <div
      style={{
        backgroundColor: backgroundToastColor.hex.toString(),
      }}
      className={`relative w-full max-w-72 rounded-lg border border-neutral shadow-xl p-2 pl-4 ${
        isFirstClicked && "animate__animated animate__bounceIn"
      }`}
    >
      <div
        style={{
          color: accentColor.hex.toString(),
        }}
        className="flex flex-row items-center gap-1 text-xs"
      >
        20 min ago |
        <BadgeCheck fill={verifiedColor.hex.toString()} color="#FFFFFF" />
        Verified Purchase
      </div>
      <button className="btn btn-sm btn-circle btn-ghost !border-none !outline-none absolute right-1 top-1 text-base-content">
        ✕
      </button>
      <p
        style={{
          color: textColor.hex.toString(),
        }}
        className="text-sm mt-1"
      >
        {activeToast.content}
      </p>
    </div>
  );
}
