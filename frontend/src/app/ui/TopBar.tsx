import React from "react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import "./TopBar.css";
import Link from "next/link";
import SignOut from "./SignOut";

export default function TopBar() {
  return (
    <header className="topbar">
      <Link className="topbar-logo" href={"/"}>
        Handcrafted Haven
      </Link>
      <div className="topbar-actions">
        <Link href={"/profile"}>
          <FaUserCircle className="topbar-icon" />
        </Link>
        <Link href={"/cart"}>
          <FaShoppingCart className="topbar-icon" />
        </Link>

        <Link className="topbar-signin" href="/login">
          Sign In
        </Link>
        <SignOut />
      </div>
    </header>
  );
}
