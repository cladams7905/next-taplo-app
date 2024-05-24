import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProjectsPage() {
  const { data } = await readUserSession();
  if (!data.session) {
    return redirect("/");
  }

  return <div>Projects</div>;
}
