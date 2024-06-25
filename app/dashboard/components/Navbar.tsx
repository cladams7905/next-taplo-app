"use client";

import UserDropdown from "./UserDropdown";
import { User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";
import Tablist from "./NavbarTablist";

export default function Navbar({ user }: { user: User }) {
  return (
    <main className="flex flex-col items-center w-full font-sans z-30 px-3 transition-all border-b border-neutral dark:bg-base-100 shadow-md bg-white">
      <div className="navbar flex">
        <div className="navbar-start">
          <label
            role="button"
            className="flex ml-2 mr-6 lg:hidden drawer-button"
            htmlFor="sidebar-drawer"
          >
            <Menu color="oklch(var(--bc))" />
          </label>
          <div className="font-bold">ToastJam</div>
        </div>
        <div className="navbar-center hidden lg:block lg:mt-[2px]">
          <Tablist />
        </div>
        <div className="navbar-end">
          <UserDropdown user={user} />
        </div>
      </div>
    </main>
  );
}
