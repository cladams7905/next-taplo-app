"use client";

import { Tables } from "@/supabase/types";
import { BadgeCheck } from "lucide-react";
import { Dispatch, SetStateAction, TransitionStartFunction } from "react";
import { IColor } from "react-color-palette";

export default function TemplatePopup({
  activeProject,
  setActiveProject,
  events,
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
  contentBody,
  activeContent,
  startLoadTransition,
  replaceVariablesInContentBody,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
  contentBody: string[];
  activeContent: string;
  startLoadTransition: TransitionStartFunction;
  replaceVariablesInContentBody: (
    contentStr?: string | null,
    shouldReturnHTML?: boolean
  ) => string;
}) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`flex w-fit h-fit pr-6 pl-4 max-w-[320px] rounded-lg border shadow-md py-4 mx-4`}
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
        <div className="flex flex-col w-full gap-2">
          <div
            style={{
              color: accentColor.hex.toString(),
            }}
            className="flex flex-row items-center gap-2 text-xs"
          >
            <div className="flex items-center gap-1">
              Verified by Stripe
              <BadgeCheck
                fill={verifiedColor.hex.toString()}
                color={backgroundColor.hex.toString()}
              />
            </div>
          </div>
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14px] leading-5"
          >
            {replaceVariablesInContentBody()}
          </p>
          <p
            className="text-xs"
            style={{
              color: accentColor.hex.toString(),
            }}
          >
            20 min ago
          </p>
        </div>
      </div>
    </div>
  );
}
