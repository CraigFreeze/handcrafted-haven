import styles from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <section className={styles.aboutUsSection}>
      <h2 className={styles.heading}>What is Handcrafted Haven?</h2>
      
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3>A community doing good</h3>
          <p>
            Handcrafted Haven is a global online marketplace, where people come together to make, sell, buy, and collect unique items. We're also a community pushing for positive change for small businesses, people, and the planet. Here are some of the ways we're making a positive impact, together.
          </p>
        </div>
        <div className={styles.column}>
          <h3>Support independent creators</h3>
          <p>
            There’s no big warehouse—just millions of people selling the things they love. We make the whole process easy, helping you connect directly with makers to find something extraordinary.
          </p>
        </div>
        <div className={styles.column}>
          <h3>Peace of mind</h3>
          <p>
            Your privacy is the highest priority of our dedicated team. And if you ever need assistance, we are always ready to step in for support.
          </p>
        </div>
      </div>
      <div className={styles.helpCenter}>
        <span>Have a question? Well, we’ve got some answers.</span>

      </div>
    </section>
  );
}