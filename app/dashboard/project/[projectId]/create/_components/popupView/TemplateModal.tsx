"use client";

import { showToastError } from "@/components/shared/showToast";
import { updateProject } from "@/lib/actions/projects";
import { PopupTemplates } from "@/lib/enums";
import { Tables } from "@/supabase/types";
import { BadgeCheck, CheckIcon, ImageIcon } from "lucide-react";
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
  verifiedColor,
  borderColor,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  templateModalRef: RefObject<HTMLDialogElement>;
  activeTemplate: PopupTemplates;
  setActiveTemplate: Dispatch<SetStateAction<PopupTemplates>>;
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
}) {
  const [isShowImageTemplates, setShowImageTemplates] = useState<boolean>(true);
  const [isLoading, startLoadingTransition] = useTransition();

  const handleSetActiveTemplate = (templateToSet: PopupTemplates) => {
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
              (activeTemplate === PopupTemplates.SmPopup ||
                activeTemplate === PopupTemplates.SmPopupNoImg) &&
              "outline outline-[3px] outline-primary"
            } bg-primary/20 outline outline-1 outline-gray-300 rounded-lg h-full w-72 min-w-72 p-4 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:drop-shadow-md hover:-translate-y-1 transition-transform`}
            onClick={() =>
              isShowImageTemplates
                ? handleSetActiveTemplate(PopupTemplates.SmPopup)
                : handleSetActiveTemplate(PopupTemplates.SmPopupNoImg)
            }
          >
            {(activeTemplate === PopupTemplates.SmPopup ||
              activeTemplate === PopupTemplates.SmPopupNoImg) && (
              <div className="flex items-center justify-center absolute top-0 left-0 aspect-square w-10 h-10 rounded-br-lg rounded-tl-lg bg-primary text-white">
                <CheckIcon width={20} height={20} strokeWidth={3} />
              </div>
            )}
            <SmallPopupTemplate
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              textColor={textColor}
              verifiedColor={verifiedColor}
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
              (activeTemplate === PopupTemplates.LgPopup ||
                activeTemplate === PopupTemplates.LgPopupNoImg) &&
              "outline outline-[3px] outline-primary"
            } bg-primary/20 outline outline-1 outline-gray-300 rounded-lg h-full w-72 min-w-72 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:drop-shadow-md hover:-translate-y-1 transition-transform`}
            onClick={() =>
              isShowImageTemplates
                ? handleSetActiveTemplate(PopupTemplates.LgPopup)
                : handleSetActiveTemplate(PopupTemplates.LgPopupNoImg)
            }
          >
            {(activeTemplate === PopupTemplates.LgPopup ||
              activeTemplate === PopupTemplates.LgPopupNoImg) && (
              <div className="flex items-center justify-center absolute top-0 left-0 aspect-square w-10 h-10 rounded-br-lg rounded-tl-lg bg-primary text-white">
                <CheckIcon width={20} height={20} strokeWidth={3} />
              </div>
            )}
            <LargePopupTemplate
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              textColor={textColor}
              verifiedColor={verifiedColor}
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
              (activeTemplate === PopupTemplates.Card ||
                activeTemplate === PopupTemplates.CardNoImg) &&
              "outline outline-[3px] outline-primary"
            } bg-primary/20 outline outline-1 outline-gray-300 rounded-lg h-full w-72 min-w-72 p-4 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:drop-shadow-md hover:-translate-y-1 transition-transform`}
            onClick={() =>
              isShowImageTemplates
                ? handleSetActiveTemplate(PopupTemplates.Card)
                : handleSetActiveTemplate(PopupTemplates.CardNoImg)
            }
          >
            {(activeTemplate === PopupTemplates.Card ||
              activeTemplate === PopupTemplates.CardNoImg) && (
              <div className="flex items-center justify-center absolute top-0 left-0 aspect-square w-10 h-10 rounded-br-lg rounded-tl-lg bg-primary text-white">
                <CheckIcon width={20} height={20} strokeWidth={3} />
              </div>
            )}
            <CardTemplate
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              textColor={textColor}
              verifiedColor={verifiedColor}
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
              (activeTemplate === PopupTemplates.Banner ||
                activeTemplate === PopupTemplates.BannerNoImg) &&
              "outline outline-[3px] outline-primary"
            } bg-primary/20 outline outline-1 outline-gray-300 rounded-lg h-full w-72 min-w-72 p-4 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:drop-shadow-md hover:-translate-y-1 transition-transform`}
            onClick={() =>
              isShowImageTemplates
                ? handleSetActiveTemplate(PopupTemplates.Banner)
                : handleSetActiveTemplate(PopupTemplates.BannerNoImg)
            }
          >
            {(activeTemplate === PopupTemplates.Banner ||
              activeTemplate === PopupTemplates.BannerNoImg) && (
              <div className="flex items-center justify-center absolute top-0 left-0 aspect-square w-10 h-10 rounded-br-lg rounded-tl-lg bg-primary text-white">
                <CheckIcon width={20} height={20} strokeWidth={3} />
              </div>
            )}
            <BannerTemplate
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              textColor={textColor}
              verifiedColor={verifiedColor}
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
  verifiedColor,
  borderColor,
  isShowImages,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
  isShowImages: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className="flex flex-row items-center p-2 gap-2 border shadow-md w-full h-20 -mt-10 rounded-lg"
    >
      {isShowImages && (
        <div className="flex items-center justify-center rounded-full w-12 h-12 min-w-12 bg-purple-50">
          <ImageIcon color={"#d8b4fe"} height={18} width={18} />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <p
          className="text-[7pt]"
          style={{
            color: textColor.hex.toString(),
          }}
        >
          Jamie in Raleigh, North Carolina, USA purchased{" "}
          <span className="font-bold uppercase">Your Product</span>
        </p>
        <div
          className="flex items-center gap-[3px] text-[6.4pt] leading-[13px]"
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
              fill={verifiedColor.hex.toString()}
              color={backgroundColor.hex.toString()}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

const LargePopupTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
  isShowImages,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
  isShowImages: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className="join join-horizontal flex flex-row items-center gap-2 border shadow-md w-full h-24 -mt-10 rounded-lg"
    >
      {isShowImages && (
        <div className="join-item flex items-center justify-center w-32 h-full min-w-12 bg-purple-50 rounded-l-lg">
          <ImageIcon color={"#d8b4fe"} height={18} width={18} />
        </div>
      )}
      <div
        className={`join-item flex flex-col gap-2 p-1 ${
          !isShowImages && "p-4"
        }`}
      >
        {!isShowImages && (
          <p
            className="flex items-center gap-[3px] text-[7pt]"
            style={{
              color: accentColor.hex.toString(),
            }}
          >
            Verified
            <BadgeCheck
              width={14}
              height={14}
              fill={verifiedColor.hex.toString()}
              color={backgroundColor.hex.toString()}
            />
          </p>
        )}
        <p
          className="text-[7pt] leading-[13px]"
          style={{
            color: textColor.hex.toString(),
          }}
        >
          Jamie in Raleigh, North Carolina, USA purchased
        </p>
        <p
          className={`text-[8.5pt] ${
            isShowImages ? "leading-[13px]" : "leading-[4px] -mt-0"
          } font-bold uppercase`}
          style={{
            color: textColor.hex.toString(),
          }}
        >
          Your product
        </p>
        <div
          className={`flex items-center gap-[3px] text-[7pt] ${
            isShowImages ? "leading-[13px]" : "leading-[10px] mt-2"
          }`}
          style={{
            color: accentColor.hex.toString(),
          }}
        >
          12 min ago
          {isShowImages && (
            <>
              |
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
                  fill={verifiedColor.hex.toString()}
                  color={backgroundColor.hex.toString()}
                />
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CardTemplate = ({
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
  isShowImages,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
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
              fill={verifiedColor.hex.toString()}
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
  verifiedColor,
  borderColor,
  isShowImages,
}: {
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
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
              fill={verifiedColor.hex.toString()}
              color={backgroundColor.hex.toString()}
            />
          </p>
        </div>
      </div>
    </div>
  );
};
