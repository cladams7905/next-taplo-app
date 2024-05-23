"use client";

import { Session } from "@supabase/supabase-js";
import { Logo } from "@/components/shared/icons/logo";
import useScroll from "@/lib/hooks/use-scroll";

import s from "./Navbar.module.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Navbar({ session }: { session: Session | null }) {
  const scrolled = useScroll(50);

  return (
    <main>
      <div
        className={`navbar bg-base-100 fixed lg:px-6 font-sans text-gray-500 ${
          scrolled
            ? "border-b border-gray-200 bg-white/80 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Features</a>
              </li>
              <li>
                <a>FAQs</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </div>
          {/* <Logo/> */}
          <div className="ml-2">TapInsight</div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Features</a>
            </li>
            <li>
              <a>FAQs</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link href={"/auth/login"}>
            <div className="btn btn-outline btn-sm max-w-fit">Login</div>
          </Link>
          <Link href={"auth/signup"}>
            <div className="btn btn-primary btn-sm max-w-fit ml-2">
              Try for free
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
