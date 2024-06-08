import SignInForm from "../components/SignInForm";
import OAuthForm from "../components/OAuthForm";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getRedirectPathname } from "../actions";

export default async function Login() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (!error && data?.user) {
    redirect(await getRedirectPathname(data.user.id));
  }

  return (
    <main className="bg-gradient-to-br from-slate-100 via-white to-cyan-100">
      <div className="navbar fixed lg:px-6 font-sans text-gray-500 ">
        <div className="navbar-start">
          {/* <Logo/> */}
          <div className="ml-2">TapInsight</div>
        </div>
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between p-24 font-sans">
        <div className="flex flex-col items-center justify-center w-full max-w-md">
          <p className="font-bold text-4xl mb-4">Welcome back</p>
          <p className="">
            Don&apos;t have an account?{" "}
            <Link href={"/auth/signup"}>
              <span className="link link-primary link-hover">Sign up</span>
            </Link>
          </p>
          <SignInForm />
          <OAuthForm />
          <p className="mt-6 text-sm">
            By continuing, you agree to our{" "}
            <span className="link">Terms of Use</span> and{" "}
            <span className="link">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </main>
  );
}
