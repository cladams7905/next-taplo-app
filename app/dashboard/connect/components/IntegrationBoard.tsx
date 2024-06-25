"use client";

import { Tables } from "@/supabase/types";
import { useRef, useState } from "react";
import IntegrationsSidebar from "./IntegrationsSidebar";
import IntegrationsList from "./IntegrationsList";

export default function IntegrationBoard({
  integrations,
}: {
  integrations: Tables<"Integrations">[];
}) {
  const newIntegrationModalRef = useRef<HTMLDialogElement>(null);
  const [currentIntegrations, setCurrentIntegrations] =
    useState<Tables<"Integrations">[]>(integrations);
  return (
    <div className="h-full lg:w-2/3 w-3/4 bg-white border border-neutral border-t-0 p-4 flex shadow-md">
      <div className="flex flex-col gap-4 h-full w-1/3 p-4 pr-6 border-r border-neutral">
        <IntegrationsSidebar
          newIntegrationModalRef={newIntegrationModalRef}
          integrations={currentIntegrations}
          setCurrentIntegrations={setCurrentIntegrations}
        />
      </div>
      <div className="flex flex-col gap-4 h-full w-2/3 p-4 pl-6">
        {" "}
        <p className="text-xl">My Integrations</p>
        <div className="flex flex-col gap-4 overflow-y-scroll">
          <IntegrationsList
            integrations={currentIntegrations}
            setIntegrations={setCurrentIntegrations}
          />
        </div>
      </div>
    </div>
  );
}
