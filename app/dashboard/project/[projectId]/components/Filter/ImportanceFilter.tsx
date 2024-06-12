"use client";

import { FilterBuilder } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function ImportanceFilter({
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
  const [isImportanceAllChecked, setImportanceAllChecked] = useState(true);

  /* Importance checkbox refs */
  const lowCheckBox = useRef<HTMLInputElement>(null);
  const medCheckbox = useRef<HTMLInputElement>(null);
  const highCheckBox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (lowCheckBox.current && isImportanceAllChecked) {
      lowCheckBox.current.checked = true;
    }
    if (medCheckbox.current && isImportanceAllChecked) {
      medCheckbox.current.checked = true;
    }
    if (highCheckBox.current && isImportanceAllChecked) {
      highCheckBox.current.checked = true;
    }
  }, [isImportanceAllChecked]);

  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          checked={isImportanceAllChecked}
          className="checkbox w-4 h-4 rounded-sm focus:border-solid"
          onChange={() => {
            setImportanceAllChecked(!isImportanceAllChecked);
            setFilterBuilder({
              ...filterBuilder,
              importanceFilter: [],
            });
          }}
        />
        <span className="label-text text-xs">All</span>
      </label>
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          ref={lowCheckBox}
          disabled={isImportanceAllChecked}
          className="checkbox w-4 h-4 rounded-sm focus:border-solid"
          onChange={(e) => {
            handleCheckboxChange(e, "importanceFilter", "Low");
          }}
        />
        <span className="label-text text-xs">Low</span>
      </label>
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          ref={medCheckbox}
          disabled={isImportanceAllChecked}
          className={`checkbox w-4 h-4 rounded-sm focus:border-solid`}
          onChange={(e) => {
            handleCheckboxChange(e, "importanceFilter", "Moderate");
          }}
        />
        <span className="label-text text-xs">Moderate</span>
      </label>
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          ref={highCheckBox}
          disabled={isImportanceAllChecked}
          className="checkbox w-4 h-4 rounded-sm focus:border-solid"
          onChange={(e) => {
            handleCheckboxChange(e, "importanceFilter", "High");
          }}
        />
        <span className="label-text text-xs">High</span>
      </label>
    </div>
  );
}
