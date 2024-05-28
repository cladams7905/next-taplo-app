"use client";

import React from "react";
import UserDropdown from "@/components/layout/Navbar/UserDropdown";
import { User } from "@supabase/supabase-js";
import { ChevronsUpDown, Menu } from "lucide-react";
import ProjectDropdown from "./ProjectDropdown";

export default function DashboardNavbar(data: { user: User }) {
  return (
    <main>
      <div className='navbar bg-base-100 fixed lg:px-6 font-sans text-gray-500"bg-white/0" z-30 transition-all border-b border-gray-200'>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <Menu color="oklch(var(--pc))" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content border border-gray-200 z-[1] p-2 shadow bg-base-100 rounded-md w-52"
            >
              <li>
                <a>Suggest a feature!</a>
              </li>
              <li>
                <a>Help</a>
              </li>
            </ul>
          </div>
          {/* <Logo/> */}
          <div className="ml-2">TapInsight.io</div>
          <div className="text-gray-300 text-xl ml-6 font-thin">/</div>
          <ul className="menu menu-horizontal">
            <div className="dropdown">
              <li className="text-sm text-primary-content mr-1" tabIndex={1}>
                <a>
                  {" "}
                  Untitled Project{" "}
                  <ChevronsUpDown
                    height={16}
                    width={16}
                    strokeWidth={1}
                    color="oklch(var(--pc))"
                  />
                </a>
              </li>
              <div
                className="dropdown-content border mt-1 border-gray-200 z-[1] p-2 shadow bg-base-100 rounded-md w-52"
                tabIndex={1}
              >
                <ProjectDropdown />
              </div>
            </div>
          </ul>
        </div>
        <div className="navbar-end">
          <ul
            tabIndex={0}
            className="menu menu-horizontal px-1 mr-4 hidden lg:flex"
          >
            <li>
              <a>Suggest a feature!</a>
            </li>
            <li>
              <a>Help</a>
            </li>
          </ul>
          <UserDropdown user={data.user} />
        </div>
      </div>
    </main>
  );
}
