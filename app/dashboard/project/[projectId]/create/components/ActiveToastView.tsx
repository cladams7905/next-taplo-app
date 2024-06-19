"use client";

import Image from "next/image";
import ToastImg from "@/public/images/toaster2.jpeg";
import { CirclePlus, Ellipsis } from "lucide-react";
import { Tables } from "@/lib/supabase/types";
import ToastTabList from "./ToastTabList";
import { useState } from "react";

export default function ActiveToastView({
  userToasts,
  project,
  activeToast,
}: {
  userToasts: Tables<"UserToasts">[];
  project: Tables<"Projects">;
  activeToast: Tables<"UserToasts"> | undefined;
}) {
  const [currentTab, setCurrentTab] = useState<number>(0);
  return activeToast !== undefined ? (
    <div className="flex flex-col join-item bg-accent-light rounded-lg h-full border border-neutral shadow-lg z-[1]">
      <div className="w-full h-1/3 p-4">
        <div className="flex justify-between items-center">
          <p>{activeToast.title}</p>
          <Ellipsis />
        </div>
      </div>
      <ToastTabList currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex flex-col w-full items-center h-2/3 overflow-y-auto bg-white rounded-br-lg p-6 gap-6 shadow-lg">
        {currentTab === 0 && <ToastEvent activeToast={activeToast} />}
        {currentTab === 1 && <ToastContent activeToast={activeToast} />}
        {/* {currentTab === 2 && <ToastStyle activeToast={activeToast} />} */}
      </div>
    </div>
  ) : (
    <NoToastView />
  );
}

function ToastEvent({
  activeToast,
}: {
  activeToast: Tables<"UserToasts"> | undefined;
}) {
  return (
    <div className="flex flex-col w-2/3 gap-6">
      <p className="text-xl font-bold text-left">Toast Event</p>
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <p>Event Type</p>
          <select
            className="select select-bordered border-neutral w-full"
            defaultValue={"default"}
          >
            <option value={"default"}>Select</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
        <div className="w-full">
          <p>Integration</p>
          <select
            className="select select-bordered border-neutral w-full"
            defaultValue={"default"}
          >
            <option value={"default"}>Select</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ToastContent({
  activeToast,
}: {
  activeToast: Tables<"UserToasts"> | undefined;
}) {
  return (
    <div className="flex flex-col w-2/3 gap-6">
      <p className="text-xl font-bold text-left">Toast Content</p>
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <p>Toast Title</p>
          <input
            type="text"
            placeholder={activeToast?.title ? activeToast.title : "New Toast"}
            className="input input-bordered border border-neutral w-full"
          />
        </div>
        <div className="w-full">
          <p>Toast Body</p>
          <textarea
            placeholder={activeToast?.title ? activeToast.title : "New Toast"}
            className="textarea textarea-bordered border border-neutral w-full"
          />
        </div>
      </div>
    </div>
  );
}

function ToastStyle({
  activeToast,
}: {
  activeToast: Tables<"UserToasts"> | undefined;
}) {
  return (
    <div className="flex flex-col w-2/3 gap-6">
      <p className="text-xl font-bold">Toast Style</p>
      <div className="flex gap-10">
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <p>Background type</p>
            <input
              type="text"
              placeholder={activeToast?.title ? activeToast.title : "New Toast"}
              className="input input-bordered border border-neutral w-full"
            />
          </div>
          <div className="w-full">
            {" "}
            <p>Background color</p>
            <input
              type="text"
              placeholder={activeToast?.title ? activeToast.title : "New Toast"}
              className="input input-bordered border border-neutral w-full"
            />
          </div>
          <div className="w-full">
            {" "}
            <p>Text color</p>
            <input
              type="text"
              placeholder={activeToast?.title ? activeToast.title : "New Toast"}
              className="input input-bordered border border-neutral w-full"
            />
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-4">
          <div className="w-full">
            {" "}
            <p>Font</p>
            <input
              type="text"
              placeholder={activeToast?.title ? activeToast.title : "New Toast"}
              className="input input-bordered border border-neutral w-full"
            />
          </div>
          <div className="w-full">
            {" "}
            <p>Screen alignment</p>
            <input
              type="text"
              placeholder={activeToast?.title ? activeToast.title : "New Toast"}
              className="input input-bordered border border-neutral w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NoToastView() {
  return (
    <div className="flex flex-col items-center gap-3 join-item bg-accent-light rounded-lg h-full p-4 border border-neutral">
      <Image
        className="rounded-3xl max-h-[300px] mt-12"
        width={300}
        alt="toast"
        src={ToastImg}
      />
      <div className="flex flex-col gap-2 items-center justify-center">
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
}
