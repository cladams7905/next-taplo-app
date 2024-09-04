import React from "react";
import Navbar from "../dashboard/_components/Navbar";
import Footer from "../dashboard/_components/Footer";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { getActiveProject, getProjects } from "@/lib/actions/projects";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const projects = (await getProjects(data.user.id)).data;
  const activeProject = (await getActiveProject(data.user.id)).data;

  return (
    <main>
      <Navbar
        user={data.user}
        projects={projects}
        fetchedActiveProject={activeProject}
      />
      <div className="flex flex-col h-screen-minus-navbar bg-gradient-to-tr from-primary/50 to-violet-100 font-sans dark:bg-base-100 lg:px-12 px-8 relative">
        {children}
        <Footer />
      </div>
    </main>
  );
}
