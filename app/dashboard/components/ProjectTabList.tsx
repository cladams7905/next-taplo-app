"use client";

import { useState } from "react";

export default function ProjectTabList({ isHidden }: { isHidden: boolean }) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  return (
    <>
      {!isHidden && (
        <div role="tablist" className="tabs tabs-bordered lg:max-w-lg">
          <a
            role="tab"
            tabIndex={0}
            className={`tab ${
              currentTab === 0
                ? "tab-active font-semibold !border-primary"
                : "!border-none text-gray-500"
            }`}
            onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
          >
            Analytics
          </a>
          <a
            role="tab"
            tabIndex={1}
            className={`tab ${
              currentTab === 1
                ? "tab-active font-semibold !border-primary"
                : "!border-none text-gray-500"
            }`}
            onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
          >
            Widgets
          </a>
          <a
            role="tab"
            tabIndex={2}
            className={`tab ${
              currentTab === 2
                ? "tab-active font-semibold !border-primary mt-0"
                : "!border-none text-gray-500"
            }`}
            onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
          >
            Settings
          </a>
        </div>
      )}
    </>
  );
}
