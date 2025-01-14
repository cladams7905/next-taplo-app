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
import { Tables } from "@/lib/supabase/types";
import { DisplayNotification } from "@/lib/types";
import DOMPurify from "isomorphic-dompurify";

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
  size: "lg" | "md" | "sm" = "md"
) => {
  const iconSize = size === "lg" ? 38 : size === "md" ? 28 : 20;
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
    case EventType.ActiveUsers:
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

  const hasHeader =
    notification.event?.header !== "" &&
    notification.event?.header !== null &&
    notification.event?.header !== undefined;

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className="relative flex flex-row w-fit h-fit pr-6 pl-4 max-w-[330px] min-w-[280px] min-h-[80px] rounded-lg border shadow-lg py-3 gap-3 group"
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
          <div className="w-12 h-12 min-w-12">
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
            {EventIcon(event?.event_type as EventType, project, "sm")}
          </div>
        )}
      </div>
      <div className="flex w-full items-center ml-2">
        <div className="flex flex-col w-full">
          {hasHeader && (
            <div className="flex justify-between leading-5">
              <p
                style={{
                  color: textColor,
                }}
                className="text-[13.5px] font-bold"
              >
                {notification.event?.header}
              </p>
              <div
                className="absolute bottom-[2px] right-3 text-[10px] flex items-center gap-[2px]"
                style={{
                  color: hexToRgba(textColor, 0.65),
                }}
              >
                {notification.time} | Verified by Taplo{" "}
                <BadgeCheck
                  width={18}
                  height={18}
                  fill={accentColor}
                  color={backgroundColor}
                />
              </div>
            </div>
          )}
          <p
            style={{
              color: textColor,
            }}
            className={`${
              hasHeader ? "text-[11.5px] mb-4 mt-1" : "text-[12.5px]"
            } leading-4`}
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></p>
          {!hasHeader && (
            <div
              className="text-[11px] flex items-center mt-1 leading-4"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              {notification.time}
              <p
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
              </p>
            </div>
          )}
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

  const hasHeader =
    notification.event?.header !== "" &&
    notification.event?.header !== null &&
    notification.event?.header !== undefined;

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-row w-fit h-fit px-5 max-w-[330px] min-w-[280px] min-h-[80px] rounded-lg border shadow-lg py-4 gap-3 group`}
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
      <div className="flex w-full items-center">
        <div className="flex flex-col w-full">
          {hasHeader && (
            <div className="flex justify-between leading-5">
              <p
                style={{
                  color: textColor,
                }}
                className="text-[14px] font-bold"
              >
                {notification.event?.header}
              </p>
              <div
                className="absolute bottom-1 right-2 text-[10.5px] flex items-center gap-1"
                style={{
                  color: hexToRgba(textColor, 0.65),
                }}
              >
                {notification.time} |{" "}
                <div className="flex gap-[2px]">
                  Verified by Taplo{" "}
                  <BadgeCheck
                    width={18}
                    height={18}
                    fill={accentColor}
                    color={backgroundColor}
                    className="mt-[1px]"
                  />
                </div>
              </div>
            </div>
          )}
          <p
            style={{
              color: textColor,
            }}
            className={`${
              hasHeader ? "text-[12px] mt-2 mb-3" : "text-[13px]"
            } leading-4`}
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></p>
          {!hasHeader && (
            <div
              className="text-[11.5px] flex items-center mt-1 leading-4"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              {notification.time}
              <p
                className="absolute bottom-1 right-1 flex items-center gap-[3px] text-[11px]"
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
              </p>
            </div>
          )}
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

  const hasHeader =
    notification.event?.header !== "" &&
    notification.event?.header !== null &&
    notification.event?.header !== undefined;

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-row w-fit min-h-[120px] h-fit max-w-[400px] min-w-[330px] md:min-w-[380px] rounded-lg border shadow-lg group`}
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
      <div className="relative h-auto w-[180px] flex flex-grow">
        {product && product?.image_url && product.image_url !== "" ? (
          <div className="flex relative w-full h-full">
            <Image
              loader={() => product.image_url || ""}
              unoptimized={true}
              alt="product-img"
              fill
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
      <div className="flex w-full items-center pr-4 pl-5 py-4">
        <div className="flex flex-col w-full">
          {hasHeader && (
            <p
              style={{
                color: textColor,
              }}
              className="text-[15px] leading-5 font-bold mb-2"
            >
              {notification.event?.header}
            </p>
          )}
          <p
            style={{
              color: textColor,
            }}
            className={`${
              hasHeader ? "text-[13px]" : "text-[14px]"
            } leading-4 mb-1`}
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></p>
          <div
            className="text-[11.5px] leading-5"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <p
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[11px]"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={20}
                height={20}
                fill={accentColor}
                color={backgroundColor}
              />
            </p>
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

  const hasHeader =
    notification.event?.header !== "" &&
    notification.event?.header !== null &&
    notification.event?.header !== undefined;

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-row w-fit h-fit min-h-[90px] max-w-[360px] min-w-[300px] rounded-lg border shadow-lg gap-3 group`}
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
      <div className="flex w-full items-center px-5 py-4">
        <div className="flex flex-col w-full">
          {hasHeader && (
            <p
              style={{
                color: textColor,
              }}
              className="text-[15px] leading-5 font-bold mb-2"
            >
              {notification.event?.header}
            </p>
          )}
          <p
            style={{
              color: textColor,
            }}
            className={`${
              hasHeader ? "text-[13px]" : "text-[14px]"
            } leading-4 mb-1`}
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></p>
          <div
            className="text-[11.5px] leading-5"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <p
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[11px]"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={20}
                height={20}
                fill={accentColor}
                color={backgroundColor}
              />
            </p>
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

  const hasHeader =
    notification.event?.header !== "" &&
    notification.event?.header !== null &&
    notification.event?.header !== undefined;

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-col h-fit min-h-[250px] w-[250px] rounded-lg border shadow-lg gap-3 group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="absolute -top-3 -right-3 rounded-full z-50 flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="flex items-center justify-center h-full w-full">
        {product && product?.image_url && product.image_url !== "" ? (
          <div className="relative h-[140px] w-full">
            <Image
              loader={() => product.image_url || ""}
              unoptimized={true}
              fill
              alt="product-img"
              src={product.image_url}
              className="object-cover w-full h-full rounded-t-lg"
            />
          </div>
        ) : (
          <div
            className="flex h-full w-full max-h-[140px] items-center justify-center aspect-square rounded-t-lg outline-1 outline"
            style={{
              backgroundColor: hexToRgba(accentColor, 0.2),
              outlineColor: hexToRgba(accentColor, 0.2),
            }}
          >
            {EventIcon(event?.event_type as EventType, project, "lg")}
          </div>
        )}
      </div>
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col w-full gap-[4px] mx-2 p-2">
          {hasHeader && (
            <div className="flex gap-[2px]">
              <p
                style={{
                  color: textColor,
                }}
                className="text-[15px] leading-5 font-bold mb-1"
              >
                {notification.event?.header}
              </p>
            </div>
          )}
          <div
            style={{
              color: textColor,
            }}
            className={`${
              hasHeader ? "text-[12px]" : "text-[13px]"
            } leading-4 mb-1`}
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></div>
          <div
            className="text-[11px] leading-5"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <div
              className="absolute bottom-[2px] right-2 flex items-center gap-[3px] text-[10.5px]"
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

  const hasHeader =
    notification.event?.header !== "" &&
    notification.event?.header !== null &&
    notification.event?.header !== undefined;

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-col w-fit h-fit min-h-[130px] py-5 items-center justify-center max-w-[280px] min-w-[260px] rounded-lg border shadow-lg gap-3 group`}
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
          {hasHeader && (
            <div className="flex gap-[2px]">
              <p
                style={{
                  color: textColor,
                }}
                className="text-[15px] leading-5 font-bold mb-1"
              >
                {notification.event?.header}
              </p>
            </div>
          )}
          <div
            style={{
              color: textColor,
            }}
            className={`${
              hasHeader ? "text-[13px]" : "text-[14px]"
            } leading-4 mb-1`}
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></div>
          <div
            className="text-[12px] leading-5"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <div
              className="absolute bottom-[2px] right-2 flex items-center gap-[3px] text-[11px]"
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

  const hasHeader =
    notification.event?.header !== "" &&
    notification.event?.header !== null &&
    notification.event?.header !== undefined;

  const headerHtml = DOMPurify.sanitize(
    `<span class="font-semibold">${notification.event?.header} | </span>`
  );

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-row pr-5 pl-3 h-fit min-h-[60px] min-w-[300px] max-w-[700px] items-center justify-center rounded-lg border shadow-lg group`}
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
          <div className="w-10 h-10">
            <Image
              loader={() => product.image_url || ""}
              unoptimized={true}
              width={40}
              height={40}
              alt="product-img"
              src={product.image_url}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        ) : (
          <div
            className="rounded-full flex items-center justify-center w-10 h-10 min-w-10 aspect-square"
            style={{
              backgroundColor: hexToRgba(accentColor, 0.2),
            }}
          >
            {EventIcon(event?.event_type as EventType, project, "sm")}
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full pl-4 py-2 gap-1">
          <div className="inline-flex items-center gap-1">
            <p
              style={{
                color: textColor,
              }}
              className="text-[13px] leading-4 text-center"
              dangerouslySetInnerHTML={{
                __html: hasHeader
                  ? headerHtml + notification.message
                  : notification.message,
              }}
            ></p>
          </div>
          <div
            className={`flex flex-row gap-1 text-[11px] leading-5`}
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

  const hasHeader =
    notification.event?.header !== "" &&
    notification.event?.header !== null &&
    notification.event?.header !== undefined;

  const headerHtml = DOMPurify.sanitize(
    `<span class="font-semibold">${notification.event?.header} | </span>`
  );

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`relative flex flex-col h-fit min-h-[60px] min-w-[300px] max-w-[700px] items-center justify-center rounded-lg border shadow-lg group`}
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
          <div className="inline-flex items-center gap-1">
            <p
              style={{
                color: textColor,
              }}
              className="text-[13px] leading-4 text-center"
              dangerouslySetInnerHTML={{
                __html: hasHeader
                  ? headerHtml + notification.message
                  : notification.message,
              }}
            ></p>
          </div>
          <div
            className={`flex flex-row gap-1 text-[11px] leading-5`}
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
