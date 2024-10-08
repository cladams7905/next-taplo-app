"use client";

import { Tables } from "@/lib/supabase/types";
import { useRef, useState } from "react";
import IntegrationsList from "./IntegrationsList";
import { CirclePlus, Search } from "lucide-react";
import NewIntegrationModal from "./NewIntegrationModal";

export default function IntegrationBoard({
  events,
  activeProject,
  fetchedIntegrations,
}: {
  events: Tables<"Events">[] | null;
  activeProject: Tables<"Projects">;
  fetchedIntegrations: Tables<"Integrations">[] | null;
}) {
  const newIntegrationModalRef = useRef<HTMLDialogElement>(null);
  const [integrations, setIntegrations] = useState<Tables<"Integrations">[]>(
    fetchedIntegrations || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [integrationToEdit, setIntegrationToEdit] = useState<
    Tables<"Integrations"> | undefined
  >(undefined);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-full h-full flex flex-col gap-6 px-8 pt-6 overflow-y-scroll bg-white border-x border-b border-gray-300">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex md:flex-row flex-col items-center justify-between gap-6">
            <p className="text-lg font-semibold ml-4">
              My Integrations ({integrations.length})
            </p>
            <div
              className="btn btn-primary text-white md:w-fit w-full"
              onClick={() => {
                setIntegrationToEdit(undefined);
                newIntegrationModalRef.current?.showModal();
              }}
            >
              <CirclePlus height={20} width={20} />
              New Integration
            </div>
            <NewIntegrationModal
              activeProject={activeProject}
              integrations={integrations}
              setIntegrations={setIntegrations}
              newIntegrationModalRef={newIntegrationModalRef}
              integrationToEdit={integrationToEdit}
              setIntegrationToEdit={setIntegrationToEdit}
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
              events={events}
              integrations={integrations}
              setIntegrations={setIntegrations}
              searchQuery={searchQuery}
              integrationModalRef={newIntegrationModalRef}
              setIntegrationToEdit={setIntegrationToEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
