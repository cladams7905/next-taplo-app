"use client";

import { Tables } from "@/supabase/types";
import { BadgeCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IColor } from "react-color-palette";
import confetti from "canvas-confetti";
import Image from "next/image";

export default function PreviewPopup({
  activeProject,
  events,
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
  displayTime,
}: {
  activeProject: Tables<"Projects">;
  events: Tables<"Events">[];
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
  displayTime: number;
}) {
  const [animation, setAnimation] = useState("animate-slideIn");
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateAnimation = () => {
      setAnimation((prevAnimation) => {
        if (prevAnimation === "animate-slideIn") {
          setTimeout(() => setIsVisible(false), 500);
          return "animate-slideOut";
        } else {
          setIsVisible(true);
          return "animate-slideIn";
        }
      });
    };

    // Clear the previous interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set a new interval based on the current animation state
    intervalRef.current = setInterval(
      updateAnimation,
      animation === "animate-slideIn" ? getDisplayTime() : 750
    );

    return () => {
      // Clear the interval when the component is unmounted
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [animation]);

  const getDisplayTime = () => {
    if (displayTime) {
      return displayTime;
    } else {
      return 5000;
    }
  };

  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`flex w-fit h-fit pr-6 pl-4 max-w-[320px] rounded-lg border shadow-md py-4 ${animation}`}
    >
      <div className="flex w-full gap-4 items-center">
        {/* {productImageSrc !== "" && (
          <div
            style={{
              backgroundColor:
                !productImageSrc || productImageSrc === ""
                  ? accentColor.hex.toString()
                  : "#FFFFFF",
            }}
            className={`flex min-w-[48px] max-h-[48px] aspect-square rounded-lg`}
          >
            <Image
              width={48}
              height={48}
              alt="Shoes"
              className="rounded-lg bg-white"
              src={productImageSrc}
            />
          </div>
        )} */}
        <div className="flex flex-col w-full gap-2">
          <div
            style={{
              color: accentColor.hex.toString(),
            }}
            className="flex flex-row items-center gap-2 text-xs"
          >
            <div className="flex items-center gap-1">
              Verified by Stripe
              <BadgeCheck
                fill={verifiedColor.hex.toString()}
                color={backgroundColor.hex.toString()}
              />
            </div>
          </div>
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14px] leading-5"
          >
            Someone in Seattle, Washington, USA purchased a bike helmet.
          </p>
          <p
            className="text-xs"
            style={{
              color: accentColor.hex.toString(),
            }}
          >
            20 min ago
          </p>
        </div>
      </div>
    </div>
  );
}
