"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React from "react";

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="oklch(var(--bc))"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBarProvider;
