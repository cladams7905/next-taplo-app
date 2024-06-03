import RegisterForm from "../components/RegisterForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getRedirectPathname } from "../actions";

export default async function Signup() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (!error && data?.user) {
    redirect(`${origin}${await getRedirectPathname(data.user.id)}`);
  }

  return (
    <main className="bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <div className="navbar fixed lg:px-6 font-sans text-gray-500 ">
        <div className="navbar-start">
          {/* <Logo/> */}
          <div className="ml-2">TapInsight</div>
        </div>
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between p-24 font-sans">
        <RegisterForm />
      </div>
    </main>
  );
}
