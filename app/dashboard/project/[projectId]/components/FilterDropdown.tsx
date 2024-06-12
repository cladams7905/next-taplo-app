"use client";

import { FilterBuilder } from "@/lib/types";
import { Filter } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function FilterDropdown({
  filterBuilder,
  setFilterBuilder,
}: {
  filterBuilder: FilterBuilder;
  setFilterBuilder: Dispatch<SetStateAction<FilterBuilder>>;
}) {
  const [isImportanceAllChecked, setImportanceAllChecked] = useState(true);
  const [isStatusAllChecked, setStatusAllChecked] = useState(true);
  const [isTypeAllChecked, setTypeAllChecked] = useState(true);

  /* Importance checkbox refs */
  const lowCheckBox = useRef<HTMLInputElement>(null);
  const medCheckbox = useRef<HTMLInputElement>(null);
  const highCheckBox = useRef<HTMLInputElement>(null);
  const critCheckBox = useRef<HTMLInputElement>(null);

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
    if (critCheckBox.current && isImportanceAllChecked) {
      critCheckBox.current.checked = true;
    }
  }, [isImportanceAllChecked]);

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
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      ref={critCheckBox}
                      disabled={isImportanceAllChecked}
                      className="checkbox w-4 h-4 rounded-sm focus:border-solid"
                      onChange={(e) => {
                        handleCheckboxChange(e, "importanceFilter", "Critical");
                      }}
                    />
                    <span className="label-text text-xs">Critical</span>
                  </label>
                </div>
              </div>
              <div className="w-fit flex flex-col gap-3">
                <p className="font-semibold">Status</p>
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
              </div>
              <div className="w-fit flex flex-col gap-3">
                <p className="font-semibold">Type</p>
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
                          handleCheckboxChange(
                            e,
                            "typeFilter",
                            "Error/Bug Fix"
                          );
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
                          handleCheckboxChange(
                            e,
                            "typeFilter",
                            "Device Compatibility"
                          );
                        }}
                      />
                      <span className="label-text text-xs">
                        Device Compatibility
                      </span>
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
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
}
