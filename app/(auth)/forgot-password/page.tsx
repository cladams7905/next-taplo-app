import React from "react";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/Taplo-logo (2).svg";

export default async function ForgotPassword() {
  return (
    <main className="bg-gradient-to-tr from-purple-200 via-primary/60 to-purple-100">
      <div className="navbar lg:px-20 font-sans">
        <Link href={"/"}>
          <div className="navbar-start ml-8 w-full flex items-center">
            <Image width={36} height={36} alt="logo" src={Logo} />
            <div className="font-bold font-logo text-xl mx-2">Taplo</div>
          </div>
        </Link>
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between sm:px-24 px-8 sm:pt-24 font-sans">
        <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-lg border border-gray-200 my-8 mb-16">
          <p className="font-logo text-center text-3xl mb-4">
            Enter Your Email
          </p>
          <p>An email will be sent to you with a reset password link.</p>
          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
}
