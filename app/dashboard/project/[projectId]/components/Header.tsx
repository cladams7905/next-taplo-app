"use client";

import { SortType } from "@/lib/enums";
import { Tables } from "@/lib/supabase/types";
import { Ellipsis } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import SortDropdown from "./SortDropdown";
import FilterDropdown from "./Filter/FilterDropdown";
import { FilterBuilder } from "@/lib/types";

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
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex gap-6 items-center">
        <p className="text-2xl">{`${project.project_name} Dashboard`}</p>
        <Ellipsis />
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
