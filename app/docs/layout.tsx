import Image from "next/image";
import React from "react";
import Logo from "@/public/images/TaploLogo.svg";
import Link from "next/link";

export default async function DocsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative h-screen w-screen bg-gradient-to-tr from-purple-200 via-primary/80 to-purple-100">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100"></div>
      <div className="relative flex flex-col h-screen font-sans md:px-24">
        <div className="flex h-full flex-col gap-6 px-6 overflow-y-scroll bg-white border-x border-gray-300 pb-6">
          <Link href="/docs" className="w-fit">
            <div className="flex flex-col my-4">
              <div className="flex items-center">
                <Image width={36} height={36} alt="logo" src={Logo} />
                <div className="ml-2 font-bold font-logo text-xl mr-4">
                  Taplo
                </div>
                <div className="text-sm text-primary font-extrabold font-logo mt-[5px] uppercase">
                  docs
                </div>
              </div>
              <div className="font-sans text-gray-500 text-xs ml-[46px]">
                Last updated: 10/09/2024
              </div>
            </div>
          </Link>
          {children}
        </div>
      </div>
    </main>
  );
}
