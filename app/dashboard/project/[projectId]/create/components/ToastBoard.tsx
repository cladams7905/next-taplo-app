"use client";

import { Tables } from "@/lib/supabase/types";
import ActiveToastView from "./ActiveToastView";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function ToastBoard({
  userToasts,
  project,
}: {
  userToasts: Tables<"UserToasts">[];
  project: Tables<"Projects">;
}) {
  const [activeToast, setActiveToast] = useState<
    Tables<"UserToasts"> | undefined
  >(userToasts.length > 0 ? userToasts[0] : undefined);

  const [currentToasts, setCurrentToasts] =
    useState<Tables<"UserToasts">[]>(userToasts);

  return (
    <main className="flex bg-primary/35 columns-2 join lg:px-12 px-2 pb-6 w-full h-screen-minus-navbar">
      <div className="w-1/4">
        <Sidebar
          userToasts={currentToasts}
          project={project}
          activeToast={activeToast}
          setActiveToast={setActiveToast}
          setCurrentToasts={setCurrentToasts}
        />
      </div>
      <div className="w-3/4">
        <ActiveToastView
          activeToast={activeToast}
          setActiveToast={setActiveToast}
          setCurrentToasts={setCurrentToasts}
        />
      </div>
    </main>
  );
}
