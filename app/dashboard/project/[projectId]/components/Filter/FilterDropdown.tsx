"use client";

import { FilterBuilder } from "@/lib/types";
import { Filter } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import ImportanceFilter from "./ImportanceFilter";
import StatusFilter from "./StatusFilter";
import TypeFilter from "./TypeFilter";

export default function FilterDropdown({
  filterBuilder,
  setFilterBuilder,
}: {
  filterBuilder: FilterBuilder;
  setFilterBuilder: Dispatch<SetStateAction<FilterBuilder>>;
}) {
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterType: keyof FilterBuilder,
    value: string
  ) => {
    if (!e.currentTarget.checked) {
      // Create a copy of the current filter array
      const newFilterArray = [...(filterBuilder[filterType] as string[])];

      // Add the new value to the array if it's not already included
      if (!newFilterArray.includes(value)) {
        newFilterArray.push(value);
      }

      // Update the state with the new array
      setFilterBuilder({
        ...filterBuilder,
        [filterType]: newFilterArray,
      });
    } else {
      // If the checkbox is checked, remove the value from the array
      const newFilterArray = (filterBuilder[filterType] as string[]).filter(
        (item) => item !== value
      );

      setFilterBuilder({
        ...filterBuilder,
        [filterType]: newFilterArray,
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center">
      <ul className="menu menu-horizontal">
        <div className="dropdown dropdown-end" tabIndex={1}>
          <li className="text-sm text-primary-content font-semibold">
            <a>
              Filter
              <Filter
                height={16}
                width={16}
                strokeWidth={1.5}
                color="oklch(var(--bc))"
              />
            </a>
          </li>
          <div
            className="dropdown-content border mt-1 border-gray-200 z-[1] p-4 px-8 shadow bg-base-100 rounded-md"
            tabIndex={1}
          >
            <div className="flex w-fit h-full columns-3 gap-14">
              <div className="w-fit flex flex-col gap-3">
                <p className="font-semibold">Importance</p>
                <ImportanceFilter
                  filterBuilder={filterBuilder}
                  setFilterBuilder={setFilterBuilder}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </div>
              <div className="w-fit flex flex-col gap-3">
                <p className="font-semibold">Status</p>
                <StatusFilter
                  filterBuilder={filterBuilder}
                  setFilterBuilder={setFilterBuilder}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </div>
              <div className="w-fit flex flex-col gap-3">
                <p className="font-semibold">Type</p>
                <TypeFilter
                  filterBuilder={filterBuilder}
                  setFilterBuilder={setFilterBuilder}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
}
