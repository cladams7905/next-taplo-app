import React from "react";
import Navbar from "./components/DashboardNavbar";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Footer from "./components/DashboardFooter";
import { getActiveProject, getProjectsByUserId } from "./actions";

export default async function RootLayout({
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
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
        <div className="px-36 mt-32">{children}</div>
      </div>
      <Footer />
    </main>
  );
}
