"use client";

import { SortType } from "@/lib/enums";
import { Tables } from "@/lib/supabase/types";
import { Ellipsis } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import SortDropdown from "./SortDropdown";
import FilterDropdown from "./FilterDropdown";

export default function Header({
  project,
  sortType,
  setSortType,
}: {
  project: Tables<"Projects">;
  sortType: SortType;
  setSortType: Dispatch<SetStateAction<SortType>>;
}) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex gap-3 items-center">
        <p className="text-2xl">{`${project.project_name} - Dashboard`}</p>
        <Ellipsis />
      </div>
      <div className="flex gap-3 items-center">
        <FilterDropdown />
        <SortDropdown sortType={sortType} setSortType={setSortType} />
      </div>
    </div>
  );
}
