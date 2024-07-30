"use client";

import { Tables } from "@/supabase/types";
import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import "animate.css";
import { IColor } from "react-color-palette";
import confetti from "canvas-confetti";
import Image from "next/image";

export default function ToastPopup({
  activeProject,
  events,
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
}: {
  activeProject: Tables<"Projects">;
  events: Tables<"Events">[];
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
}) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`flex w-fit h-fit pr-6 pl-3 max-w-[320px] rounded-lg border shadow-md p-2`}
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
        <div className="flex flex-col w-full">
          <div
            style={{
              color: accentColor.hex.toString(),
            }}
            className="flex flex-row items-center gap-1 text-xs"
          >
            <p>20 min ago</p>
            <p className="mx-[2px]">|</p>
            <div className="flex items-center">
              {" "}
              <BadgeCheck
                fill={verifiedColor.hex.toString()}
                color={backgroundColor.hex.toString()}
              />
              Verified Purchase
            </div>
          </div>
          <p
            style={{
              color: textColor.hex.toString(),
            }}
            className="text-[14px] mt-1"
          >
            {/* {activeProduct && activeProduct.name && isShowProductsChecked ? (
              <>
                {`Someone in USA purchased `}
                <a
                  className="link font-bold cursor-pointer"
                  href={activeProduct.link || undefined}
                  target="_blank"
                >
                  {activeProduct.name}
                  {activeProduct.price && ` ($${activeProduct.price})`}
                </a>
                {`.`}
              </>
            ) : (
              "Test"
            )} */}
          </p>
        </div>
      </div>
    </div>
  );
}
