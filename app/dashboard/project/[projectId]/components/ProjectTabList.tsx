"use client";

import { useState } from "react";

export default function ProjectTabList() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  return (
    <div role="tablist" className="tabs lg:max-w-lg">
      <a
        role="tab"
        tabIndex={0}
        className={`tab ${
          currentTab === 0 ? "tab-active font-semibold" : "text-gray-500"
        }`}
        onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
      >
        Dashboard
      </a>
      <a
        role="tab"
        tabIndex={1}
        className={`tab ${
          currentTab === 1 ? "tab-active font-semibold" : "text-gray-500"
        }`}
        onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
      >
        Settings
      </a>
    </div>
  );
}
