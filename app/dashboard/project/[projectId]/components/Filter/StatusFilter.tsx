"use client";

import { FilterBuilder } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function StatusFilter({
  filterBuilder,
  setFilterBuilder,
  handleCheckboxChange,
}: {
  filterBuilder: FilterBuilder;
  setFilterBuilder: Dispatch<SetStateAction<FilterBuilder>>;
  handleCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    filterType: keyof FilterBuilder,
    value: string
  ) => void;
}) {
  const [isStatusAllChecked, setStatusAllChecked] = useState(true);

  /* Status checkbox refs */
  const newCheckBox = useRef<HTMLInputElement>(null);
  const inProgCheckBox = useRef<HTMLInputElement>(null);
  const completedCheckBox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newCheckBox.current && isStatusAllChecked) {
      newCheckBox.current.checked = true;
    }
    if (inProgCheckBox.current && isStatusAllChecked) {
      inProgCheckBox.current.checked = true;
    }
    if (completedCheckBox.current && isStatusAllChecked) {
      completedCheckBox.current.checked = true;
    }
  }, [isStatusAllChecked]);
  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          defaultChecked
          className="checkbox w-4 h-4 rounded-sm focus:border-solid"
          onClick={() => {
            setStatusAllChecked(!isStatusAllChecked);
            setFilterBuilder({
              ...filterBuilder,
              statusFilter: [],
            });
          }}
        />
        <span className="label-text text-xs">All</span>
      </label>
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          ref={newCheckBox}
          disabled={isStatusAllChecked}
          className="checkbox w-4 h-4 rounded-sm focus:border-solid"
          onChange={(e) => {
            handleCheckboxChange(e, "statusFilter", "New");
          }}
        />
        <span className="label-text text-xs">New</span>
      </label>
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          ref={inProgCheckBox}
          disabled={isStatusAllChecked}
          className="checkbox w-4 h-4 rounded-sm focus:border-solid"
          onChange={(e) => {
            handleCheckboxChange(e, "statusFilter", "In Progress");
          }}
        />
        <span className="label-text text-xs">In Progress</span>
      </label>
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          ref={completedCheckBox}
          disabled={isStatusAllChecked}
          className="checkbox w-4 h-4 rounded-sm focus:border-solid"
          onChange={(e) => {
            handleCheckboxChange(e, "statusFilter", "Completed");
          }}
        />
        <span className="label-text text-xs">Completed</span>
      </label>
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          defaultChecked={false}
          className="checkbox w-4 h-4 rounded-sm focus:border-solid"
        />
        <span className="label-text text-xs">Archived</span>
      </label>
    </div>
  );
}
