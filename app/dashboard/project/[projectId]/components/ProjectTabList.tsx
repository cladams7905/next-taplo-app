"use client";

import { useState } from "react";

export default function ProjectTabList() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  return (
    <div
      role="tablist"
      className="tabs tabs-boxed w-fit bg-base-100 lg:ml-48 p-2 border border-gray-200 dark:border-gray-600"
    >
      <a
        role="tab"
        tabIndex={0}
        className={`tab w-32 ${
          currentTab === 0 ? "tab-active font-semibold" : "text-gray-500"
        }`}
        onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
      >
        Dashboard
      </a>
      <a
        role="tab"
        tabIndex={1}
        className={`tab w-32 ${
          currentTab === 1 ? "tab-active font-semibold" : "text-gray-500"
        }`}
        onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
      >
        Feedback board
      </a>
      <a
        role="tab"
        tabIndex={2}
        className={`tab w-32 ${
          currentTab === 2 ? "tab-active font-semibold" : "text-gray-500"
        }`}
        onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
      >
        Settings
      </a>
    </div>
  );
}
