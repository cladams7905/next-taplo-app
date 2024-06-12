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
  const bugsFixesCheckBox = useRef<HTMLInputElement>(null);
  const designUsabilityCheckBox = useRef<HTMLInputElement>(null);
  const deviceSupportCheckBox = useRef<HTMLInputElement>(null);
  const securityCheckBox = useRef<HTMLInputElement>(null);
  const integrationsCheckBox = useRef<HTMLInputElement>(null);
  const otherCheckBox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bugsFixesCheckBox.current && isTypeAllChecked) {
      bugsFixesCheckBox.current.checked = true;
    }
    if (designUsabilityCheckBox.current && isTypeAllChecked) {
      designUsabilityCheckBox.current.checked = true;
    }
    if (deviceSupportCheckBox.current && isTypeAllChecked) {
      deviceSupportCheckBox.current.checked = true;
    }
    if (securityCheckBox.current && isTypeAllChecked) {
      securityCheckBox.current.checked = true;
    }
    if (integrationsCheckBox.current && isTypeAllChecked) {
      integrationsCheckBox.current.checked = true;
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
            ref={bugsFixesCheckBox}
            disabled={isTypeAllChecked}
            className="checkbox w-4 h-4 rounded-sm focus:border-solid"
            onChange={(e) => {
              handleCheckboxChange(e, "typeFilter", "Bugs & Fixes");
            }}
          />
          <span className="label-text text-xs">Bugs & Fixes</span>
        </label>
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            ref={designUsabilityCheckBox}
            disabled={isTypeAllChecked}
            className="checkbox w-4 h-4 rounded-sm focus:border-solid"
            onChange={(e) => {
              handleCheckboxChange(e, "typeFilter", "Design & Usability");
            }}
          />
          <span className="label-text text-xs">Design & Usability</span>
        </label>
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            ref={deviceSupportCheckBox}
            disabled={isTypeAllChecked}
            className="checkbox w-4 h-4 rounded-sm focus:border-solid"
            onChange={(e) => {
              handleCheckboxChange(e, "typeFilter", "Device Support");
            }}
          />
          <span className="label-text text-xs">Device Support</span>
        </label>
      </div>
      <div className="w-1/2">
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
            ref={integrationsCheckBox}
            disabled={isTypeAllChecked}
            className="checkbox w-4 h-4 rounded-sm focus:border-solid"
            onChange={(e) => {
              handleCheckboxChange(e, "typeFilter", "Integrations");
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
              handleCheckboxChange(e, "typeFilter", "Other");
            }}
          />
          <span className="label-text text-xs">Other</span>
        </label>
      </div>
    </div>
  );
}
