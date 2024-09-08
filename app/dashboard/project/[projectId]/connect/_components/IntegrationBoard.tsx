"use client";

import { Tables } from "@/supabase/types";
import { useRef, useState } from "react";
import IntegrationsList from "./IntegrationsList";
import { CirclePlus, Search } from "lucide-react";
import NewIntegrationModal from "./NewIntegrationModal";

export default function IntegrationBoard({
  fetchedActiveProject,
  fetchedIntegrations,
}: {
  fetchedActiveProject: Tables<"Projects">;
  fetchedIntegrations: Tables<"Integrations">[];
}) {
  const newIntegrationModalRef = useRef<HTMLDialogElement>(null);
  const [integrations, setIntegrations] =
    useState<Tables<"Integrations">[]>(fetchedIntegrations);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex items-center justify-center w-full py-6 h-full">
      <div className="lg:max-w-[60vw] w-full h-full flex flex-col gap-6 px-6 pt-6 overflow-y-scroll bg-white rounded-lg border border-gray-300">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <p className="text-xl ml-4">
              My Integrations ({integrations.length})
            </p>
            <div
              className="btn btn-primary text-white w-fit"
              onClick={() => newIntegrationModalRef.current?.showModal()}
            >
              <CirclePlus height={20} width={20} />
              New Integration
            </div>
            <NewIntegrationModal
              activeProject={fetchedActiveProject}
              integrations={integrations}
              setIntegrations={setIntegrations}
              newIntegrationModalRef={newIntegrationModalRef}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="input input-md flex items-center !outline-none !border-none">
              <Search
                strokeWidth={2}
                color="oklch(var(--bc))"
                height={18}
                width={18}
              />
              <input
                type="text"
                className="grow w-5 ml-4 !border-none !px-0"
                placeholder="Search Integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
            <hr className="text-gray-200" />
          </div>
          <div className="flex flex-col h-full gap-4 overflow-y-scroll">
            <IntegrationsList
              integrations={integrations}
              setIntegrations={setIntegrations}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
