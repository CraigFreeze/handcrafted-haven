import styles from "./page.module.css";
import React from "react";

function page() {
  return (
    <section className={styles.profileWelcome}>
      <h1>Welcome to Your Profile</h1>
      <p>
        Here you can manage your listings, update your information, and explore
        your artisan dashboard. Enjoy your experience on Handcrafted Haven!
      </p>
    </section>
  );
}

export default page;
