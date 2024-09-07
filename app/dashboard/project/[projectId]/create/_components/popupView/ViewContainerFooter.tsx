"use client";

import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useState, useEffect, useRef } from "react";
import ContactModal from "./ContactModal";
import Link from "next/link";
import { useProjectContext } from "../ProjectBoard";

export default function ViewContainerFooter() {
  const [token, setToken] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const contactModalRef = useRef<HTMLDialogElement>(null);
  const { user } = useProjectContext();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch("/api/v1/features_vote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user,
          }),
        });
        const data = await res.json();

        setToken(data.token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, [user]);

  return (
    <div className="flex absolute bottom-0 right-0 w-full justify-end items-end px-5">
      <div tabIndex={0} className="dropdown dropdown-end dropdown-top -mr-2">
        <div
          className="tooltip tooltip-top tooltip-info p-2 rounded-lg cursor-pointer hover:bg-primary/20"
          data-tip="Help"
        >
          <QuestionMarkCircledIcon width={20} height={20} />
        </div>
        <ul
          tabIndex={0}
          ref={dropdownRef}
          className={`menu menu-sm dropdown-content border border-gray-300 z-[10] shadow-md bg-base-100 rounded-md min-w-44 p-2`}
        >
          <li>
            <Link
              href={
                token ? `https://taplo.features.vote/board?token=${token}` : "#"
              }
              target="_blank"
              className="flex flex-col items-start rounded-md"
            >
              <div className="flex items-center gap-2 py-1">
                Suggest a feature
              </div>
            </Link>
          </li>
          <li>
            <a
              className="flex flex-col items-start rounded-md"
              onClick={() => {
                contactModalRef.current?.classList.remove("hidden");
                contactModalRef.current?.showModal();
              }}
            >
              <div className="flex items-center gap-2 py-1">Contact</div>
            </a>
          </li>
        </ul>
      </div>
      <ContactModal modalRef={contactModalRef} />
    </div>
  );
}
