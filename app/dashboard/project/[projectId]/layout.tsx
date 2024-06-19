import React from "react";
import ProjectTabList from "./components/ProjectTabList";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
