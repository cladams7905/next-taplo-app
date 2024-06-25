"use client";

import { Tables } from "@/lib/supabase/types";
import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import "animate.css";

export default function ToastPopup({
  activeToast,
}: {
  activeToast: Tables<"Toasts">;
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
      className={`bg-white relative w-full max-w-72 rounded-lg border border-neutral shadow-xl p-2 pl-4 ${
        isFirstClicked && "animate__animated animate__bounceIn"
      }`}
    >
      <div className="flex flex-row items-center gap-1 text-gray-500 text-xs">
        20 min ago |
        <BadgeCheck fill="oklch(var(--su))" color="#FFFFFF" />
        Verified Purchase
      </div>
      <button className="btn btn-sm btn-circle btn-ghost !border-none !outline-none absolute right-1 top-1 text-base-content">
        ✕
      </button>
      <p className="text-sm mt-1">
        Anonymous just purchased{" "}
        <span className="font-bold link">Tennis shoes ($20)</span>.
      </p>
      {/* <div className="flex justify-end items-center gap-2">
        <div className="flex items-center shadow-sm border border-gray-200 rounded-lg px-2 py-1">
          🎉 1
        </div>
        <div className="flex items-center shadow-sm border border-gray-200 rounded-lg px-2 py-1">
          👏 2
        </div>
      </div> */}
    </div>
  );
}
