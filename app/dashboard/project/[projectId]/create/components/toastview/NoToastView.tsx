"use client";

import { CirclePlus } from "lucide-react";
import Image from "next/image";
import ToastImg from "@/public/images/toaster1.png";
import "animate.css";

export const NoToastView = () => {
  return (
    <div className="flex flex-col items-center gap-3 bg-gradient-to-tr from-primary/50 to-violet-100 h-full p-4 rounded-none">
      <Image
        className="rounded-3xl max-h-[300px] mt-20 animate__animated animate__headShake"
        width={300}
        alt="toast"
        src={ToastImg}
      />
      <div className="flex flex-col gap-2 items-center justify-center -mt-4">
        {" "}
        <div className="font-bold text-2xl">
          You haven&apos;t made any toasts yet.
        </div>
        <div className="flex flex-row items-center gap-2">
          Click{" "}
          <span>
            <CirclePlus height={20} width={20} />
          </span>{" "}
          to create a new one!
        </div>
      </div>
    </div>
  );
};
