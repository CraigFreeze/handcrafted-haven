import React from "react";
import Link from "next/link";
import styles from "./Sidenav.module.css";

function Sidenav() {
  return (
    <nav className={styles.sidenav} aria-label="Profile navigation">
      <h2 className={styles.sidenavTitle}>Profile Management</h2>
      <ul className={styles.sidenavList}>
        <li>
          <Link
            className={styles.sidenavLink}
            href="/profile/create-listing"
            aria-label="Create a new listing"
          >
            Create Listing
          </Link>
        </li>
        <li>
          <Link
            className={styles.sidenavLink}
            href="/profile/update-listing"
            aria-label="Update an existing listing"
          >
            Remove and View Listing
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidenav;
