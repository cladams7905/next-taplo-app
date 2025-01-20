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
import Link from "next/link";

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
      className="taplo-relative taplo-flex taplo-flex-row taplo-w-fit taplo-h-fit taplo-pr-6 taplo-pl-4 taplo-py-3 taplo-max-w-[330px] taplo-min-w-[280px] taplo-min-h-[80px] taplo-rounded-lg taplo-border taplo-shadow-lg taplo-group"
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="taplo-flex taplo-items-center taplo-justify-center">
        {product && product?.image_url && product?.image_url !== "" ? (
          <div className="taplo-w-12 taplo-h-12 taplo-min-w-12">
            <Image
              loader={() => product.image_url || ""}
              unoptimized={true}
              width={48}
              height={48}
              alt="product-img"
              src={product.image_url}
              className="taplo-object-cover taplo-w-full taplo-h-full taplo-rounded-full"
            />
          </div>
        ) : (
          <div
            className="taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-w-12 taplo-h-12 taplo-min-w-12 taplo-aspect-square"
            style={{
              backgroundColor: hexToRgba(accentColor, 0.2),
            }}
          >
            {EventIcon(event?.event_type as EventType, project, "sm")}
          </div>
        )}
      </div>
      <div className="taplo-flex taplo-w-full taplo-items-center taplo-ml-2">
        <div className="taplo-flex taplo-flex-col taplo-w-full">
          {hasHeader && (
            <div className="taplo-flex taplo-justify-between taplo-leading-5">
              <p
                style={{
                  color: textColor,
                }}
                className="taplo-text-[13.5px] taplo-font-bold"
              >
                {notification.event?.header}
              </p>
              <div
                className="taplo-absolute taplo-bottom-[2px] taplo-right-3 taplo-text-[10px] taplo-flex taplo-items-center taplo-gap-[2px]"
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
              hasHeader
                ? "taplo-text-[11.5px] taplo-mb-4 taplo-mt-1"
                : "taplo-text-[12.5px]"
            } taplo-leading-4`}
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></p>
          {!hasHeader && (
            <div
              className="taplo-text-[11px] taplo-flex taplo-items-center taplo-mt-1 taplo-leading-4"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              {notification.time}
              <Link
                className="taplo-absolute taplo-bottom-[2px] taplo-link-hover hover:taplo-underline taplo-right-1 taplo-flex taplo-items-center taplo-gap-[3px] taplo-text-[10px]"
                href={"https://www.taplo.io"}
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
              </Link>
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
      className={`taplo-relative taplo-flex taplo-flex-row taplo-w-fit taplo-h-fit taplo-px-5 taplo-max-w-[330px] taplo-min-w-[280px] taplo-min-h-[80px] taplo-rounded-lg taplo-border taplo-shadow-lg taplo-py-4 taplo-gap-3 taplo-group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="taplo-flex taplo-w-full taplo-items-center">
        <div className="taplo-flex taplo-flex-col taplo-w-full">
          {hasHeader && (
            <div className="taplo-flex taplo-justify-between taplo-leading-5">
              <p
                style={{
                  color: textColor,
                }}
                className="taplo-text-[14px] taplo-font-bold"
              >
                {notification.event?.header}
              </p>
              <div
                className="taplo-absolute taplo-bottom-1 taplo-right-2 taplo-text-[10.5px] taplo-flex taplo-items-center taplo-gap-1"
                style={{
                  color: hexToRgba(textColor, 0.65),
                }}
              >
                {notification.time} |{" "}
                <Link
                  className="taplo-flex taplo-gap-[2px] taplo-link-hover"
                  href={"https://www.taplo.io"}
                >
                  Verified by Taplo{" "}
                  <BadgeCheck
                    width={18}
                    height={18}
                    fill={accentColor}
                    color={backgroundColor}
                    className="taplo-mt-[1px]"
                  />
                </Link>
              </div>
            </div>
          )}
          <p
            style={{
              color: textColor,
            }}
            className={`${
              hasHeader
                ? "taplo-text-[12px] taplo-mt-2 taplo-mb-3"
                : "taplo-text-[13px]"
            } taplo-leading-4`}
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></p>
          {!hasHeader && (
            <div
              className="taplo-text-[11.5px] taplo-flex taplo-items-center taplo-mt-1 taplo-leading-4"
              style={{
                color: hexToRgba(textColor, 0.65),
              }}
            >
              {notification.time}
              <Link
                className="taplo-absolute taplo-bottom-1 taplo-link-hover taplo-right-1 taplo-flex taplo-items-center taplo-gap-[3px] taplo-text-[11px]"
                href={"https://www.taplo.io"}
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
              </Link>
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
      className={`taplo-relative taplo-flex taplo-flex-row taplo-w-fit taplo-min-h-[120px] taplo-h-fit taplo-max-w-[400px] taplo-min-w-[330px] taplo-md:min-w-[380px] taplo-rounded-lg taplo-border taplo-shadow-lg taplo-group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="taplo-relative taplo-h-auto taplo-w-[180px] taplo-flex taplo-flex-grow">
        {product && product?.image_url && product.image_url !== "" ? (
          <div className="taplo-flex taplo-relative taplo-w-full taplo-h-full">
            <Image
              loader={() => product.image_url || ""}
              unoptimized={true}
              alt="product-img"
              fill
              src={product.image_url}
              className="taplo-object-cover taplo-w-full taplo-h-full taplo-rounded-l-lg"
            />
          </div>
        ) : (
          <div
            className="taplo-flex taplo-h-full taplo-w-full taplo-items-center taplo-justify-center taplo-aspect-square taplo-rounded-l-lg taplo-outline-1 taplo-outline"
            style={{
              backgroundColor: hexToRgba(accentColor, 0.2),
              outlineColor: hexToRgba(accentColor, 0.2),
            }}
          >
            {EventIcon(event?.event_type as EventType, project)}
          </div>
        )}
      </div>
      <div className="taplo-flex taplo-w-full taplo-items-center taplo-pr-4 taplo-pl-5 taplo-py-4">
        <div className="taplo-flex taplo-flex-col taplo-w-full">
          {hasHeader && (
            <p
              style={{
                color: textColor,
              }}
              className="taplo-text-[15px] taplo-leading-5 taplo-font-bold taplo-mb-2"
            >
              {notification.event?.header}
            </p>
          )}
          <p
            style={{
              color: textColor,
            }}
            className={`${
              hasHeader ? "taplo-text-[13px]" : "taplo-text-[14px]"
            } taplo-leading-4 taplo-mb-1`}
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></p>
          <div
            className="taplo-text-[11.5px] taplo-leading-5"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <Link
              className="taplo-absolute taplo-bottom-[2px] taplo-link-hover taplo-right-1 taplo-flex taplo-items-center taplo-gap-[3px] taplo-text-[11px]"
              href={"https://www.taplo.io"}
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
            </Link>
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
      className={`taplo-relative taplo-flex taplo-flex-row taplo-w-fit taplo-h-fit taplo-min-h-[90px] taplo-max-w-[360px] taplo-min-w-[300px] taplo-rounded-lg taplo-border taplo-shadow-lg taplo-gap-3 taplo-group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="taplo-flex taplo-w-full taplo-items-center taplo-px-5 taplo-py-4">
        <div className="taplo-flex taplo-flex-col taplo-w-full">
          {hasHeader && (
            <p
              style={{
                color: textColor,
              }}
              className="taplo-text-[15px] taplo-leading-5 taplo-font-bold taplo-mb-2"
            >
              {notification.event?.header}
            </p>
          )}
          <p
            style={{
              color: textColor,
            }}
            className={`${
              hasHeader ? "taplo-text-[13px]" : "taplo-text-[14px]"
            } taplo-leading-4 taplo-mb-1`}
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></p>
          <div
            className="taplo-text-[11.5px] taplo-leading-5"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <Link
              className="taplo-absolute taplo-bottom-[2px] taplo-link-hover taplo-right-1 taplo-flex taplo-items-center taplo-gap-[3px] taplo-text-[11px]"
              href={"https://www.taplo.io"}
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
            </Link>
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
      className={`taplo-relative taplo-flex taplo-flex-col taplo-h-fit taplo-min-h-[250px] taplo-w-[250px] taplo-rounded-lg taplo-border taplo-shadow-lg taplo-gap-3 taplo-group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="taplo-flex taplo-items-center taplo-justify-center taplo-h-full taplo-w-full">
        {product && product?.image_url && product.image_url !== "" ? (
          <div className="taplo-relative taplo-h-[140px] taplo-w-full">
            <Image
              loader={() => product.image_url || ""}
              unoptimized={true}
              fill
              alt="product-img"
              src={product.image_url}
              className="taplo-object-cover taplo-w-full taplo-h-full taplo-rounded-t-lg"
            />
          </div>
        ) : (
          <div
            className="taplo-flex taplo-h-full taplo-w-full taplo-max-h-[140px] taplo-items-center taplo-justify-center taplo-aspect-square taplo-rounded-t-lg taplo-outline-1 taplo-outline"
            style={{
              backgroundColor: hexToRgba(accentColor, 0.2),
              outlineColor: hexToRgba(accentColor, 0.2),
            }}
          >
            {EventIcon(event?.event_type as EventType, project, "lg")}
          </div>
        )}
      </div>
      <div className="taplo-flex taplo-w-full taplo-gap-4 taplo-items-center">
        <div className="taplo-flex taplo-flex-col taplo-w-full taplo-gap-[4px] taplo-mx-2 taplo-p-2">
          {hasHeader && (
            <div className="taplo-flex taplo-gap-[2px]">
              <p
                style={{
                  color: textColor,
                }}
                className="taplo-text-[15px] taplo-leading-5 taplo-font-bold taplo-mb-1"
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
              hasHeader ? "taplo-text-[12px]" : "taplo-text-[13px]"
            } taplo-leading-4 taplo-mb-1`}
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></div>
          <div
            className="taplo-text-[11px] taplo-leading-5"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <Link
              className="taplo-absolute taplo-bottom-[2px] taplo-link-hover taplo-right-2 taplo-flex taplo-items-center taplo-gap-[3px] taplo-text-[10.5px]"
              href={"https://www.taplo.io"}
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
            </Link>
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
      className={`taplo-relative taplo-flex taplo-flex-col taplo-w-fit taplo-h-fit taplo-min-h-[130px] taplo-py-5 taplo-items-center taplo-justify-center taplo-max-w-[280px] taplo-min-w-[260px] taplo-rounded-lg taplo-border taplo-shadow-lg taplo-gap-3 taplo-group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="taplo-flex taplo-w-full taplo-gap-4 taplo-items-center">
        <div className="taplo-flex taplo-flex-col taplo-w-full taplo-text-center taplo-items-center taplo-justify-center taplo-gap-[4px] taplo-px-5 taplo-py-3">
          {hasHeader && (
            <div className="taplo-flex taplo-gap-[2px]">
              <p
                style={{
                  color: textColor,
                }}
                className="taplo-text-[15px] taplo-leading-5 taplo-font-bold taplo-mb-1"
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
              hasHeader ? "taplo-text-[13px]" : "taplo-text-[14px]"
            } taplo-leading-4 taplo-mb-1`}
            dangerouslySetInnerHTML={{
              __html: notification.message,
            }}
          ></div>
          <div
            className="taplo-text-[12px] taplo-leading-5"
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <Link
              className="taplo-absolute taplo-bottom-[2px] taplo-link-hover taplo-right-2 taplo-flex taplo-items-center taplo-gap-[3px] taplo-text-[11px]"
              href={"https://www.taplo.io"}
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
            </Link>
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
    `<span class="taplo-font-semibold">${notification.event?.header} | </span>`
  );

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`taplo-relative taplo-flex taplo-flex-row taplo-pr-5 taplo-pl-3 taplo-h-fit taplo-min-h-[60px] taplo-min-w-[300px] taplo-max-w-[700px] taplo-items-center taplo-justify-center taplo-rounded-lg taplo-border taplo-shadow-lg taplo-group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="taplo-flex taplo-items-center taplo-justify-center">
        {product && product?.image_url && product.image_url !== "" ? (
          <div className="taplo-w-10 taplo-h-10">
            <Image
              loader={() => product.image_url || ""}
              unoptimized={true}
              width={40}
              height={40}
              alt="product-img"
              src={product.image_url}
              className="taplo-object-cover taplo-w-full taplo-h-full taplo-rounded-full"
            />
          </div>
        ) : (
          <div
            className="taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-w-10 taplo-h-10 taplo-min-w-10 taplo-aspect-square"
            style={{
              backgroundColor: hexToRgba(accentColor, 0.2),
            }}
          >
            {EventIcon(event?.event_type as EventType, project, "sm")}
          </div>
        )}
      </div>
      <div className="taplo-flex taplo-w-full taplo-items-center taplo-justify-center">
        <div className="taplo-flex taplo-flex-col taplo-items-center taplo-justify-center taplo-w-full taplo-pl-4 taplo-py-2 taplo-gap-1">
          <div className="taplo-inline-flex taplo-items-center taplo-gap-1">
            <p
              style={{
                color: textColor,
              }}
              className="taplo-text-[13px] taplo-leading-4 taplo-text-center"
              dangerouslySetInnerHTML={{
                __html: hasHeader
                  ? headerHtml + notification.message
                  : notification.message,
              }}
            ></p>
          </div>
          <div
            className={`taplo-flex taplo-flex-row taplo-gap-1 taplo-text-[11px] taplo-leading-5`}
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <p>|</p>
            <Link
              className="taplo-flex taplo-link-hover taplo-items-center taplo-gap-[3px]"
              href={"https://www.taplo.io"}
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
            </Link>
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
    `<span class="taplo-font-semibold">${notification.event?.header} | </span>`
  );

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      className={`taplo-relative taplo-flex taplo-flex-col taplo-h-fit taplo-min-h-[60px] taplo-min-w-[300px] taplo-max-w-[700px] taplo-items-center taplo-justify-center taplo-rounded-lg taplo-border taplo-shadow-lg taplo-group`}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
        onClick={() => setExitPopup(true)}
        className="taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"
      >
        <X color={hexToRgba(textColor, 0.65)} width={14} height={14} />
      </div>
      <div className="taplo-flex taplo-w-full taplo-items-center taplo-justify-center">
        <div className="taplo-flex taplo-flex-col taplo-items-center taplo-justify-center taplo-w-full taplo-px-5 taplo-py-2 taplo-gap-1">
          <div className="taplo-inline-flex taplo-items-center taplo-gap-1">
            <p
              style={{
                color: textColor,
              }}
              className="taplo-text-[13px] taplo-leading-4 taplo-text-center"
              dangerouslySetInnerHTML={{
                __html: hasHeader
                  ? headerHtml + notification.message
                  : notification.message,
              }}
            ></p>
          </div>
          <div
            className={`taplo-flex taplo-flex-row taplo-gap-1 taplo-text-[11px] taplo-leading-5`}
            style={{
              color: hexToRgba(textColor, 0.65),
            }}
          >
            {notification.time}
            <p>|</p>
            <Link
              className="taplo-flex taplo-items-center taplo-gap-[3px] taplo-link-hover"
              href={"https://www.taplo.io"}
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
