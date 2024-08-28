"use client";

import useScroll from "@/lib/hooks/use-scroll";

import s from "./Navbar.module.css";
import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/Taplo-logo (1).svg";

export default function Navbar() {
  return (
    <main>
      <div
        className={`navbar fixed lg:px-20 w-screen font-sans shadow-sm bg-white backdrop-blur-lg border-b border-gray-200 z-30 transition-all`}
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
                <a>Login</a>
              </li>
              <li>
                <a>Features</a>
              </li>
              <li>
                <a>Pricing</a>
              </li>
              <li>
                <a>FAQs</a>
              </li>
            </ul>
          </div>
          <div className="ml-2 font-bold font-logo text-xl mr-2">Taplo</div>
          <Image width={40} height={40} alt="logo" src={Logo} />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Features</a>
            </li>
            <li>
              <a>Pricing</a>
            </li>
            <li>
              <a>FAQs</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end mr-4">
          <Link href={"/login"} className="lg:block md:block hidden">
            <div className="btn btn-neutral font-sans btn-ghost btn-sm max-w-fit">
              Login
            </div>
          </Link>
          <Link href={"/signup"}>
            <div className="btn btn-primary font-sans text-white btn-sm max-w-fit ml-2">
              Try for free
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
