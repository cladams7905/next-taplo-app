import React from "react";
import Navbar from "../dashboard/_components/Navbar";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { getActiveProject, getProjects } from "@/lib/actions/projects";
import { getProduct, getSubscription } from "@/stripe/actions";

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

  const { data: subscriptionData } = await getSubscription(data.user.id);
  const { data: productData } = await getProduct(subscriptionData.product_id);

  return (
    <main>
      <Navbar
        user={data.user}
        projects={projects}
        fetchedActiveProject={activeProject}
        paymentPlan={productData.name}
      />
      <div className="flex flex-col h-screen-minus-navbar bg-gradient-to-tr from-primary/50 to-violet-100 font-sans dark:bg-base-100 lg:px-12 px-8 relative">
        {children}
      </div>
    </main>
  );
}
