import Link from "next/link";
import OAuthForm from "../components/OAuthForm";
import RegisterForm from "../components/RegisterForm";

export default function Signup() {
  return (
    <main className="bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <div className="navbar fixed lg:px-6 font-sans text-gray-500 ">
        <div className="navbar-start">
          {/* <Logo/> */}
          <div className="ml-2">TapInsight</div>
        </div>
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between p-24 font-sans">
        <div className="flex flex-col items-center justify-center w-full max-w-md">
          <p className="font-bold text-4xl mb-4">Get started for free!</p>
          <p className="">
            Already have an account?{" "}
            <Link href={"/auth/login"}>
              <span className="link link-primary link-hover">Login</span>
            </Link>
          </p>
          <RegisterForm />
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
