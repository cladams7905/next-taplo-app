import React, { Suspense } from "react";
import Navbar from "./components/Navbar";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Footer from "./components/Footer";
import { getProjectsByUserId } from "@/lib/actions/projects";
import { getActiveProject } from "@/lib/actions/sessionData";
import { revalidatePath } from "next/cache";
import Loading from "./project/[projectId]/loading";

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

  revalidatePath("/dashboard/project");
  const currentProjects = (await getProjectsByUserId(data.user.id))?.data || [];
  const activeProject = (await getActiveProject(data.user.id))?.data;

  return (
    <main>
      <Navbar
        user={data.user}
        projects={currentProjects}
        fetchedActiveProject={activeProject}
      />
      <div className="flex flex-col h-screen-minus-navbar bg-slate-50 px-8 relative">
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer />
      </div>
    </main>
  );
}
