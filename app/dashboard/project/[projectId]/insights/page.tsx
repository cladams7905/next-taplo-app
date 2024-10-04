import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function InsightsPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-gradient-to-tr from-primary/50 to-violet-100 h-screen-minus-navbar w-full lg:px-12">
      <div className="h-full lg:w-2/3 w-3/4 bg-white border border-neutral border-t-0 p-4 flex shadow-md">
        Insights
      </div>
    </div>
  );
}
