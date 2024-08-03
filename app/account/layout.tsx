import React from "react";
import Navbar from "../dashboard/_components/Navbar";
import Footer from "../dashboard/_components/Footer";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <main>
      <Navbar user={data.user} />
      <div className="flex flex-col h-screen-minus-navbar bg-gray-100 dark:bg-base-100 lg:px-12 px-8 relative">
        {children}
        <Footer />
      </div>
    </main>
  );
}
