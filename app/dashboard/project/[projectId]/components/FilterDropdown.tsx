"use client";

import { Filter } from "lucide-react";
import { useState } from "react";

export default function FilterDropdown() {
  const [isImportanceAllChecked, setImportanceAllChecked] = useState(true);
  const [isStatusAllChecked, setStatusAllChecked] = useState(true);
  const [isTypeAllChecked, setTypeAllChecked] = useState(true);

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
                      defaultChecked
                      className="checkbox w-4 h-4 rounded-sm focus:border-solid"
                      onClick={() =>
                        setImportanceAllChecked(!isImportanceAllChecked)
                      }
                    />
                    <span className="label-text text-xs">All</span>
                  </label>
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      disabled={isImportanceAllChecked ? true : undefined}
                      checked={isImportanceAllChecked ? true : undefined}
                      className="checkbox w-4 h-4 rounded-sm focus:border-solid"
                    />
                    <span className="label-text text-xs">Low</span>
                  </label>
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      disabled={isImportanceAllChecked ? true : undefined}
                      checked={isImportanceAllChecked ? true : undefined}
                      className={`checkbox w-4 h-4 rounded-sm focus:border-solid`}
                    />
                    <span className="label-text text-xs">Moderate</span>
                  </label>
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      disabled={isImportanceAllChecked ? true : undefined}
                      checked={isImportanceAllChecked ? true : undefined}
                      className="checkbox w-4 h-4 rounded-sm focus:border-solid"
                    />
                    <span className="label-text text-xs">High</span>
                  </label>
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      disabled={isImportanceAllChecked ? true : undefined}
                      checked={isImportanceAllChecked ? true : undefined}
                      className="checkbox w-4 h-4 rounded-sm focus:border-solid"
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
                      onClick={() => setStatusAllChecked(!isStatusAllChecked)}
                    />
                    <span className="label-text text-xs">All</span>
                  </label>
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      disabled={isStatusAllChecked ? true : undefined}
                      checked={isStatusAllChecked ? true : undefined}
                      className="checkbox w-4 h-4 rounded-sm focus:border-solid"
                    />
                    <span className="label-text text-xs">New</span>
                  </label>
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      disabled={isStatusAllChecked ? true : undefined}
                      checked={isStatusAllChecked ? true : undefined}
                      className="checkbox w-4 h-4 rounded-sm focus:border-solid"
                    />
                    <span className="label-text text-xs">In Progress</span>
                  </label>
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      disabled={isStatusAllChecked ? true : undefined}
                      checked={isStatusAllChecked ? true : undefined}
                      className="checkbox w-4 h-4 rounded-sm focus:border-solid"
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
                        onClick={() => setTypeAllChecked(!isTypeAllChecked)}
                      />
                      <span className="label-text text-xs">All</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        disabled={isTypeAllChecked ? true : undefined}
                        checked={isTypeAllChecked ? true : undefined}
                        className="checkbox w-4 h-4 rounded-sm focus:border-solid"
                      />
                      <span className="label-text text-xs">Error/Bug Fix</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        disabled={isTypeAllChecked ? true : undefined}
                        checked={isTypeAllChecked ? true : undefined}
                        className="checkbox w-4 h-4 rounded-sm focus:border-solid"
                      />
                      <span className="label-text text-xs">Design</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        disabled={isTypeAllChecked ? true : undefined}
                        checked={isTypeAllChecked ? true : undefined}
                        className="checkbox w-4 h-4 rounded-sm focus:border-solid"
                      />
                      <span className="label-text text-xs">Usability</span>
                    </label>
                  </div>
                  <div className="w-1/2">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        disabled={isTypeAllChecked ? true : undefined}
                        checked={isTypeAllChecked ? true : undefined}
                        className="checkbox w-4 h-4 rounded-sm focus:border-solid"
                      />
                      <span className="label-text text-xs">
                        Device Compatibility
                      </span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        disabled={isTypeAllChecked ? true : undefined}
                        checked={isTypeAllChecked ? true : undefined}
                        className="checkbox w-4 h-4 rounded-sm focus:border-solid"
                      />
                      <span className="label-text text-xs">Security</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        disabled={isTypeAllChecked ? true : undefined}
                        checked={isTypeAllChecked ? true : undefined}
                        className="checkbox w-4 h-4 rounded-sm focus:border-solid"
                      />
                      <span className="label-text text-xs">Integrations</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        disabled={isTypeAllChecked ? true : undefined}
                        checked={isTypeAllChecked ? true : undefined}
                        className="checkbox w-4 h-4 rounded-sm focus:border-solid"
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
