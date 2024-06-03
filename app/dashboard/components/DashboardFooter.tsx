import { HelpCircle } from "lucide-react";
import React from "react";

export default function DashboardFooter() {
  return (
    <footer className="footer flex justify-end fixed bottom-0 px-4 text-base-content">
      <aside>
        <ul tabIndex={0} className="menu menu-horizontal hidden lg:flex">
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