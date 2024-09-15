// Embeddable Widget Component
import React from "react";
import "animate.css";
import Image from "next/image";
import { BadgeCheck, Boxes } from "lucide-react";
import { Tables } from "@/supabase/types";
import { IColor } from "react-color-palette";
import { hexToRgba } from "../../lib/actions";

interface WidgetConfig {
  apiUrl: string;
}

const WidgetComponent = ({ apiUrl }: WidgetConfig) => {
  //   previewEvent: Tables<"Events"> | undefined;
  // animation?: string;
  // contentBody: string;
  // shouldDisplayImage: () => boolean;
  // activeProduct: Tables<"Products">;
  // backgroundColor: IColor;
  // textColor: IColor;
  // accentColor: IColor;
  // borderColor: IColor;

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
      }}
      className={`relative flex flex-row w-fit h-fit min-h-[100px] max-w-[380px] min-w-[330px] md:min-w-[380px] rounded-lg border shadow-lg`}
    >
      <div className="flex items-center justify-center h-full w-full max-w-[110px]">
        <div
          className="flex h-full w-full items-center justify-center aspect-square rounded-l-lg outline-1 outline"
          style={{
            backgroundColor: hexToRgba("#7A81EB", 0.2),
            outlineColor: hexToRgba("#7A81EB", 0.2),
          }}
        >
          <Boxes color={hexToRgba("#7A81EB", 0.85)} height={28} width={28} />
        </div>
      </div>
      <div className="flex w-full items-center pr-3 pl-5">
        <div className="flex flex-col w-full lg:gap-[6px]">
          <p
            style={{
              color: "#172554",
            }}
            className="text-[14.5px] leading-5"
            dangerouslySetInnerHTML={{
              __html: "Test",
            }}
          ></p>
          <div
            className="text-[13px] flex items-center gap-4"
            style={{
              color: hexToRgba("#172554", 0.65),
            }}
          >
            12 min ago
            <p
              className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10.5px]"
              style={{
                color: hexToRgba("#172554", 0.65),
              }}
            >
              Verified by Taplo
              <BadgeCheck
                width={18}
                height={18}
                fill={"#7A81EB"}
                color={"#FFFFFF"}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetComponent;
