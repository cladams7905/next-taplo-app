"use client";

import { FilterBuilder } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function TypeFilter({
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
  const [isTypeAllChecked, setTypeAllChecked] = useState(true);

  /* Feature type checkbox refs */
  const errCheckBox = useRef<HTMLInputElement>(null);
  const designCheckBox = useRef<HTMLInputElement>(null);
  const usabilityCheckBox = useRef<HTMLInputElement>(null);
  const deviceCompatCheckBox = useRef<HTMLInputElement>(null);
  const securityCheckBox = useRef<HTMLInputElement>(null);
  const integrationCheckBox = useRef<HTMLInputElement>(null);
  const otherCheckBox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (errCheckBox.current && isTypeAllChecked) {
      errCheckBox.current.checked = true;
    }
    if (designCheckBox.current && isTypeAllChecked) {
      designCheckBox.current.checked = true;
    }
    if (usabilityCheckBox.current && isTypeAllChecked) {
      usabilityCheckBox.current.checked = true;
    }
    if (deviceCompatCheckBox.current && isTypeAllChecked) {
      deviceCompatCheckBox.current.checked = true;
    }
    if (securityCheckBox.current && isTypeAllChecked) {
      securityCheckBox.current.checked = true;
    }
    if (integrationCheckBox.current && isTypeAllChecked) {
      integrationCheckBox.current.checked = true;
    }
    if (otherCheckBox.current && isTypeAllChecked) {
      otherCheckBox.current.checked = true;
    }
  }, [isTypeAllChecked]);

  return (
    <div className="flex form-control flex-row">
      <div className="w-1/2">
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            defaultChecked
            className="checkbox w-4 h-4 rounded-sm focus:border-solid"
            onClick={() => {
              setTypeAllChecked(!isTypeAllChecked);
              setFilterBuilder({
                ...filterBuilder,
                typeFilter: [],
              });
            }}
          />
          <span className="label-text text-xs">All</span>
        </label>
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            ref={errCheckBox}
            disabled={isTypeAllChecked}
            className="checkbox w-4 h-4 rounded-sm focus:border-solid"
            onChange={(e) => {
              handleCheckboxChange(e, "typeFilter", "Error/Bug Fix");
            }}
          />
          <span className="label-text text-xs">Error/Bug Fix</span>
        </label>
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            ref={designCheckBox}
            disabled={isTypeAllChecked}
            className="checkbox w-4 h-4 rounded-sm focus:border-solid"
            onChange={(e) => {
              handleCheckboxChange(e, "typeFilter", "Design");
            }}
          />
          <span className="label-text text-xs">Design</span>
        </label>
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            ref={usabilityCheckBox}
            disabled={isTypeAllChecked}
            className="checkbox w-4 h-4 rounded-sm focus:border-solid"
            onChange={(e) => {
              handleCheckboxChange(e, "typeFilter", "Usability");
            }}
          />
          <span className="label-text text-xs">Usability</span>
        </label>
      </div>
      <div className="w-1/2">
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            ref={deviceCompatCheckBox}
            disabled={isTypeAllChecked}
            className="checkbox w-4 h-4 rounded-sm focus:border-solid"
            onChange={(e) => {
              handleCheckboxChange(e, "typeFilter", "Device Compatibility");
            }}
          />
          <span className="label-text text-xs">Device Compatibility</span>
        </label>
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            ref={securityCheckBox}
            disabled={isTypeAllChecked}
            className="checkbox w-4 h-4 rounded-sm focus:border-solid"
            onChange={(e) => {
              handleCheckboxChange(e, "typeFilter", "Security");
            }}
          />
          <span className="label-text text-xs">Security</span>
        </label>
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            ref={integrationCheckBox}
            disabled={isTypeAllChecked}
            className="checkbox w-4 h-4 rounded-sm focus:border-solid"
            onChange={(e) => {
              handleCheckboxChange(e, "typeFilter", "Integration");
            }}
          />
          <span className="label-text text-xs">Integrations</span>
        </label>
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            ref={otherCheckBox}
            disabled={isTypeAllChecked}
            className="checkbox w-4 h-4 rounded-sm focus:border-solid"
            onChange={(e) => {
              handleCheckboxChange(e, "typeFilter", "Othe");
            }}
          />
          <span className="label-text text-xs">Other</span>
        </label>
      </div>
    </div>
  );
}
