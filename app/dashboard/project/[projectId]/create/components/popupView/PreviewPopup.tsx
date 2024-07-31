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
}: {
  activeProject: Tables<"Projects">;
  events: Tables<"Events">[];
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
}) {
  const [animation, setAnimation] = useState("animate-slideIn");
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateAnimation = () => {
      setAnimation((prevAnimation) => {
        if (prevAnimation === "animate-slideIn") {
          setTimeout(() => setIsVisible(false), 500); // Duration of slideOut animation
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
      animation === "animate-slideIn" ? 5000 : 750
    );

    return () => {
      // Clear the interval when the component is unmounted
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [animation]); // Depend on the animation state

  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`flex w-fit h-fit pr-6 pl-3 max-w-[320px] rounded-lg border shadow-md p-2 ${animation}`}
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
        <div className="flex flex-col w-full">
          <div
            style={{
              color: accentColor.hex.toString(),
            }}
            className="flex flex-row items-center gap-1 text-xs"
          >
            <p>20 min ago</p>
            <p className="mx-[2px]">|</p>
            <div className="flex items-center">
              {" "}
              <BadgeCheck
                fill={verifiedColor.hex.toString()}
                color={backgroundColor.hex.toString()}
              />
              Verified Purchase
            </div>
          </div>
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14px] mt-1"
          >
            {/* {activeProduct && activeProduct.name && isShowProductsChecked ? (
              <>
                {`Someone in USA purchased `}
                <a
                  className="link font-bold cursor-pointer"
                  href={activeProduct.link || undefined}
                  target="_blank"
                >
                  {activeProduct.name}
                  {activeProduct.price && ` ($${activeProduct.price})`}
                </a>
                {`.`}
              </>
            ) : (
              "Test"
            )} */}
          </p>
        </div>
      </div>
    </div>
  );
}
