import Navbar from "./_components/Navbar";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { getActiveProject, getProjects } from "@/lib/actions/projects";
import { getProduct, getSubscription } from "@/stripe/actions";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData?.user) {
    redirect("/");
  }
  const projects = (await getProjects(userData.user.id)).data;
  const activeProject = (await getActiveProject(userData.user.id)).data;

  const { data: subscriptionData } = await getSubscription(userData.user.id);
  const { data: productData } = await getProduct(subscriptionData.product_id);

  return (
    <main>
      <Navbar
        user={userData.user}
        projects={projects}
        fetchedActiveProject={activeProject}
        paymentPlan={productData.name}
      />
      <div className="flex flex-col h-screen-minus-navbar bg-gradient-to-tr from-primary/50 to-violet-100 dark:bg-base-100 relative">
        <div className="flex flex-col w-full h-full font-sans relative">
          {children}
        </div>
      </div>
    </main>
  );
}
