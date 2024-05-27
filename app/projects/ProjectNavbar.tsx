"use client";

import React from "react";
import { signOut } from "../auth/actions";

export default function ProjectNavbar() {
  return (
    <div className="btn btn-primary" onClick={() => signOut()}>
      Logout
    </div>
  );
}
