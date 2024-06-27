"use client";

import { Tables } from "@/supabase/types";

export const ToastContentTab = ({
  activeToast,
}: {
  activeToast: Tables<"Toasts"> | undefined;
}) => {
  return (
    <div className="flex flex-col w-2/3 gap-6">
      <p className="text-xl font-bold text-left">Toast Content</p>
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <p>Toast Heading</p>
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
};
