"use client";

import { Tables } from "@/supabase/types";

export const ToastStyleTab = ({
  activeToast,
}: {
  activeToast: Tables<"Toasts"> | undefined;
}) => {
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
};
