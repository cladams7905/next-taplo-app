"use client";

import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/Taplo-logo (1).svg";
import React from "react";
import LaunchOfferBadge from "./LaunchOfferBadge";

export default function Navbar() {
  return (
    <div className="fixed w-screen font-sans shadow-sm bg-white/80 backdrop-blur-xl z-30 transition-all">
      <LaunchOfferBadge />
      <main>
        <div className={`navbar lg:px-20`}>
          <div className="navbar-start">
            <label
              htmlFor="drawer-menu"
              aria-label="open sidebar"
              className="btn btn-ghost lg:hidden"
            >
              <Menu color="#6b7280" />
            </label>
            <Image width={36} height={36} alt="logo" src={Logo} />
            <div className="ml-2 font-bold font-logo text-xl mr-2">Taplo</div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-semibold">
              <li>
                <Link href={"#key-features"} className="focus:bg-link-hover">
                  Features
                </Link>
              </li>
              <li>
                <Link href={"#pricing"} className="focus:bg-link-hover">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href={"#faqs"} className="focus:bg-link-hover">
                  FAQs
                </Link>
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
              <div className="btn btn-primary btn-outline font-sans text-white btn-sm max-w-fit ml-2">
                Try for free
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
