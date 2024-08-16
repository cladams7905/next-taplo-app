"use client";

import { Tables } from "@/supabase/types";
import { BadgeCheck, ShoppingBasket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IColor } from "react-color-palette";
import confetti from "canvas-confetti";
import Image from "next/image";
import "animate.css";
import { ScreenAlignment, TemplateTypes } from "@/lib/enums";
import { hexToRgba } from "@/lib/actions";

export default function PopupTemplate({
  activeProject,
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  displayTime,
  isPreviewMode,
  bounceAnimation,
}: {
  activeProject: Tables<"Projects">;
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  displayTime?: number;
  isPreviewMode?: boolean;
  bounceAnimation?: boolean;
}) {
  const [animation, setAnimation] = useState(
    activeProject.screen_alignment === ScreenAlignment.BottomLeft ||
      activeProject.screen_alignment === ScreenAlignment.TopLeft
      ? "animate-slideInLeft"
      : activeProject.screen_alignment === ScreenAlignment.BottomRight ||
        activeProject.screen_alignment === ScreenAlignment.TopRight
      ? "animate-slideInRight"
      : activeProject.screen_alignment === ScreenAlignment.TopCenter
      ? "animate-slideInTop"
      : "animate-slideInBottom"
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPreviewMode) return;

    const updateAnimation = () => {
      setAnimation((prevAnimation) => {
        const newAnimation = determineAnimationDirection(prevAnimation);
        return newAnimation;
      });
    };

    const determineAnimationDirection = (prevAnimation: string) => {
      if (
        activeProject.screen_alignment === ScreenAlignment.BottomLeft ||
        activeProject.screen_alignment === ScreenAlignment.TopLeft
      ) {
        return getAnimation(prevAnimation, "Left");
      } else if (
        activeProject.screen_alignment === ScreenAlignment.BottomRight ||
        activeProject.screen_alignment === ScreenAlignment.TopRight
      ) {
        return getAnimation(prevAnimation, "Right");
      } else if (activeProject.screen_alignment === ScreenAlignment.TopCenter) {
        return getAnimation(prevAnimation, "Top");
      } else {
        return getAnimation(prevAnimation, "Bottom");
      }
    };

    const getAnimation = (prevAnimation: string, orientation: string) => {
      if (prevAnimation === `animate-slideIn${orientation}`) {
        return `animate-slideOut${orientation}`;
      } else {
        return `animate-slideIn${orientation}`;
      }
    };

    const getDisplayTime = () => displayTime || 5000;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(
      updateAnimation,
      animation.includes("In") ? getDisplayTime() : 750
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPreviewMode, animation, displayTime, activeProject.screen_alignment]);

  switch (activeProject.template) {
    case TemplateTypes.SmPopup:
      return (
        <SmallPopupTemplate
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          borderColor={borderColor}
          animation={animation}
          isPreviewMode={isPreviewMode}
          bounceAnimation={bounceAnimation}
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
          isPreviewMode={isPreviewMode}
          bounceAnimation={bounceAnimation}
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
          isPreviewMode={isPreviewMode}
          bounceAnimation={bounceAnimation}
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
          isPreviewMode={isPreviewMode}
          bounceAnimation={bounceAnimation}
        />
      );
    case TemplateTypes.Card:
      return (
        <CardTemplate
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          borderColor={borderColor}
          animation={animation}
          isPreviewMode={isPreviewMode}
          bounceAnimation={bounceAnimation}
        />
      );
    case TemplateTypes.CardNoImg:
      return (
        <CardNoImageTemplate
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          borderColor={borderColor}
          animation={animation}
          isPreviewMode={isPreviewMode}
          bounceAnimation={bounceAnimation}
        />
      );
    case TemplateTypes.Banner:
      return (
        <BannerTemplate
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          borderColor={borderColor}
          animation={animation}
          isPreviewMode={isPreviewMode}
          bounceAnimation={bounceAnimation}
        />
      );
    case TemplateTypes.BannerNoImg:
      return (
        <BannerNoImageTemplate
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          borderColor={borderColor}
          animation={animation}
          isPreviewMode={isPreviewMode}
          bounceAnimation={bounceAnimation}
        />
      );
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
  isPreviewMode,
  bounceAnimation,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  animation?: string;
  isPreviewMode?: boolean;
  bounceAnimation?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row w-fit h-fit pr-6 pl-4 max-w-[330px] rounded-lg border shadow-lg py-4 gap-3 ${
        isPreviewMode ? animation : ""
      } ${
        bounceAnimation
          ? "animate__animated animate__pulse animate__faster"
          : ""
      }`}
    >
      <div className="flex items-center justify-center">
        <div
          className="rounded-full flex items-center justify-center w-16 h-16 min-w-16 aspect-square"
          style={{
            backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
          }}
        >
          <ShoppingBasket
            color={hexToRgba(accentColor.hex.toString(), 0.85)}
            height={24}
            width={24}
          />
        </div>
      </div>
      <div className="flex w-full gap-4 items-center ml-2">
        <div className="flex flex-col w-full gap-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[13px] leading-5"
          >
            Jamie in Raleigh, North Carolina, USA purchased{" "}
            <span
              className="font-bold underline"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Running shoes
            </span>
            .
          </p>
          <div
            className="text-xs flex items-center gap-4"
            style={{
              color: hexToRgba(textColor.hex.toString(), 0.65),
            }}
          >
            12 min ago
            <p
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10px]"
              style={{
                color: hexToRgba(textColor.hex.toString(), 0.65),
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

const SmallPopupNoImageTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  animation,
  isPreviewMode,
  bounceAnimation,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  animation?: string;
  isPreviewMode?: boolean;
  bounceAnimation?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex w-fit h-fit pr-6 pl-4 max-w-[300px] rounded-lg border shadow-lg py-4 ${
        isPreviewMode ? animation : ""
      } ${
        bounceAnimation
          ? "animate__animated animate__pulse animate__faster"
          : ""
      }`}
    >
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full gap-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[13px] leading-5"
          >
            Jamie in Raleigh, North Carolina, USA purchased{" "}
            <span
              className="font-bold"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Running shoes
            </span>
            .
          </p>
          <div
            className="text-xs flex items-center gap-4"
            style={{
              color: hexToRgba(textColor.hex.toString(), 0.65),
            }}
          >
            12 min ago
            <p
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10px]"
              style={{
                color: hexToRgba(textColor.hex.toString(), 0.65),
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

const LargePopupTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  animation,
  isPreviewMode,
  bounceAnimation,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  animation?: string;
  isPreviewMode?: boolean;
  bounceAnimation?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row w-fit h-fit min-h-[110px] max-w-[380px] rounded-lg border shadow-lg gap-3 ${
        isPreviewMode ? animation : ""
      } ${
        bounceAnimation
          ? "animate__animated animate__pulse animate__faster"
          : ""
      }`}
    >
      <div className="flex items-center justify-center h-full w-full max-w-[110px]">
        <div
          className="flex h-full w-full items-center justify-center aspect-square rounded-l-lg outline-1 outline"
          style={{
            backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
            outlineColor: hexToRgba(accentColor.hex.toString(), 0.2),
          }}
        >
          <ShoppingBasket
            color={hexToRgba(accentColor.hex.toString(), 0.85)}
            height={32}
            width={32}
          />
        </div>
      </div>
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full gap-[6px] mx-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14px] leading-5"
          >
            Jamie in Raleigh, North Carolina, USA purchased{" "}
            <span
              className="font-bold underline"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Running shoes
            </span>
            .
          </p>
          <div
            className="text-[13px] flex items-center gap-4"
            style={{
              color: hexToRgba(textColor.hex.toString(), 0.65),
            }}
          >
            12 min ago
            <p
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10.5px]"
              style={{
                color: hexToRgba(textColor.hex.toString(), 0.65),
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
  isPreviewMode,
  bounceAnimation,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  animation?: string;
  isPreviewMode?: boolean;
  bounceAnimation?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row w-fit h-fit min-h-[110px] max-w-[340px] rounded-lg border shadow-lg gap-3 ${
        isPreviewMode ? animation : ""
      } ${
        bounceAnimation
          ? "animate__animated animate__pulse animate__faster"
          : ""
      }`}
    >
      <div className="flex w-full gap-3 items-center mx-3">
        <div className="flex flex-col w-full gap-[6px] mx-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14px] leading-5"
          >
            Jamie in Raleigh, North Carolina, USA purchased{" "}
            <span
              className="font-bold underline"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Running shoes
            </span>
            .
          </p>
          <div
            className="text-[13px] flex items-center"
            style={{
              color: hexToRgba(textColor.hex.toString(), 0.65),
            }}
          >
            12 min ago
            <p
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[11px]"
              style={{
                color: hexToRgba(textColor.hex.toString(), 0.65),
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

const CardTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  animation,
  isPreviewMode,
  bounceAnimation,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  animation?: string;
  isPreviewMode?: boolean;
  bounceAnimation?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-col w-fit h-fit min-h-[270px] max-w-[280px] rounded-lg border shadow-lg gap-3 ${
        isPreviewMode ? animation : ""
      } ${
        bounceAnimation
          ? "animate__animated animate__pulse animate__faster"
          : ""
      }`}
    >
      <div className="flex items-center justify-center h-full w-full">
        <div
          className="flex h-full w-full max-h-[160px] items-center justify-center aspect-square rounded-t-lg outline-1 outline"
          style={{
            backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
            outlineColor: hexToRgba(accentColor.hex.toString(), 0.2),
          }}
        >
          <ShoppingBasket
            color={hexToRgba(accentColor.hex.toString(), 0.85)}
            height={36}
            width={36}
          />
        </div>
      </div>
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full gap-[4px] mx-2 p-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14px] leading-5"
          >
            Jamie in Raleigh, North Carolina, USA purchased{" "}
            <span
              className="font-bold underline"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Running shoes
            </span>
            .
          </p>
          <div
            className="text-[12px] flex items-center gap-4"
            style={{
              color: hexToRgba(textColor.hex.toString(), 0.65),
            }}
          >
            12 min ago
            <p
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10.5px]"
              style={{
                color: hexToRgba(textColor.hex.toString(), 0.65),
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

const CardNoImageTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  animation,
  isPreviewMode,
  bounceAnimation,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  animation?: string;
  isPreviewMode?: boolean;
  bounceAnimation?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-col w-fit h-fit min-h-[160px] items-center justify-center max-w-[280px] rounded-lg border shadow-lg gap-3 ${
        isPreviewMode ? animation : ""
      } ${
        bounceAnimation
          ? "animate__animated animate__pulse animate__faster"
          : ""
      }`}
    >
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full text-center items-center justify-center gap-[4px] px-5 py-3">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14px] leading-5"
          >
            Jamie in Raleigh, North Carolina, USA purchased{" "}
            <span
              className="font-bold underline"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Running shoes
            </span>
            .
          </p>
          <div
            className="text-[12px] flex items-center gap-4"
            style={{
              color: hexToRgba(textColor.hex.toString(), 0.65),
            }}
          >
            12 min ago
            <p
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10.5px]"
              style={{
                color: hexToRgba(textColor.hex.toString(), 0.65),
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

const BannerTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  animation,
  isPreviewMode,
  bounceAnimation,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  animation?: string;
  isPreviewMode?: boolean;
  bounceAnimation?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row px-5 h-fit min-h-[60px] items-center justify-center max-w-screen-md rounded-lg border shadow-lg ${
        isPreviewMode ? animation : ""
      } ${
        bounceAnimation
          ? "animate__animated animate__pulse animate__faster"
          : ""
      }`}
    >
      <div className="flex items-center justify-center">
        <div
          className="rounded-full flex items-center justify-center w-12 h-12 min-w-12 aspect-square"
          style={{
            backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
          }}
        >
          <ShoppingBasket
            color={hexToRgba(accentColor.hex.toString(), 0.85)}
            height={20}
            width={20}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full px-5 py-2 gap-1">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14px] leading-[18px] mt-2"
          >
            Jamie in Raleigh, North Carolina, USA purchased{" "}
            <span
              className="font-bold underline"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Running shoes
            </span>
            .
          </p>
          <div
            className={`flex flex-row gap-1 text-[12px]`}
            style={{
              color: hexToRgba(textColor.hex.toString(), 0.65),
            }}
          >
            12 min ago
            <p>|</p>
            <p
              className="flex items-center gap-[3px]"
              style={{
                color: hexToRgba(textColor.hex.toString(), 0.65),
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

const BannerNoImageTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  animation,
  isPreviewMode,
  bounceAnimation,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  animation?: string;
  isPreviewMode?: boolean;
  bounceAnimation?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-col h-fit min-h-[60px] items-center justify-center max-w-screen-md rounded-lg border shadow-lg ${
        isPreviewMode ? animation : ""
      } ${
        bounceAnimation
          ? "animate__animated animate__pulse animate__faster"
          : ""
      }`}
    >
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full px-5 py-2 gap-1">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14px]"
          >
            Jamie in Raleigh, North Carolina, USA purchased{" "}
            <span
              className="font-bold underline"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Running shoes
            </span>
            .
          </p>
          <div
            className={`flex flex-row gap-1 text-[12px] ${
              isPreviewMode && "-mt-2"
            }`}
            style={{
              color: hexToRgba(textColor.hex.toString(), 0.65),
            }}
          >
            12 min ago
            <p>|</p>
            <p
              className="flex items-center gap-[3px]"
              style={{
                color: hexToRgba(textColor.hex.toString(), 0.65),
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
