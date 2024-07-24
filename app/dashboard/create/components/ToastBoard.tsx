"use client";

import { Tables } from "@/supabase/types";
import ActiveToastView from "./ActiveToastView";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { ToastType } from "@/lib/enums";

export default function ToastBoard({
  fetchedActiveProject,
  integrations,
  products,
}: {
  fetchedActiveProject: Tables<"Projects">;
  integrations: Tables<"Integrations">[];
  products: Tables<"Products">[];
}) {
  const [activeProject, setActiveProject] =
    useState<Tables<"Projects">>(fetchedActiveProject);
  const [toastType, setToastType] = useState<ToastType | undefined>();

  return (
    <main className="flex lg:columns-2 w-full h-screen-minus-navbar">
      <div className="lg:w-1/3">
        <Sidebar
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          toastType={toastType}
          setToastType={setToastType}
          integrations={integrations}
        />
      </div>
      <div className="lg:w-2/3 w-full">
        <ActiveToastView
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          integrations={integrations}
          products={products}
        />
      </div>
    </main>
  );
}
