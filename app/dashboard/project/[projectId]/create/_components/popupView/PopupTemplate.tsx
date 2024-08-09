"use client";

import { Tables } from "@/supabase/types";
import { BadgeCheck, ImageIcon, ShoppingBasket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IColor } from "react-color-palette";
import confetti from "canvas-confetti";
import Image from "next/image";
import { TemplateTypes } from "@/lib/enums";
import { hexToRgba } from "@/lib/actions";

export default function PopupTemplate({
  activeProject,
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  displayTime,
  shouldAnimate,
}: {
  activeProject: Tables<"Projects">;
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  displayTime?: number;
  shouldAnimate?: boolean;
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

    const getDisplayTime = () => {
      if (displayTime) {
        return displayTime;
      } else {
        return 5000;
      }
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
  }, [animation, displayTime]);

  switch (activeProject.template) {
    case TemplateTypes.SmPopup:
      return (
        <SmallPopupTemplate
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          borderColor={borderColor}
          animation={animation}
          shouldAnimate={shouldAnimate}
        />
      );
    case TemplateTypes.SmPopupNoImg:
      return (
        <SmallPopupNoImageTemplate
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          borderColor={borderColor}
          animation={animation}
          shouldAnimate={shouldAnimate}
        />
      );
    case TemplateTypes.LgPopup:
      return (
        <LargePopupTemplate
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          borderColor={borderColor}
          animation={animation}
          shouldAnimate={shouldAnimate}
        />
      );
    case TemplateTypes.LgPopupNoImg:
      return (
        <LargePopupNoImageTemplate
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          borderColor={borderColor}
          animation={animation}
          shouldAnimate={shouldAnimate}
        />
      );
    case TemplateTypes.Card:
      return <></>;
    case TemplateTypes.CardNoImg:
      return <></>;
    case TemplateTypes.Banner:
      return <></>;
    case TemplateTypes.BannerNoImg:
      return <></>;
    default:
      <>Unhandled template type</>;
  }
}

const SmallPopupTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  animation,
  shouldAnimate,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  animation?: string;
  shouldAnimate?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`flex flex-row w-fit h-fit pr-6 pl-4 max-w-[360px] rounded-lg border shadow-md py-4 mx-4 gap-3 ${
        shouldAnimate && animation
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="rounded-full flex items-center justify-center w-16 h-16 min-w-16 bg-purple-50 aspect-square">
          <ImageIcon color={"#d8b4fe"} height={18} width={18} />
        </div>
      </div>
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full gap-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14px] leading-5"
          >
            Jamie in Raleigh, North Carolina, USA made a{" "}
            <span className="font-bold">$44</span> purchase.
          </p>
          <div
            className="text-xs flex items-center gap-4"
            style={{
              color: accentColor.hex.toString(),
            }}
          >
            12 min ago
            <p
              className="flex items-center gap-[3px] text-[11px]"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Verified by TapInsight
              <BadgeCheck
                width={22}
                height={22}
                fill={accentColor.hex.toString()}
                color={backgroundColor.hex.toString()}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SmallPopupNoImageTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  animation,
  shouldAnimate,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  animation?: string;
  shouldAnimate?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`flex w-fit h-fit pr-6 pl-4 max-w-[320px] rounded-lg border shadow-md py-4 ${
        shouldAnimate && animation
      }`}
    >
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full gap-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14px] leading-5"
          >
            Jamie in Raleigh, North Carolina, USA made a{" "}
            <span className="font-bold">$44</span> purchase.
          </p>
          <div
            className="text-xs flex items-center gap-4"
            style={{
              color: accentColor.hex.toString(),
            }}
          >
            12 min ago
            <p
              className="flex items-center gap-[3px] text-[11px]"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Verified by TapInsight
              <BadgeCheck
                width={22}
                height={22}
                fill={accentColor.hex.toString()}
                color={backgroundColor.hex.toString()}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LargePopupTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  animation,
  shouldAnimate,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  animation?: string;
  shouldAnimate?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row w-fit h-fit min-h-[110px] max-w-[380px] rounded-lg border shadow-md gap-3 ${
        shouldAnimate && animation
      }`}
    >
      <div className="flex items-center justify-center h-full w-full max-w-[110px]">
        <div
          className="flex h-full w-full items-center justify-center aspect-square rounded-l-lg"
          style={{
            backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
          }}
        >
          <ShoppingBasket
            color={hexToRgba(accentColor.hex.toString(), 0.75)}
            height={32}
            width={32}
          />
        </div>
      </div>
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full gap-2 mx-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[15px] leading-5"
          >
            Jamie in Raleigh, North Carolina, USA purchased{" "}
            <span
              className="font-bold underline"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Swim shoes
            </span>
            .
          </p>
          <div
            className="text-xs flex items-center gap-4"
            style={{
              color: hexToRgba(textColor.hex.toString(), 0.6),
            }}
          >
            12 min ago
            <p
              className="absolute bottom-1 right-1 flex items-center gap-[3px] text-[10px]"
              style={{
                color: hexToRgba(textColor.hex.toString(), 0.6),
              }}
            >
              Verified by TapInsight
              <BadgeCheck
                width={18}
                height={18}
                fill={accentColor.hex.toString()}
                color={backgroundColor.hex.toString()}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LargePopupNoImageTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  animation,
  shouldAnimate,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  animation?: string;
  shouldAnimate?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row w-fit h-fit min-h-[100px] max-w-[340px] rounded-lg border shadow-md gap-3 ${
        shouldAnimate && animation
      }`}
    >
      <div className="flex w-full gap-4 items-center mx-6">
        <div className="flex flex-col w-full gap-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[15px] leading-5"
          >
            {" "}
            Jamie in Raleigh, North Carolina, USA made a purchase.
          </p>
          <div
            className="text-xs flex items-center gap-4"
            style={{
              color: accentColor.hex.toString(),
            }}
          >
            12 min ago
            <p
              className="absolute bottom-2 right-2 flex items-center gap-[3px] text-[11px]"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Verified by TapInsight
              <BadgeCheck
                width={22}
                height={22}
                fill={accentColor.hex.toString()}
                color={backgroundColor.hex.toString()}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
