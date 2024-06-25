import { getUserToasts } from "@/lib/actions/userToasts";
import ToastBoard from "./components/ToastBoard";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function CreatePopupPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  const userToasts = (await getUserToasts(data.user.id)).data;

  return <ToastBoard userToasts={userToasts} />;
}
