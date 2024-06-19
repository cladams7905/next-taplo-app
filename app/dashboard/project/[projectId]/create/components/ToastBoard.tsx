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

  return (
    <main className="flex columns-2 join lg:px-48 py-4 w-full h-screen-minus-navbar">
      <div className="w-1/4">
        <Sidebar
          userToasts={userToasts}
          project={project}
          activeToast={activeToast}
          setActiveToast={setActiveToast}
        />
      </div>
      <div className="w-3/4">
        <ActiveToastView
          userToasts={userToasts}
          project={project}
          activeToast={activeToast}
        />
      </div>
    </main>
  );
}
