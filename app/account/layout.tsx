import React from "react";
import Navbar from "../dashboard/_components/Navbar";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveProject, getProjects } from "@/lib/actions/projects";
import { getProduct, getSubscription } from "@/lib/stripe/actions";
import Link from "next/link";
import RenewSubscriptionBanner from "./_components/RenewSubscriptionBanner";
import { fetchToken } from "@/lib/actions/featuresvote";

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

  const { data: projects } = await getProjects(data.user.id);
  const { data: activeProject } = await getActiveProject(data.user.id);

  const { data: subscription } = await getSubscription(data.user.id);
  const { data: product } = subscription?.product_id
    ? await getProduct(subscription.product_id)
    : { data: null };
  const featuresVoteToken = await fetchToken(data.user);

  return (
    <main>
      <div className="drawer flex flex-col overflow-x-clip">
        <input id="drawer-menu" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Navbar
            user={data.user}
            projects={projects}
            fetchedActiveProject={activeProject}
            featuresVoteToken={featuresVoteToken}
            paymentPlan={product?.name ?? null}
            subscription={subscription}
          />
          <div className="flex flex-col h-screen-minus-navbar bg-slate-50 font-sans dark:bg-base-100 relative">
            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            {subscription?.status === "canceled" && <RenewSubscriptionBanner />}
            {children}
          </div>
        </div>
        <div className="drawer-side z-[99]">
          <label
            htmlFor="drawer-menu"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {activeProject && (
            <ul className="menu bg-white min-h-full w-80 p-4 text-lg font-sans">
              <li>
                <Link href={`/dashboard/project/${activeProject.id}/create`}>
                  Create
                </Link>
              </li>
              <li>
                <Link href={`/dashboard/project/${activeProject.id}/connect`}>
                  Connect
                </Link>
              </li>
              <li>
                <button className="relative flex w-full items-center justify-start">
                  Insights
                  <div className="absolute right-0 badge badge-primary bg-primary/20 border-none text-primary text-xs">
                    Coming soon!
                  </div>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
