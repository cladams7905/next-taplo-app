import RegisterForm from "../_components/RegisterForm";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { getRedirectPathname } from "../_actions";

export default async function Signup() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (!error && data?.user) {
    redirect(await getRedirectPathname(data.user.id));
  }

  return (
    <main className="bg-gradient-to-br from-primary/5 via-white to-secondary/45">
      <div className="navbar fixed lg:px-20 font-sans">
        <div className="navbar-start">
          {/* <Logo/> */}
          <div className="ml-2 font-bold">TapInsight</div>
        </div>
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between p-24 font-sans">
        <RegisterForm />
      </div>
    </main>
  );
}
