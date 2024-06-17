import { HelpCircle } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="footer font-sans w-full flex justify-end text-base-content lg:px-48">
      <aside>
        <ul tabIndex={0} className="menu menu-horizontal">
          <li>
            <a>Suggest a feature</a>
          </li>
          <li>
            <a>Help</a>
          </li>
        </ul>
      </aside>
    </footer>
  );
}
