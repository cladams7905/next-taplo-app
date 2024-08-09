"use client";

import { showToastError } from "@/components/shared/showToast";
import { hexToRgba } from "@/lib/actions";
import { updateProject } from "@/lib/actions/projects";
import { TemplateTypes } from "@/lib/enums";
import { Tables } from "@/supabase/types";
import { BadgeCheck, CheckIcon, ImageIcon, ShoppingBasket } from "lucide-react";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import { IColor } from "react-color-palette";

export default function TemplateModal({
  activeProject,
  setActiveProject,
  templateModalRef,
  activeTemplate,
  setActiveTemplate,
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  templateModalRef: RefObject<HTMLDialogElement>;
  activeTemplate: TemplateTypes;
  setActiveTemplate: Dispatch<SetStateAction<TemplateTypes>>;
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
}) {
  const [isShowImageTemplates, setShowImageTemplates] = useState<boolean>(true);
  const [isLoading, startLoadingTransition] = useTransition();

  const handleSetActiveTemplate = (templateToSet: TemplateTypes) => {
    if (templateToSet === activeTemplate) return;

    startLoadingTransition(async () => {
      const { data, error } = await updateProject(activeProject.id, {
        template: templateToSet,
      });
      if (error) {
        showToastError(error);
      } else {
        setActiveTemplate(templateToSet);
        setActiveProject({ ...activeProject, template: templateToSet });
      }
    });
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
            } bg-primary/20 outline outline-1 outline-gray-300 rounded-lg h-full w-72 min-w-72 p-4 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:drop-shadow-md hover:-translate-y-1 transition-transform`}
            onClick={() =>
              isShowImageTemplates
                ? handleSetActiveTemplate(TemplateTypes.SmPopup)
                : handleSetActiveTemplate(TemplateTypes.SmPopupNoImg)
            }
          >
            {(activeTemplate === TemplateTypes.SmPopup ||
              activeTemplate === TemplateTypes.SmPopupNoImg) && (
              <div className="flex items-center justify-center absolute top-0 left-0 aspect-square w-10 h-10 rounded-br-lg rounded-tl-lg bg-primary text-white">
                <CheckIcon width={20} height={20} strokeWidth={3} />
              </div>
            )}
            <SmallPopupTemplate
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              textColor={textColor}
              accentColor={accentColor}
              isShowImages={isShowImageTemplates}
            />
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
            } bg-primary/20 outline outline-1 outline-gray-300 rounded-lg h-full w-72 min-w-72 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:drop-shadow-md hover:-translate-y-1 transition-transform`}
            onClick={() =>
              isShowImageTemplates
                ? handleSetActiveTemplate(TemplateTypes.LgPopup)
                : handleSetActiveTemplate(TemplateTypes.LgPopupNoImg)
            }
          >
            {(activeTemplate === TemplateTypes.LgPopup ||
              activeTemplate === TemplateTypes.LgPopupNoImg) && (
              <div className="flex items-center justify-center absolute top-0 left-0 aspect-square w-10 h-10 rounded-br-lg rounded-tl-lg bg-primary text-white">
                <CheckIcon width={20} height={20} strokeWidth={3} />
              </div>
            )}
            <LargePopupTemplate
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              textColor={textColor}
              accentColor={accentColor}
              isShowImages={isShowImageTemplates}
            />
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
            } bg-primary/20 outline outline-1 outline-gray-300 rounded-lg h-full w-72 min-w-72 p-4 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:drop-shadow-md hover:-translate-y-1 transition-transform`}
            onClick={() =>
              isShowImageTemplates
                ? handleSetActiveTemplate(TemplateTypes.Card)
                : handleSetActiveTemplate(TemplateTypes.CardNoImg)
            }
          >
            {(activeTemplate === TemplateTypes.Card ||
              activeTemplate === TemplateTypes.CardNoImg) && (
              <div className="flex items-center justify-center absolute top-0 left-0 aspect-square w-10 h-10 rounded-br-lg rounded-tl-lg bg-primary text-white">
                <CheckIcon width={20} height={20} strokeWidth={3} />
              </div>
            )}
            <CardTemplate
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              textColor={textColor}
              accentColor={accentColor}
              isShowImages={isShowImageTemplates}
            />
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
            } bg-primary/20 outline outline-1 outline-gray-300 rounded-lg h-full w-72 min-w-72 p-4 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:drop-shadow-md hover:-translate-y-1 transition-transform`}
            onClick={() =>
              isShowImageTemplates
                ? handleSetActiveTemplate(TemplateTypes.Banner)
                : handleSetActiveTemplate(TemplateTypes.BannerNoImg)
            }
          >
            {(activeTemplate === TemplateTypes.Banner ||
              activeTemplate === TemplateTypes.BannerNoImg) && (
              <div className="flex items-center justify-center absolute top-0 left-0 aspect-square w-10 h-10 rounded-br-lg rounded-tl-lg bg-primary text-white">
                <CheckIcon width={20} height={20} strokeWidth={3} />
              </div>
            )}
            <BannerTemplate
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              textColor={textColor}
              accentColor={accentColor}
              isShowImages={isShowImageTemplates}
            />
            <div className="flex items-center justify-center absolute w-full h-fit px-10 py-4 outline outline-1 outline-primary bottom-0 rounded-b-lg bg-primary text-xs text-white font-bold">
              {isShowImageTemplates ? "Banner" : "Banner (no image)"}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

const SmallPopupTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  isShowImages,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  isShowImages: boolean;
}) => {
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
            <ShoppingBasket
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
              Verified by TapInsight
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

const LargePopupTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  isShowImages,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  isShowImages: boolean;
}) => {
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
            <ShoppingBasket
              color={hexToRgba(accentColor.hex.toString(), 0.65)}
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
              Verified by TapInsight
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

const CardTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  isShowImages,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  isShowImages: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className="flex flex-col items-center gap-2 border shadow-md w-56 h-52 -mt-12 rounded-lg"
    >
      {isShowImages && (
        <div className="flex items-center justify-center w-full h-full bg-purple-50 rounded-t-lg">
          <ImageIcon color={"#d8b4fe"} height={18} width={18} />
        </div>
      )}
      <div
        className={`flex flex-col gap-2 p-1 px-2 ${
          !isShowImages && "items-center justify-center text-center h-full"
        }`}
      >
        <p
          className="text-[8pt] leading-[13px]"
          style={{
            color: textColor.hex.toString(),
          }}
        >
          Jamie in Raleigh, North Carolina, USA purchased
        </p>
        <p
          className="text-[9pt] leading-[13px] font-bold uppercase"
          style={{
            color: textColor.hex.toString(),
          }}
        >
          Your product
        </p>
        <div
          className="flex items-center gap-[3px] text-[7.5pt] leading-[13px] mb-1"
          style={{
            color: accentColor.hex.toString(),
          }}
        >
          12 min ago |
          <p
            className="flex items-center gap-[3px]"
            style={{
              color: accentColor.hex.toString(),
            }}
          >
            Verified
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
  );
};

const BannerTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  isShowImages,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  isShowImages: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className="flex flex-row items-center gap-2 border shadow-md w-full py-1 px-3 h-12 -mt-12 rounded-lg"
    >
      {isShowImages && (
        <div className="flex items-center justify-center w-10 h-8 bg-purple-50 rounded-full outline outline-purple-50">
          <ImageIcon color={"#d8b4fe"} height={18} width={18} />
        </div>
      )}
      <div className="flex flex-col">
        <p
          className="text-[6pt]"
          style={{
            color: textColor.hex.toString(),
          }}
        >
          Jamie in Raleigh, North Carolina, USA purchased{" "}
          <span className="font-bold uppercase">Your Product</span>
        </p>
        <div
          className="flex items-center gap-[3px] text-[5pt] leading-[13px]"
          style={{
            color: accentColor.hex.toString(),
          }}
        >
          12 min ago |
          <p
            className="flex items-center gap-[3px]"
            style={{
              color: accentColor.hex.toString(),
            }}
          >
            Verified
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
  );
};
