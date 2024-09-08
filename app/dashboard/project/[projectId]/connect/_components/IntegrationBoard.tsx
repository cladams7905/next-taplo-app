"use client";

import { Tables } from "@/supabase/types";
import { useRef, useState } from "react";
import IntegrationsSidebar from "./IntegrationsSidebar";
import IntegrationsList from "./IntegrationsList";
import { User } from "@supabase/supabase-js";

export default function IntegrationBoard({
  user,
  fetchedActiveProject,
  fetchedIntegrations,
}: {
  user: User;
  fetchedActiveProject: Tables<"Projects">;
  fetchedIntegrations: Tables<"Integrations">[];
}) {
  const newIntegrationModalRef = useRef<HTMLDialogElement>(null);
  const [integrations, setIntegrations] =
    useState<Tables<"Integrations">[]>(fetchedIntegrations);

  return (
    <div className="h-full lg:w-2/3 w-3/4 bg-white border border-neutral border-t-0 p-4 flex shadow-md">
      <div className="flex flex-col gap-4 h-full w-1/3 p-4 pr-6 border-r border-neutral">
        <IntegrationsSidebar
          activeProject={fetchedActiveProject}
          integrations={integrations}
          setIntegrations={setIntegrations}
          newIntegrationModalRef={newIntegrationModalRef}
        />
      </div>
      <div className="flex flex-col gap-4 h-full w-2/3 p-4 pl-6">
        {" "}
        <p className="text-xl">My Integrations</p>
        <div className="flex flex-col h-full gap-4 overflow-y-scroll">
          <IntegrationsList
            integrations={integrations}
            setIntegrations={setIntegrations}
          />
        </div>
      </div>
    </div>
  );
}
