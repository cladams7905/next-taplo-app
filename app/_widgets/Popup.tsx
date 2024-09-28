import {
  BadgeCheck,
  ShoppingBag,
  ShoppingCart,
  UserRoundSearch,
  UsersRound,
  X,
} from "lucide-react";
import React from "react";
import { EventType, TemplateTypes } from "@/lib/enums";
import { hexToRgba } from "@/lib/actions";
import Image from "next/image";
import { Tables } from "@/supabase/types";
import { DisplayNotification } from "@/lib/types";

export default function PopupWidget({
  project,
  notification,
  setExitPopup,
}: {
  project: Tables<"Projects">;
  notification: DisplayNotification;
  setExitPopup: (value: boolean) => void;
}) {
  switch (project.template) {
    case TemplateTypes.SmPopup:
      return (
        <SmallPopupTemplate
          project={project}
          notification={notification}
          setExitPopup={setExitPopup}
        />
      );
    case TemplateTypes.SmPopupNoImg:
      return (
        <SmallPopupNoImageTemplate
          project={project}
          notification={notification}
          setExitPopup={setExitPopup}
        />
      );
    case TemplateTypes.LgPopup:
      return (
        <LargePopupTemplate
          project={project}
          notification={notification}
          setExitPopup={setExitPopup}
        />
      );
    case TemplateTypes.LgPopupNoImg:
      return (
        <LargePopupNoImageTemplate
          project={project}
          notification={notification}
          setExitPopup={setExitPopup}
        />
      );
    case TemplateTypes.Card:
      return (
        <CardTemplate
          project={project}
          notification={notification}
          setExitPopup={setExitPopup}
        />
      );
    case TemplateTypes.CardNoImg:
      return (
        <CardNoImageTemplate
          project={project}
          notification={notification}
          setExitPopup={setExitPopup}
        />
      );
    case TemplateTypes.Banner:
      return (
        <BannerTemplate
          project={project}
          notification={notification}
          setExitPopup={setExitPopup}
        />
      );
    case TemplateTypes.BannerNoImg:
      return (
        <BannerNoImageTemplate
          project={project}
          notification={notification}
          setExitPopup={setExitPopup}
        />
      );
    default:
      <>Unhandled template type</>;
  }
}

const EventIcon = (
  eventType: EventType,
  project: Tables<"Projects">,
  size: "lg" | "md" | "sm" = "lg"
) => {
  const iconSize = size === "lg" ? 28 : size === "md" ? 24 : 20;
  switch (eventType) {
    case EventType.Purchase:
      return (
        <ShoppingBag
          color={hexToRgba(project.accent_color ?? "#7A81EB", 0.85)}
          height={iconSize}
          width={iconSize}
        />
      );
    case EventType.Checkout:
      return (
        <ShoppingCart
          color={hexToRgba(project.accent_color ?? "#7A81EB", 0.85)}
          height={iconSize}
          width={iconSize}
        />
      );
    case EventType.SomeoneViewing:
      return (
        <UserRoundSearch
          color={hexToRgba(project.accent_color ?? "#7A81EB", 0.85)}
          height={iconSize}
          width={iconSize}
        />
      );
    case EventType.ActiveVisitors:
      return (
        <UsersRound
          color={hexToRgba(project.accent_color ?? "#7A81EB", 0.85)}
          height={iconSize}
          width={iconSize}
        />
      );
  }
};

const SmallPopupTemplate = ({
  project,
  notification,
  setExitPopup,
}: {
  project: Tables<"Projects">;
  notification: DisplayNotification;
  setExitPopup: (value: boolean) => void;
}) => {
  const product = notification?.product;
  const event = notification.event;

  const backgroundColor = project.bg_color ?? "#FFFFFF";
  const borderColor = project.border_color ?? "#FFFFFF";
  const textColor = project.text_color ?? "#172554";
  const accentColor = project.accent_color ?? "#7A81EB";

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-row w-fit h-fit pr-6 pl-4 max-w-[330px] rounded-lg border shadow-lg py-4 gap-3 group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="flex items-center justify-center">
        {product && product?.image_url && product?.image_url !== "" ? (
          <div className="w-16 h-16 min-w-16">
            <Image
              loader={() => product.image_url || ""}
              unoptimized={true}
              width={110}
              height={110}
              alt="product-img"
              src={product.image_url}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        ) : (
          <div
            className="rounded-full flex items-center justify-center w-16 h-16 min-w-16 aspect-square"
            style={{
              backgroundColor: hexToRgba(accentColor, 0.2),
            }}
          >
            {EventIcon(event?.event_type as EventType, project, "sm")}
          </div>
        )}
      </div>
      <div className="flex w-full gap-4 items-center ml-2">
        <div className="flex flex-col w-full gap-2">
          <div
            style={{
              color: textColor,
            }}
            className="text-[12.5px] leading-5"
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></div>
          <div
            className="text-xs text-[11.5px] flex items-center gap-4"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <div
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10px]"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={18}
                height={18}
                fill={accentColor}
                color={backgroundColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SmallPopupNoImageTemplate = ({
  project,
  notification,
  setExitPopup,
}: {
  project: Tables<"Projects">;
  notification: DisplayNotification;
  setExitPopup: (value: boolean) => void;
}) => {
  const backgroundColor = project.bg_color ?? "#FFFFFF";
  const borderColor = project.border_color ?? "#FFFFFF";
  const textColor = project.text_color ?? "#172554";
  const accentColor = project.accent_color ?? "#7A81EB";

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex w-fit h-fit pr-6 pl-4 max-w-[300px] rounded-lg border shadow-lg py-4 group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full gap-2">
          <div
            style={{
              color: textColor,
            }}
            className="text-[13px] leading-5"
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></div>
          <div
            className="text-xs flex items-center gap-4"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <div
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10px]"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={18}
                height={18}
                fill={accentColor}
                color={backgroundColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LargePopupTemplate = ({
  project,
  notification,
  setExitPopup,
}: {
  project: Tables<"Projects">;
  notification: DisplayNotification;
  setExitPopup: (value: boolean) => void;
}) => {
  const product = notification?.product;
  const event = notification.event;

  const backgroundColor = project.bg_color ?? "#FFFFFF";
  const borderColor = project.border_color ?? "#FFFFFF";
  const textColor = project.text_color ?? "#172554";
  const accentColor = project.accent_color ?? "#7A81EB";

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-row w-fit h-fit min-h-[100px] max-w-[380px] min-w-[330px] md:min-w-[380px] rounded-lg border shadow-lg group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="flex items-center justify-center h-full w-full max-w-[110px]">
        {product && product?.image_url && product.image_url !== "" ? (
          <div className="h-[110px] w-[110px]">
            <Image
              loader={() => product.image_url || ""}
              unoptimized={true}
              width={110}
              height={110}
              alt="product-img"
              src={product.image_url}
              className="object-cover w-full h-full rounded-l-lg"
            />
          </div>
        ) : (
          <div
            className="flex h-full w-full items-center justify-center aspect-square rounded-l-lg outline-1 outline"
            style={{
              backgroundColor: hexToRgba(accentColor, 0.2),
              outlineColor: hexToRgba(accentColor, 0.2),
            }}
          >
            {EventIcon(event?.event_type as EventType, project)}
          </div>
        )}
      </div>
      <div className="flex w-full items-center pr-3 pl-5">
        <div className="flex flex-col w-full lg:gap-[6px]">
          <div
            style={{
              color: textColor,
            }}
            className="text-[14.5px] leading-5"
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></div>
          <div
            className="text-[13px] flex items-center gap-4"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <div
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10.5px]"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={18}
                height={18}
                fill={accentColor}
                color={backgroundColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LargePopupNoImageTemplate = ({
  project,
  notification,
  setExitPopup,
}: {
  project: Tables<"Projects">;
  notification: DisplayNotification;
  setExitPopup: (value: boolean) => void;
}) => {
  const backgroundColor = project.bg_color ?? "#FFFFFF";
  const borderColor = project.border_color ?? "#FFFFFF";
  const textColor = project.text_color ?? "#172554";
  const accentColor = project.accent_color ?? "#7A81EB";

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-row w-fit h-fit min-h-[110px] max-w-[340px] rounded-lg border shadow-lg gap-3 group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="flex w-full gap-3 items-center mx-3">
        <div className="flex flex-col w-full gap-[6px] mx-2">
          <div
            style={{
              color: textColor,
            }}
            className="text-[14.5px] leading-5 mt-1"
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></div>
          <div
            className="text-[13px] flex items-center"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <div
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[11px]"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={18}
                height={18}
                fill={accentColor}
                color={backgroundColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardTemplate = ({
  project,
  notification,
  setExitPopup,
}: {
  project: Tables<"Projects">;
  notification: DisplayNotification;
  setExitPopup: (value: boolean) => void;
}) => {
  const product = notification?.product;
  const event = notification.event;

  const backgroundColor = project.bg_color ?? "#FFFFFF";
  const borderColor = project.border_color ?? "#FFFFFF";
  const textColor = project.text_color ?? "#172554";
  const accentColor = project.accent_color ?? "#7A81EB";

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-col w-fit h-fit min-h-[270px] max-w-[280px] rounded-lg border shadow-lg gap-3 group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="flex items-center justify-center h-full min-w-[270px]">
        {product && product?.image_url && product.image_url !== "" ? (
          <div className="h-[160px] w-full">
            <Image
              loader={() => product.image_url || ""}
              unoptimized={true}
              width={90}
              height={90}
              alt="product-img"
              src={product.image_url}
              className="object-cover w-full h-full rounded-t-lg"
            />
          </div>
        ) : (
          <div
            className="flex h-full w-full max-h-[160px] items-center justify-center aspect-square rounded-t-lg outline-1 outline"
            style={{
              backgroundColor: hexToRgba(accentColor, 0.2),
              outlineColor: hexToRgba(accentColor, 0.2),
            }}
          >
            {EventIcon(event?.event_type as EventType, project)}
          </div>
        )}
      </div>
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full gap-[4px] mx-2 p-2">
          <div
            style={{
              color: textColor,
            }}
            className="text-[13px] leading-5"
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></div>
          <div
            className="text-[12px] flex items-center gap-4"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <div
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10.5px]"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={18}
                height={18}
                fill={accentColor}
                color={backgroundColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardNoImageTemplate = ({
  project,
  notification,
  setExitPopup,
}: {
  project: Tables<"Projects">;
  notification: DisplayNotification;
  setExitPopup: (value: boolean) => void;
}) => {
  const backgroundColor = project.bg_color ?? "#FFFFFF";
  const borderColor = project.border_color ?? "#FFFFFF";
  const textColor = project.text_color ?? "#172554";
  const accentColor = project.accent_color ?? "#7A81EB";

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-col w-fit h-fit min-h-[160px] items-center justify-center max-w-[280px] rounded-lg border shadow-lg gap-3 group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full text-center items-center justify-center gap-[4px] px-5 py-3">
          <div
            style={{
              color: textColor,
            }}
            className="text-[13px] leading-5"
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></div>
          <div
            className="text-[12px] flex items-center gap-4"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <div
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10.5px]"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={18}
                height={18}
                fill={accentColor}
                color={backgroundColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BannerTemplate = ({
  project,
  notification,
  setExitPopup,
}: {
  project: Tables<"Projects">;
  notification: DisplayNotification;
  setExitPopup: (value: boolean) => void;
}) => {
  const product = notification?.product;
  const event = notification.event;

  const backgroundColor = project.bg_color ?? "#FFFFFF";
  const borderColor = project.border_color ?? "#FFFFFF";
  const textColor = project.text_color ?? "#172554";
  const accentColor = project.accent_color ?? "#7A81EB";

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-row px-5 h-fit min-h-[60px] items-center justify-center max-w-screen-md rounded-lg border shadow-lg group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="flex items-center justify-center">
        {product && product?.image_url && product.image_url !== "" ? (
          <div className="w-12 h-12">
            <Image
              loader={() => product.image_url || ""}
              unoptimized={true}
              width={48}
              height={48}
              alt="product-img"
              src={product.image_url}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        ) : (
          <div
            className="rounded-full flex items-center justify-center w-12 h-12 min-w-12 aspect-square"
            style={{
              backgroundColor: hexToRgba(accentColor, 0.2),
            }}
          >
            {EventIcon(event?.event_type as EventType, project, "md")}
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full px-5 py-2 gap-1">
          <div
            style={{
              color: textColor,
            }}
            className="text-[13px] leading-5"
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></div>
          <div
            className={`flex flex-row gap-1 md:text-[12px] lg:text-[12px] text-[11px] leading-5`}
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <p>|</p>
            <div
              className="flex items-center gap-[3px]"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={18}
                height={18}
                fill={accentColor}
                color={backgroundColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BannerNoImageTemplate = ({
  project,
  notification,
  setExitPopup,
}: {
  project: Tables<"Projects">;
  notification: DisplayNotification;
  setExitPopup: (value: boolean) => void;
}) => {
  const backgroundColor = project.bg_color ?? "#FFFFFF";
  const borderColor = project.border_color ?? "#FFFFFF";
  const textColor = project.text_color ?? "#172554";
  const accentColor = project.accent_color ?? "#7A81EB";

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-col h-fit min-h-[60px] items-center justify-center max-w-screen-md rounded-lg border shadow-lg group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full px-5 py-2 gap-1">
          <div
            style={{
              color: textColor,
            }}
            className="text-[13px] leading-5"
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></div>
          <div
            className={`flex flex-row gap-1 text-[12px] -mt-2`}
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <p>|</p>
            <div
              className="flex items-center gap-[3px]"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={18}
                height={18}
                fill={accentColor}
                color={backgroundColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
