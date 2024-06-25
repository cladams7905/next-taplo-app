import { createClient } from "@/app/supabase/server";
import { redirect } from "next/navigation";

export default async function CreatePopupPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return <>Settings</>;
}
