"use client";

import { showToastError } from "@/components/shared/showToast";
import { hexToRgba } from "@/lib/actions";
import { updateProject } from "@/lib/actions/projects";
import { ScreenAlignment, TemplateTypes } from "@/lib/enums";
import { BadgeCheck, CheckIcon, ShoppingBag } from "lucide-react";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import { useProjectContext } from "../ProjectBoard";

export default function TemplateModal({
  templateModalRef,
  activeTemplate,
  setActiveTemplate,
}: {
  templateModalRef: RefObject<HTMLDialogElement>;
  activeTemplate: TemplateTypes;
  setActiveTemplate: Dispatch<SetStateAction<TemplateTypes>>;
}) {
  const { activeProject, setActiveProject } = useProjectContext();
  const [isShowImageTemplates, setShowImageTemplates] = useState<boolean>(true);
  const [isLoading, startLoadingTransition] = useTransition();

  const handleSetActiveTemplate = (templateToSet: TemplateTypes) => {
    if (templateToSet === activeTemplate) return;

    startLoadingTransition(async () => {
      const { data, error } = await updateProject(activeProject.id, {
        template: templateToSet,
        screen_alignment: setScreenAlignment(templateToSet),
      });
      if (error) {
        showToastError(error);
      } else {
        setActiveTemplate(templateToSet);
        setActiveProject({
          ...activeProject,
          template: templateToSet,
          screen_alignment: setScreenAlignment(templateToSet),
        });
      }
    });
  };

  const setScreenAlignment = (templateToSet: TemplateTypes) => {
    return templateToSet === TemplateTypes.Banner ||
      templateToSet === TemplateTypes.BannerNoImg
      ? ScreenAlignment.BottomCenter
      : activeProject.template === TemplateTypes.Banner ||
        activeProject.template === TemplateTypes.BannerNoImg
      ? ScreenAlignment.BottomLeft
      : activeProject.screen_alignment;
  };

  return (
    <dialog className="modal" ref={templateModalRef}>
      <div className="modal-box max-w-screen-md text-base-content dark:border dark:border-gray-600">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content !outline-none"
            onClick={() => {
              templateModalRef?.current?.close();
            }}
          >
            ✕
          </button>
        </form>
        <div className="flex items-center gap-6">
          <h3 className="font-semibold text-lg">Select Template</h3>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Show image?</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={isShowImageTemplates}
                onChange={() => setShowImageTemplates(!isShowImageTemplates)}
              />
            </label>
          </div>
          {isLoading && (
            <span className="loading loading-spinner loading-sm bg-base-content"></span>
          )}
        </div>
        <div className="flex flex-row overflow-x-scroll w-full h-80 py-4 px-1 gap-4">
          <div
            className={`relative flex flex-col px-4 items-center justify-center
            ${
              (activeTemplate === TemplateTypes.SmPopup ||
                activeTemplate === TemplateTypes.SmPopupNoImg) &&
              "outline outline-[3px] outline-primary"
            } bg-gradient-to-tr from-primary/50 to-purple-100 outline outline-1 outline-gray-300 rounded-lg h-full w-72 min-w-72 p-4 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:-translate-y-1 transition-transform`}
            onClick={() =>
              isShowImageTemplates
                ? handleSetActiveTemplate(TemplateTypes.SmPopup)
                : handleSetActiveTemplate(TemplateTypes.SmPopupNoImg)
            }
          >
            {(activeTemplate === TemplateTypes.SmPopup ||
              activeTemplate === TemplateTypes.SmPopupNoImg) && (
              <div className="flex items-center justify-center absolute top-0 z-[2] left-0 aspect-square w-10 h-10 rounded-br-lg rounded-tl-lg bg-primary text-white">
                <CheckIcon width={20} height={20} strokeWidth={3} />
              </div>
            )}
            <SmallPopupTemplate isShowImages={isShowImageTemplates} />
            <div className="flex items-center justify-center absolute w-full h-fit px-10 py-4 outline outline-1 outline-primary bottom-0 rounded-b-lg bg-primary text-xs text-white font-bold">
              {isShowImageTemplates ? "Small popup" : "Small popup (no image)"}
            </div>
          </div>
          <div
            className={`relative flex flex-col px-2 items-center justify-center
            ${
              (activeTemplate === TemplateTypes.LgPopup ||
                activeTemplate === TemplateTypes.LgPopupNoImg) &&
              "outline outline-[3px] outline-primary"
            } bg-gradient-to-tr from-primary/50 to-purple-100 outline outline-1 outline-gray-300 rounded-lg h-full w-72 min-w-72 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:-translate-y-1 transition-transform`}
            onClick={() =>
              isShowImageTemplates
                ? handleSetActiveTemplate(TemplateTypes.LgPopup)
                : handleSetActiveTemplate(TemplateTypes.LgPopupNoImg)
            }
          >
            {(activeTemplate === TemplateTypes.LgPopup ||
              activeTemplate === TemplateTypes.LgPopupNoImg) && (
              <div className="flex items-center justify-center absolute top-0 z-[2] left-0 aspect-square w-10 h-10 rounded-br-lg rounded-tl-lg bg-primary text-white">
                <CheckIcon width={20} height={20} strokeWidth={3} />
              </div>
            )}
            <LargePopupTemplate isShowImages={isShowImageTemplates} />
            <div className="flex items-center justify-center absolute w-full h-fit px-10 py-4 outline outline-1 outline-primary bottom-0 rounded-b-lg bg-primary text-xs text-white font-bold">
              {isShowImageTemplates ? "Large popup" : "Large popup (no image)"}
            </div>
          </div>
          <div
            className={`relative flex flex-col px-2 items-center justify-center
            ${
              (activeTemplate === TemplateTypes.Card ||
                activeTemplate === TemplateTypes.CardNoImg) &&
              "outline outline-[3px] outline-primary"
            } bg-gradient-to-tr from-primary/50 to-purple-100 outline outline-1 outline-gray-300 rounded-lg h-full w-72 min-w-72 p-4 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:-translate-y-1 transition-transform`}
            onClick={() =>
              isShowImageTemplates
                ? handleSetActiveTemplate(TemplateTypes.Card)
                : handleSetActiveTemplate(TemplateTypes.CardNoImg)
            }
          >
            {(activeTemplate === TemplateTypes.Card ||
              activeTemplate === TemplateTypes.CardNoImg) && (
              <div className="flex items-center justify-center absolute top-0 left-0 z-[2] aspect-square w-10 h-10 rounded-br-lg rounded-tl-lg bg-primary text-white">
                <CheckIcon width={20} height={20} strokeWidth={3} />
              </div>
            )}
            <CardTemplate isShowImages={isShowImageTemplates} />
            <div className="flex items-center justify-center absolute w-full h-fit px-10 py-4 outline outline-1 outline-primary bottom-0 rounded-b-lg bg-primary text-xs text-white font-bold">
              {isShowImageTemplates ? "Card" : "Card (no image)"}
            </div>
          </div>
          <div
            className={`relative flex flex-col px-4 items-center justify-center
            ${
              (activeTemplate === TemplateTypes.Banner ||
                activeTemplate === TemplateTypes.BannerNoImg) &&
              "outline outline-[3px] outline-primary"
            } bg-gradient-to-tr from-primary/50 to-purple-100 outline outline-1 outline-gray-300 rounded-lg h-full w-72 min-w-72 p-4 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:-translate-y-1 transition-transform`}
            onClick={() =>
              isShowImageTemplates
                ? handleSetActiveTemplate(TemplateTypes.Banner)
                : handleSetActiveTemplate(TemplateTypes.BannerNoImg)
            }
          >
            {(activeTemplate === TemplateTypes.Banner ||
              activeTemplate === TemplateTypes.BannerNoImg) && (
              <div className="flex items-center justify-center absolute top-0 left-0 z-[2] aspect-square w-10 h-10 rounded-br-lg rounded-tl-lg bg-primary text-white">
                <CheckIcon width={20} height={20} strokeWidth={3} />
              </div>
            )}
            <BannerTemplate isShowImages={isShowImageTemplates} />
            <div className="flex items-center justify-center absolute w-full h-fit px-10 py-4 outline outline-1 outline-primary bottom-0 rounded-b-lg bg-primary text-xs text-white font-bold">
              {isShowImageTemplates ? "Banner" : "Banner (no image)"}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

const SmallPopupTemplate = ({ isShowImages }: { isShowImages: boolean }) => {
  const { backgroundColor, textColor, accentColor, borderColor } =
    useProjectContext();
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row w-fit h-fit px-2 ${
        !isShowImages && "max-w-[230px]"
      } -mt-9 rounded-lg border shadow-md py-3 gap-3`}
    >
      {isShowImages && (
        <div className="flex items-center justify-center">
          <div
            className="rounded-full flex items-center justify-center w-12 h-12 min-w-12 aspect-square"
            style={{
              backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
            }}
          >
            <ShoppingBag
              color={hexToRgba(accentColor.hex.toString(), 0.85)}
              height={18}
              width={18}
            />
          </div>
        </div>
      )}
      <div
        className={`flex w-full gap-4 items-center ${!isShowImages && "ml-2"}`}
      >
        <div className="flex flex-col w-full gap-1">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[10px] leading-[14px]"
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
            className="text-[9px] flex items-center gap-4"
            style={{
              color: hexToRgba(textColor.hex.toString(), 0.65),
            }}
          >
            12 min ago
            <p
              className="absolute bottom-1 right-1 flex items-center gap-[3px] text-[8px]"
              style={{
                color: hexToRgba(textColor.hex.toString(), 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={14}
                height={14}
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

const LargePopupTemplate = ({ isShowImages }: { isShowImages: boolean }) => {
  const { backgroundColor, textColor, accentColor, borderColor } =
    useProjectContext();
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row w-fit h-fit min-h-[80px] rounded-lg -mt-10 border shadow-md gap-3 ${
        !isShowImages && "max-w-[260px]"
      }`}
    >
      {isShowImages && (
        <div className="flex items-center justify-center h-full w-full max-w-[90px]">
          <div
            className="flex h-full w-full items-center justify-center aspect-square rounded-l-lg outline outline-1"
            style={{
              backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
              outlineColor: hexToRgba(accentColor.hex.toString(), 0.2),
            }}
          >
            <ShoppingBag
              color={hexToRgba(accentColor.hex.toString(), 0.85)}
              height={24}
              width={24}
            />
          </div>
        </div>
      )}
      <div
        className={`flex w-full gap-4 items-center ${!isShowImages && "mx-2"}`}
      >
        <div className="flex flex-col w-full gap-2 mx-2">
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[11px] leading-[14px]"
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
            className="text-[9px] flex items-center gap-4"
            style={{
              color: hexToRgba(textColor.hex.toString(), 0.65),
            }}
          >
            12 min ago
            <p
              className="absolute bottom-1 right-1 flex items-center gap-[3px] text-[8px]"
              style={{
                color: hexToRgba(textColor.hex.toString(), 0.65),
              }}
            >
              Verified by Taplo
              <ShoppingBag
                width={14}
                height={14}
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

const CardTemplate = ({ isShowImages }: { isShowImages: boolean }) => {
  const { backgroundColor, textColor, accentColor, borderColor } =
    useProjectContext();
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-col w-fit ${
        isShowImages ? "h-[200px]" : "h-[120px] items-center justify-center"
      } max-w-[220px] -mt-12 rounded-lg border shadow-md gap-3`}
    >
      {isShowImages && (
        <div className="flex items-center justify-center h-full w-full">
          <div
            className="flex h-full w-full max-h-[110px] items-center justify-center aspect-square rounded-t-lg outline-1 outline"
            style={{
              backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
              outlineColor: hexToRgba(accentColor.hex.toString(), 0.2),
            }}
          >
            <ShoppingBag
              color={hexToRgba(accentColor.hex.toString(), 0.85)}
              height={28}
              width={28}
            />
          </div>
        </div>
      )}
      <div className="flex w-full gap-4 items-center">
        <div
          className={`flex flex-col w-full gap-[4px] mx-2 p-1 ${
            isShowImages
              ? "pb-6"
              : "text-center items-center justify-center px-2"
          }`}
        >
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[11px] leading-[16px]"
          >
            Jamie in Raleigh, North Carolina, USA purchased{" "}
            <span
              className="font-bold underline"
              style={{
                color: accentColor.hex.toString(),
              }}
            >
              Running shoes.
            </span>
          </p>
          <div
            className={`text-[10px] flex items-center ${
              !isShowImages && "mt-1"
            }`}
            style={{
              color: hexToRgba(textColor.hex.toString(), 0.65),
            }}
          >
            12 min ago
            <p
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[9px]"
              style={{
                color: hexToRgba(textColor.hex.toString(), 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={14}
                height={14}
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

const BannerTemplate = ({ isShowImages }: { isShowImages: boolean }) => {
  const { backgroundColor, textColor, accentColor, borderColor } =
    useProjectContext();
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative flex flex-row px-2 h-fit min-h-[30px] items-center justify-center rounded-lg border shadow-md -mt-10`}
    >
      {isShowImages && (
        <div className="flex items-center justify-center">
          <div
            className="rounded-full flex items-center justify-center w-8 h-8 min-w-8 aspect-square"
            style={{
              backgroundColor: hexToRgba(accentColor.hex.toString(), 0.2),
            }}
          >
            <ShoppingBag
              color={hexToRgba(accentColor.hex.toString(), 0.85)}
              height={14}
              width={14}
            />
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-center">
        <div
          className={`flex flex-col items-center justify-center w-full px-2 py-2 gap-1 ${
            !isShowImages && "text-center"
          }`}
        >
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[8px] leading-[12px]"
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
            className={`flex flex-row items-center gap-1 text-[8px]`}
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
                width={14}
                height={14}
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
