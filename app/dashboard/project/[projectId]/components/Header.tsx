"use client";

import { SortType } from "@/lib/enums";
import { Tables } from "@/lib/supabase/types";
import { Trash, Ellipsis, Pencil } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";
import SortDropdown from "./SortDropdown";
import FilterDropdown from "./Filter/FilterDropdown";
import { FilterBuilder } from "@/lib/types";
import DeleteProjectModal from "./DeleteProjectModal";
import RenameProjectModal from "./RenameProjectModal";

export default function Header({
  project,
  sortType,
  setSortType,
  filterBuilder,
  setFilterBuilder,
}: {
  project: Tables<"Projects">;
  sortType: SortType;
  setSortType: Dispatch<SetStateAction<SortType>>;
  filterBuilder: FilterBuilder;
  setFilterBuilder: Dispatch<SetStateAction<FilterBuilder>>;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const renameModalRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex gap-4 items-center">
        <p className="text-2xl">{`${project.project_name} Dashboard`}</p>
        <div
          className="dropdown dropdown-bottom cursor-pointer flex items-center justify-center"
          tabIndex={1}
        >
          <Ellipsis
            onClick={() => {
              dropdownRef?.current?.classList.remove("hidden");
            }}
          />
          <div
            className="dropdown-content border mt-1 border-gray-200 z-[1] p-2 w-48 shadow bg-base-100 rounded-md"
            ref={dropdownRef}
            tabIndex={1}
          >
            <ul className="flex flex-col w-full">
              <li
                className={`flex flex-row w-full text-sm text-primary-content rounded-md hover:bg-gray-200 p-2`}
                onClick={() => {}}
              >
                <a
                  className="w-full flex justify-between"
                  onClick={() => {
                    renameModalRef.current?.showModal();
                  }}
                >
                  <div className="flex flex-row items-center gap-2">
                    <Pencil
                      height={16}
                      width={16}
                      strokeWidth={1.5}
                      color="oklch(var(--bc))"
                    />
                    Rename
                  </div>
                </a>
                <RenameProjectModal
                  renameModalRef={renameModalRef}
                  dropdownRef={dropdownRef}
                  project={project}
                />
              </li>
              <li
                className={`flex flex-row w-full text-sm text-primary-content rounded-md hover:bg-gray-200 p-2`}
                onClick={() => {}}
              >
                <a
                  className="w-full flex justify-between"
                  onClick={() => {
                    deleteModalRef.current?.showModal();
                  }}
                >
                  <div className="flex flex-row items-center gap-2 text-accent">
                    {" "}
                    <Trash height={16} width={16} strokeWidth={1.5} />
                    Delete Project
                  </div>
                </a>
                <DeleteProjectModal
                  deleteModalRef={deleteModalRef}
                  dropdownRef={dropdownRef}
                  project={project}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <FilterDropdown
          filterBuilder={filterBuilder}
          setFilterBuilder={setFilterBuilder}
        />
        <SortDropdown sortType={sortType} setSortType={setSortType} />
      </div>
    </div>
  );
}
