"use client";

import {
  BadgeCheck,
  Boxes,
  ShoppingBag,
  ShoppingCart,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EventType, ScreenAlignment, TemplateTypes } from "@/lib/enums";
import { hexToRgba, replaceVariablesInContentBody } from "@/lib/actions";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import "animate.css";
import Image from "next/image";
import { Tables } from "@/supabase/types";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function PopupTemplate({
  isAnimatePulse,
  isPreviewMode,
}: {
  isAnimatePulse?: boolean;
  isPreviewMode: boolean;
}) {
  const {
    activeProject,
    activeEvent,
    activeProduct,
    backgroundColor,
    accentColor,
    events,
    displayTime,
  } = useProjectContext();

  /**
   * This is the content body of the popup displayed in the popup viewer (NOT during preview mode).
   */
  const contentBodyHtml = replaceVariablesInContentBody(
    activeProduct,
    backgroundColor.hex.toString(),
    accentColor.hex.toString(),
    activeEvent?.content_body,
    true //isPopup = true
  );

  /**
   * This event changes on every animation during preview mode to create a
   * cycling effect through different events.
   */
  const [previewEvent, setPreviewEvent] = useState<
    Tables<"Events"> | undefined
  >(activeEvent);

  /**
   * This is the content body of the displayed event during preview mode.
   */
  const [previewContentBody, setPreviewContentBody] =
    useState<string>(contentBodyHtml);

  /**
   * Whenever preview mode is toggled on or off, this guarantees that the active event
   * will be the first event shown in preview mode.
   */
  useEffect(() => {
    setPreviewEvent(activeEvent);
  }, [isPreviewMode, activeEvent]);

  /**
   * Whenever a preview event changes, this changes the corresponding content body
   * of the new preview event.
   */
  useEffect(() => {
    setPreviewContentBody(
      replaceVariablesInContentBody(
        activeProduct,
        backgroundColor.hex.toString(),
        accentColor.hex.toString(),
        previewEvent?.content_body,
        true //isPopup = true
      )
    );
  }, [previewEvent, accentColor, activeProduct, backgroundColor]);

  /**
   * This check determines whether an event should display a product's image if an image is available.
   * If it is in preview mode, then it should check according to the preview event.
   * If it is not in preview mode, then it should check the active event.
   * @returns boolean
   */
  const shouldDisplayImage = () => {
    return (
      (!isPreviewMode &&
        activeEvent?.event_type !== EventType.ActiveVisitors) ||
      (isPreviewMode && previewEvent?.event_type !== EventType.ActiveVisitors)
    );
  };

  /**
   * This is the animation that is played during preview mode to show a slide in/out effect.
   */
  const [animation, setAnimation] = useState(
    activeProject.screen_alignment === ScreenAlignment.BottomLeft ||
      activeProject.screen_alignment === ScreenAlignment.TopLeft
      ? "animate-twSlideInLeft"
      : activeProject.screen_alignment === ScreenAlignment.BottomRight ||
        activeProject.screen_alignment === ScreenAlignment.TopRight
      ? "animate-twSlideInRight"
      : activeProject.screen_alignment === ScreenAlignment.TopCenter
      ? "animate-twSlideInTop"
      : "animate-twSlideInBottom"
  );

  /**
   * The interval allows the updateAnimation function to trigger in a loop every [displayTime] seconds.
   */
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * This controls the updating of the preview animation based on the time interval provided.
   */
  useEffect(() => {
    if (!isPreviewMode) return;

    const updateAnimation = () => {
      if (animation.includes("Out")) {
        setPreviewEvent((prevEvent) => {
          const currentIndex = events.findIndex(
            (event) => event.id === prevEvent?.id
          );
          const nextIndex = (currentIndex + 1) % events.length;
          return events[nextIndex];
        });
      }
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
      if (prevAnimation === `animate-twSlideIn${orientation}`) {
        return `animate-twSlideOut${orientation}`;
      } else {
        return `animate-twSlideIn${orientation}`;
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
  }, [
    isPreviewMode,
    events,
    animation,
    displayTime,
    activeProject.screen_alignment,
  ]);

  switch (activeProject.template) {
    case TemplateTypes.SmPopup:
      return (
        <div className="flex flex-col items-center gap-2 -mb-4">
          <SmallPopupTemplate
            previewEvent={previewEvent}
            animation={animation}
            isAnimatePulse={isAnimatePulse}
            isPreviewMode={isPreviewMode}
            contentBody={contentBodyHtml}
            previewContentBody={previewContentBody}
            shouldDisplayImage={shouldDisplayImage}
          />
          <div className="text-xs flex items-center gap-2">
            <InfoCircledIcon width={13} height={13} /> Demo data only
          </div>
        </div>
      );
    case TemplateTypes.SmPopupNoImg:
      return (
        <div className="flex flex-col items-center gap-2 -mb-4">
          <SmallPopupNoImageTemplate
            animation={animation}
            isAnimatePulse={isAnimatePulse}
            isPreviewMode={isPreviewMode}
            contentBody={contentBodyHtml}
            previewContentBody={previewContentBody}
          />
          <div className="text-xs flex items-center gap-2">
            <InfoCircledIcon width={13} height={13} /> Demo data only
          </div>
        </div>
      );
    case TemplateTypes.LgPopup:
      return (
        <div className="flex flex-col items-center gap-2 -mb-4">
          <LargePopupTemplate
            previewEvent={previewEvent}
            animation={animation}
            isAnimatePulse={isAnimatePulse}
            isPreviewMode={isPreviewMode}
            contentBody={contentBodyHtml}
            previewContentBody={previewContentBody}
            shouldDisplayImage={shouldDisplayImage}
          />
          <div className="text-xs flex items-center gap-2">
            <InfoCircledIcon width={13} height={13} /> Demo data only
          </div>
        </div>
      );
    case TemplateTypes.LgPopupNoImg:
      return (
        <div className="flex flex-col items-center gap-2 -mb-4">
          <LargePopupNoImageTemplate
            animation={animation}
            isAnimatePulse={isAnimatePulse}
            isPreviewMode={isPreviewMode}
            contentBody={contentBodyHtml}
            previewContentBody={previewContentBody}
          />
          <div className="text-xs flex items-center gap-2">
            <InfoCircledIcon width={13} height={13} /> Demo data only
          </div>
        </div>
      );
    case TemplateTypes.Card:
      return (
        <div className="flex flex-col items-center gap-2 -mb-4">
          <CardTemplate
            previewEvent={previewEvent}
            animation={animation}
            isAnimatePulse={isAnimatePulse}
            isPreviewMode={isPreviewMode}
            contentBody={contentBodyHtml}
            previewContentBody={previewContentBody}
            shouldDisplayImage={shouldDisplayImage}
          />
          <div className="text-xs flex items-center gap-2">
            <InfoCircledIcon width={13} height={13} /> Demo data only
          </div>
        </div>
      );
    case TemplateTypes.CardNoImg:
      return (
        <div className="flex flex-col items-center gap-2 -mb-4">
          <CardNoImageTemplate
            animation={animation}
            isAnimatePulse={isAnimatePulse}
            isPreviewMode={isPreviewMode}
            contentBody={contentBodyHtml}
            previewContentBody={previewContentBody}
          />
          <div className="text-xs flex items-center gap-2">
            <InfoCircledIcon width={13} height={13} /> Demo data only
          </div>
        </div>
      );
    case TemplateTypes.Banner:
      return (
        <div className="flex flex-col items-center gap-2 -mb-4">
          <BannerTemplate
            previewEvent={previewEvent}
            animation={animation}
            isAnimatePulse={isAnimatePulse}
            isPreviewMode={isPreviewMode}
            contentBody={contentBodyHtml}
            previewContentBody={previewContentBody}
            shouldDisplayImage={shouldDisplayImage}
          />
          <div className="text-xs flex items-center gap-2">
            <InfoCircledIcon width={13} height={13} /> Demo data only
          </div>
        </div>
      );
    case TemplateTypes.BannerNoImg:
      return (
        <div className="flex flex-col items-center gap-2 -mb-4">
          <BannerNoImageTemplate
            animation={animation}
            isAnimatePulse={isAnimatePulse}
            isPreviewMode={isPreviewMode}
            contentBody={contentBodyHtml}
            previewContentBody={previewContentBody}
          />
          <div className="text-xs flex items-center gap-2">
            <InfoCircledIcon width={13} height={13} /> Demo data only
          </div>
        </div>
      );
    default:
      <>Unhandled template type</>;
  }
}

const EventIcon = (eventType: EventType, size: "lg" | "md" | "sm" = "lg") => {
  const { accentColor } = useProjectContext();
  const iconSize = size === "lg" ? 28 : size === "md" ? 24 : 20;

  switch (eventType) {
    case EventType.Purchase:
      return (
        <ShoppingBag
          color={hexToRgba(accentColor.hex.toString(), 0.85)}
          height={iconSize}
          width={iconSize}
        />
      );
    case EventType.Checkout:
      return (
        <ShoppingCart
          color={hexToRgba(accentColor.hex.toString(), 0.85)}
          height={iconSize}
          width={iconSize}
        />
      );
    case EventType.SomeoneViewing:
      return (
        <UserRoundSearch
          color={hexToRgba(accentColor.hex.toString(), 0.85)}
          height={iconSize}
          width={iconSize}
        />
      );
    case EventType.ActiveVisitors:
      return (
        <UsersRound
          color={hexToRgba(accentColor.hex.toString(), 0.85)}
          height={iconSize}
          width={iconSize}
        />
      );
  }
};

const SmallPopupTemplate = ({
  previewEvent,
  animation,
  isAnimatePulse,
  isPreviewMode,
  contentBody,
  previewContentBody,
  shouldDisplayImage,
}: {
  previewEvent: Tables<"Events"> | undefined;
  animation?: string;
  isAnimatePulse?: boolean;
  isPreviewMode: boolean;
  contentBody: string;
  previewContentBody: string;
  shouldDisplayImage: () => boolean;
}) => {
  const {
    activeEvent,
    activeProduct,
    backgroundColor,
    textColor,
    accentColor,
    borderColor,
  } = useProjectContext();

  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row w-fit h-fit pr-6 pl-4 max-w-[330px] rounded-lg border shadow-lg py-4 gap-3 ${
        isPreviewMode ? animation : ""
      } ${
        isAnimatePulse ? "animate__animated animate__pulse animate__faster" : ""
      }`}
    >
      <div className="flex items-center justify-center">
        {activeProduct?.image_url &&
        activeProduct.image_url !== "" &&
        shouldDisplayImage() ? (
          <div className="w-16 h-16 min-w-16">
            <Image
              loader={() => activeProduct.image_url || ""}
              unoptimized={true}
              width={110}
              height={110}
              alt="product-img"
              src={activeProduct.image_url}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        ) : (
          <div
            className="rounded-full flex items-center justify-center w-16 h-16 min-w-16 aspect-square"
            style={{
              backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
            }}
          >
            {EventIcon(
              isPreviewMode
                ? (previewEvent?.event_type as EventType)
                : (activeEvent?.event_type as EventType),
              "sm"
            )}
          </div>
        )}
      </div>
      <div className="flex w-full gap-4 items-center ml-2">
        <div className="flex flex-col w-full gap-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[12.5px] leading-5"
            dangerouslySetInnerHTML={{
              __html: isPreviewMode ? previewContentBody : contentBody,
            }}
          ></p>
          <div
            className="text-xs text-[11.5px] flex items-center gap-4"
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
              Verified by Taplo
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
  animation,
  isAnimatePulse,
  isPreviewMode,
  contentBody,
  previewContentBody,
}: {
  animation?: string;
  isAnimatePulse?: boolean;
  isPreviewMode: boolean;
  contentBody: string;
  previewContentBody: string;
}) => {
  const { backgroundColor, textColor, accentColor, borderColor } =
    useProjectContext();
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex w-fit h-fit pr-6 pl-4 max-w-[300px] rounded-lg border shadow-lg py-4 ${
        isPreviewMode ? animation : ""
      } ${
        isAnimatePulse ? "animate__animated animate__pulse animate__faster" : ""
      }`}
    >
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full gap-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[13px] leading-5"
            dangerouslySetInnerHTML={{
              __html: isPreviewMode ? previewContentBody : contentBody,
            }}
          ></p>
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
              Verified by Taplo
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
  previewEvent,
  animation,
  isAnimatePulse,
  isPreviewMode,
  contentBody,
  previewContentBody,
  shouldDisplayImage,
}: {
  previewEvent: Tables<"Events"> | undefined;
  animation?: string;
  isAnimatePulse?: boolean;
  isPreviewMode: boolean;
  contentBody: string;
  previewContentBody: string;
  shouldDisplayImage: () => boolean;
}) => {
  const {
    activeEvent,
    activeProduct,
    backgroundColor,
    textColor,
    accentColor,
    borderColor,
  } = useProjectContext();
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row w-fit h-fit min-h-[100px] max-w-[380px] min-w-[330px] md:min-w-[380px] rounded-lg border shadow-lg ${
        isPreviewMode ? animation : ""
      } ${
        isAnimatePulse ? "animate__animated animate__pulse animate__faster" : ""
      }`}
    >
      <div className="flex items-center justify-center h-full w-full max-w-[110px]">
        {activeProduct?.image_url &&
        activeProduct.image_url !== "" &&
        shouldDisplayImage() ? (
          <div className="h-[110px] w-[110px]">
            <Image
              loader={() => activeProduct.image_url || ""}
              unoptimized={true}
              width={110}
              height={110}
              alt="product-img"
              src={activeProduct.image_url}
              className="object-cover w-full h-full rounded-l-lg"
            />
          </div>
        ) : (
          <div
            className="flex h-full w-full items-center justify-center aspect-square rounded-l-lg outline-1 outline"
            style={{
              backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
              outlineColor: hexToRgba(accentColor.hex.toString(), 0.2),
            }}
          >
            {EventIcon(
              isPreviewMode
                ? (previewEvent?.event_type as EventType)
                : (activeEvent?.event_type as EventType)
            )}
          </div>
        )}
      </div>
      <div className="flex w-full items-center pr-3 pl-5">
        <div className="flex flex-col w-full lg:gap-[6px]">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14.5px] leading-5"
            dangerouslySetInnerHTML={{
              __html: isPreviewMode ? previewContentBody : contentBody,
            }}
          ></p>
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
              Verified by Taplo
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
  animation,
  isAnimatePulse,
  isPreviewMode,
  contentBody,
  previewContentBody,
}: {
  animation?: string;
  isAnimatePulse?: boolean;
  isPreviewMode: boolean;
  contentBody: string;
  previewContentBody: string;
}) => {
  const { backgroundColor, textColor, accentColor, borderColor } =
    useProjectContext();
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row w-fit h-fit min-h-[110px] max-w-[340px] rounded-lg border shadow-lg gap-3 ${
        isPreviewMode ? animation : ""
      } ${
        isAnimatePulse ? "animate__animated animate__pulse animate__faster" : ""
      }`}
    >
      <div className="flex w-full gap-3 items-center mx-3">
        <div className="flex flex-col w-full gap-[6px] mx-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14.5px] leading-5 mt-1"
            dangerouslySetInnerHTML={{
              __html: isPreviewMode ? previewContentBody : contentBody,
            }}
          ></p>
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
              Verified by Taplo
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
  previewEvent,
  animation,
  isAnimatePulse,
  isPreviewMode,
  contentBody,
  previewContentBody,
  shouldDisplayImage,
}: {
  previewEvent: Tables<"Events"> | undefined;
  animation?: string;
  isAnimatePulse?: boolean;
  isPreviewMode: boolean;
  contentBody: string;
  previewContentBody: string;
  shouldDisplayImage: () => boolean;
}) => {
  const {
    activeEvent,
    activeProduct,
    backgroundColor,
    textColor,
    accentColor,
    borderColor,
  } = useProjectContext();
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-col w-fit h-fit min-h-[270px] max-w-[280px] rounded-lg border shadow-lg gap-3 ${
        isPreviewMode ? animation : ""
      } ${
        isAnimatePulse ? "animate__animated animate__pulse animate__faster" : ""
      }`}
    >
      <div className="flex items-center justify-center h-full min-w-[270px]">
        {activeProduct?.image_url &&
        activeProduct.image_url !== "" &&
        shouldDisplayImage() ? (
          <div className="h-[160px] w-full">
            <Image
              loader={() => activeProduct.image_url || ""}
              unoptimized={true}
              width={90}
              height={90}
              alt="product-img"
              src={activeProduct.image_url}
              className="object-cover w-full h-full rounded-t-lg"
            />
          </div>
        ) : (
          <div
            className="flex h-full w-full max-h-[160px] items-center justify-center aspect-square rounded-t-lg outline-1 outline"
            style={{
              backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
              outlineColor: hexToRgba(accentColor.hex.toString(), 0.2),
            }}
          >
            {EventIcon(
              isPreviewMode
                ? (previewEvent?.event_type as EventType)
                : (activeEvent?.event_type as EventType)
            )}
          </div>
        )}
      </div>
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full gap-[4px] mx-2 p-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[13px] leading-5"
            dangerouslySetInnerHTML={{
              __html: isPreviewMode ? previewContentBody : contentBody,
            }}
          ></p>
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
              Verified by Taplo
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
  animation,
  isAnimatePulse,
  isPreviewMode,
  contentBody,
  previewContentBody,
}: {
  animation?: string;
  isAnimatePulse?: boolean;
  isPreviewMode: boolean;
  contentBody: string;
  previewContentBody: string;
}) => {
  const { backgroundColor, textColor, accentColor, borderColor } =
    useProjectContext();
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-col w-fit h-fit min-h-[160px] items-center justify-center max-w-[280px] rounded-lg border shadow-lg gap-3 ${
        isPreviewMode ? animation : ""
      } ${
        isAnimatePulse ? "animate__animated animate__pulse animate__faster" : ""
      }`}
    >
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full text-center items-center justify-center gap-[4px] px-5 py-3">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[13px] leading-5"
            dangerouslySetInnerHTML={{
              __html: isPreviewMode ? previewContentBody : contentBody,
            }}
          ></p>
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
              Verified by Taplo
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
  previewEvent,
  animation,
  isAnimatePulse,
  isPreviewMode,
  contentBody,
  previewContentBody,
  shouldDisplayImage,
}: {
  previewEvent: Tables<"Events"> | undefined;
  animation?: string;
  isAnimatePulse?: boolean;
  isPreviewMode: boolean;
  contentBody: string;
  previewContentBody: string;
  shouldDisplayImage: () => boolean;
}) => {
  const {
    activeEvent,
    activeProduct,
    backgroundColor,
    textColor,
    accentColor,
    borderColor,
  } = useProjectContext();
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row px-5 h-fit min-h-[60px] items-center justify-center max-w-screen-md rounded-lg border shadow-lg ${
        isPreviewMode ? animation : ""
      } ${
        isAnimatePulse ? "animate__animated animate__pulse animate__faster" : ""
      }`}
    >
      <div className="flex items-center justify-center">
        {activeProduct?.image_url &&
        activeProduct.image_url !== "" &&
        shouldDisplayImage() ? (
          <div className="w-12 h-12">
            <Image
              loader={() => activeProduct.image_url || ""}
              unoptimized={true}
              width={48}
              height={48}
              alt="product-img"
              src={activeProduct.image_url}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        ) : (
          <div
            className="rounded-full flex items-center justify-center w-12 h-12 min-w-12 aspect-square"
            style={{
              backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
            }}
          >
            {EventIcon(
              isPreviewMode
                ? (previewEvent?.event_type as EventType)
                : (activeEvent?.event_type as EventType),
              "md"
            )}
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full px-5 py-2 gap-1">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[13px] leading-5"
            dangerouslySetInnerHTML={{
              __html: isPreviewMode ? previewContentBody : contentBody,
            }}
          ></p>
          <div
            className={`flex flex-row gap-1 md:text-[12px] lg:text-[12px] text-[11px] leading-5`}
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
              Verified by Taplo
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
  animation,
  isAnimatePulse,
  isPreviewMode,
  contentBody,
  previewContentBody,
}: {
  animation?: string;
  isAnimatePulse?: boolean;
  isPreviewMode: boolean;
  contentBody: string;
  previewContentBody: string;
}) => {
  const { backgroundColor, textColor, accentColor, borderColor } =
    useProjectContext();
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-col h-fit min-h-[60px] items-center justify-center max-w-screen-md rounded-lg border shadow-lg ${
        isPreviewMode ? animation : ""
      } ${
        isAnimatePulse ? "animate__animated animate__pulse animate__faster" : ""
      }`}
    >
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full px-5 py-2 gap-1">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[13px] leading-5"
            dangerouslySetInnerHTML={{
              __html: isPreviewMode ? previewContentBody : contentBody,
            }}
          ></p>
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
              Verified by Taplo
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
