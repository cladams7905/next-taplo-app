import React from "react";
import Navbar from "./components/DashboardNavbar";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Footer from "./components/DashboardFooter";
import { getActiveProject, getProjectsByUserId } from "./actions";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  const currentProjects =
    JSON.parse(await getProjectsByUserId(data.user.id))?.data || [];

  const activeProject = JSON.parse(await getActiveProject(data.user.id))?.data;

  return (
    <main>
      <Navbar
        user={data.user}
        projects={currentProjects}
        fetchedActiveProject={activeProject}
      />
      <div className="flex flex-col h-screen-minus-navbar bg-slate-100 px-8 pt-5 relative">
        {children}
        <Footer />
      </div>
    </main>
  );
}
