import Navbar from "./_components/Navbar";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { getActiveProject, getProjects } from "@/lib/actions/projects";

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
  const projects = (await getProjects(data.user.id)).data;
  const activeProject = (await getActiveProject(data.user.id)).data;

  return (
    <main>
      <Navbar
        user={data.user}
        projects={projects}
        fetchedActiveProject={activeProject}
      />
      <div className="flex flex-col h-screen-minus-navbar bg-gradient-to-tr from-primary/50 to-violet-100 dark:bg-base-100 relative">
        <div className="flex flex-col w-full h-full font-sans relative">
          {children}
        </div>
      </div>
    </main>
  );
}
