import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  return (
    <div className="flex flex-row h-screen-minus-navbar w-full px-12 lg:px-48">
      <div className="flex flex-col w-1/4 h-full">Test</div>
      <div className="flex flex-col w-3/4 h-full border border-gray-200 bg-base-100 rounded-md"></div>
    </div>
  );
}
