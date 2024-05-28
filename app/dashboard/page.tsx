import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./DashboardNavbar";
import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <Navbar user={data.user} />
    </main>
  );
}
