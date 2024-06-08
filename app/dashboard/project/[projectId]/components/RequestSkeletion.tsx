import React from "react";

export default function RequestSkeletion() {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="skeleton bg-gray-100 w-full h-16"></div>
      <div className="skeleton bg-gray-100 w-4/5 h-16"></div>
      <div className="skeleton bg-gray-100 w-2/3 h-16"></div>
      <div className="skeleton bg-gray-100 w-1/2 h-16"></div>
    </div>
  );
}
