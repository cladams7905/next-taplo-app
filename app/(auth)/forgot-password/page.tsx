import React from "react";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/TaploLogoDark.svg";

export default async function ForgotPassword() {
  return (
    <main className="relative bg-slate-50">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] z-[0]"></div>
      <div className="relative navbar lg:px-20 font-sans">
        <Link href={"/"}>
          <div className="navbar-start ml-8 w-full flex items-center">
            <Image width={34} height={34} alt="logo" src={Logo} />
            <div className="font-bold font-logo text-xl mx-4">Taplo</div>
          </div>
        </Link>
      </div>
      <div className="flex relative min-h-screen w-full flex-col items-center justify-between sm:px-24 px-8 sm:pt-24 font-sans">
        <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200 my-8 mb-16">
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
