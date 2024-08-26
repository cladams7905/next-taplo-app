"use client";

import { X } from "lucide-react";
import SquigglyArrow from "@/public/images/arrow-07-svgrepo-com.svg";
import Image from "next/image";
import { useState } from "react";

export default function PopupDemo() {
  const [isDemoClosed, setDemoClosed] = useState<boolean>(false);
  return (
    <div
      className={`fixed left-8 bottom-40 shadow-md z-[10] font-sans flex items-center p-3 bg-white/80 backdrop-blur-lg rounded-lg ${
        isDemoClosed ? "animate-slideOutLeft" : ""
      }`}
    >
      <p>Get this on your own site with Taplo!</p>
      <div
        className="absolute -right-4 -top-4 flex items-center justify-center rounded-full shadow-md z-[20] p-2 bg-white/90 hover:bg-gray-100 cursor-pointer backdrop-blur-lg"
        onClick={() => setDemoClosed(true)}
      >
        <X width={16} height={16} />
      </div>
      <div className="absolute -right-16 top-6">
        <Image width={48} height={48} src={SquigglyArrow} alt="arrow" />
      </div>
    </div>
  );
}
