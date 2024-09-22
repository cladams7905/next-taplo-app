import Navbar from "./_components/Navbar";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { getActiveProject, getProjects } from "@/lib/actions/projects";
import { getProduct, getSubscription } from "@/stripe/actions";
import Link from "next/link";
import { getURL } from "@/lib/actions";

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

  const { data: subscriptionData } = await getSubscription(userData?.user.id);
  const { data: productData } = subscriptionData?.product_id
    ? await getProduct(subscriptionData.product_id)
    : { data: null };

  return (
    <main>
      <div className="drawer flex flex-col overflow-x-clip">
        <input id="drawer-menu" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Navbar
            user={userData.user}
            projects={projects}
            fetchedActiveProject={activeProject}
            paymentPlan={productData?.name ?? null}
          />
          <div className="flex flex-col md:h-screen-minus-navbar h-screen bg-gradient-to-tr from-primary/50 to-violet-100 dark:bg-base-100 relative">
            {subscriptionData?.status === "canceled" && (
              <div className="w-full bg-error font-sans text-white text-sm text-center inline-block items-center px-12 py-2 justify-center">
                Your subscription has expired. Please{" "}
                <Link
                  href={
                    getURL().includes("taplo")
                      ? "https://billing.stripe.com/p/login/fZeeVR24I5pC1UY288"
                      : "https://billing.stripe.com/p/login/test_14kdUs06T5fha9q000"
                  }
                  target="_blank"
                  className="link px-1"
                >
                  renew your subscription
                </Link>{" "}
                to continue using Taplo.
              </div>
            )}
            <div className="flex flex-col w-full h-full font-sans relative">
              {children}
            </div>
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
