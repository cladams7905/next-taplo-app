import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { CreditCard, Pencil, Settings, UserRoundCog } from "lucide-react";

export default async function AccountPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center w-full pt-6 h-full">
      <div className="lg:max-w-[70vw] w-full h-full flex bg-white rounded-lg border border-gray-300"></div>
    </div>
  );
}
