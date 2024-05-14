'use client';

import useSignInModal from "@/components/layout/SignInModal";
import UserDropdown from './UserDropdown';
import { Session } from '@supabase/supabase-js';
import { Logo } from "@/components/shared/icons/logo";

import s from './Navbar.module.css';

export default function Navbar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <div className="navbar bg-base-100 fixed lg:px-6 border-b z-50 font-sans">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Features</a></li>
        <li><a>FAQs</a></li>
        <li><a>Contact</a></li>
      </ul>
    </div>
    <Logo/>
    <div className="font-heading text-secondary ml-2 text-xl">Prepple</div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        <li><a>Features</a></li>
        <li><a>FAQs</a></li>
        <li><a>Contact</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <div className="join hidden lg:flex">
      <input type="text" placeholder="me@email.com" className="input input-bordered input-secondary join-item w-full max-w-xs" />
      <a className="btn btn-secondary join-item">Subscribe</a>
    </div>
  </div>
</div>
  </>
  );
}