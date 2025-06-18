import React from "react";
import { signOut } from "@/auth";
import styles from "./SignOut.module.css";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button className={styles.signOutButton}>
        {/* <PowerIcon className="w-6" /> */}
        <div className={styles.signOutText}>Sign Out</div>
      </button>
    </form>
  );
}

export default SignOut;
