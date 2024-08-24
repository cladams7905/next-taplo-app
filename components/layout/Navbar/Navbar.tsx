"use client";

import useScroll from "@/lib/hooks/use-scroll";

import s from "./Navbar.module.css";
import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const scrolled = useScroll(20);

  return (
    <main>
      <div
        className={`navbar bg-base-100 fixed lg:px-20 font-sans shadow-sm ${
          scrolled
            ? "backdrop-blur-2xl bg-gradient-to-b from-white to-primary/5"
            : "bg-white/90 backdrop-blur-lg"
        } z-30 transition-all`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <Menu color="#6b7280" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 font-sans rounded-box w-52"
            >
              <li>
                <a>Features</a>
              </li>
              <li>
                <a>Wall of Love</a>
              </li>
              <li>
                <a>Pricing</a>
              </li>
            </ul>
          </div>
          {/* <Logo/> */}
          <div className="ml-2 font-bold font-logo text-xl">Taplo</div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Features</a>
            </li>
            <li>
              <a>Wall of Love</a>
            </li>
            <li>
              <a>Pricing</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link href={"/login"}>
            <div className="btn btn-neutral btn-ghost btn-sm max-w-fit">
              Login
            </div>
          </Link>
          <Link href={"/signup"}>
            <div className="btn btn-primary text-white btn-sm max-w-fit ml-2">
              Try for free
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
