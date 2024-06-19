"use client";

import Image from "next/image";
import ToastImg2 from "@/public/images/toaster2.jpeg";
import { CirclePlus } from "lucide-react";
import { Tables } from "@/lib/supabase/types";

export default function ActiveToastView({
  userToasts,
  project,
  activeToast,
}: {
  userToasts: Tables<"UserToasts">[];
  project: Tables<"Projects">;
  activeToast: Tables<"UserToasts"> | undefined;
}) {
  return (
    <div className="flex flex-col items-center gap-3 join-item bg-accent-light rounded-lg h-full p-4 border border-neutral">
      {activeToast !== undefined ? (
        <></>
      ) : (
        <>
          <Image
            className="rounded-3xl max-h-[300px] mt-12"
            width={300}
            alt="toast"
            src={ToastImg2}
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
        </>
      )}
    </div>
  );
}
