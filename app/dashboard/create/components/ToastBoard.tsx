"use client";

import { Tables } from "@/supabase/types";
import ActiveToastView from "./ActiveToastView";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { ToastType } from "@/lib/enums";

export default function ToastBoard({
  userToasts,
  integrations,
  products,
}: {
  userToasts: Tables<"Toasts">[];
  integrations: Tables<"Integrations">[];
  products: Tables<"Products">[];
}) {
  const [activeToast, setActiveToast] = useState<Tables<"Toasts"> | undefined>(
    userToasts.length > 0
      ? userToasts.reduce((latest, current) => {
          return new Date(current.created_at) > new Date(latest.created_at)
            ? current
            : latest;
        })
      : undefined
  );

  const [currentToasts, setCurrentToasts] =
    useState<Tables<"Toasts">[]>(userToasts);
  const [toastType, setToastType] = useState<ToastType | undefined>();

  return (
    <main className="flex lg:columns-2 w-full h-screen-minus-navbar">
      <div className="lg:w-1/4">
        <Sidebar
          userToasts={currentToasts}
          activeToast={activeToast}
          setActiveToast={setActiveToast}
          setCurrentToasts={setCurrentToasts}
          toastType={toastType}
          setToastType={setToastType}
          integrations={integrations}
        />
      </div>
      <div className="lg:w-3/4 w-full">
        <ActiveToastView
          activeToast={activeToast}
          setActiveToast={setActiveToast}
          setCurrentToasts={setCurrentToasts}
          integrations={integrations}
          products={products}
        />
      </div>
    </main>
  );
}
