import Image from "next/image";
import styles from "./page.module.css";
import HeroCard from "./ui/HeroCard";
import ProductCard from "./ui/ProductCard";
import AboutUs from "./ui/AboutUs";
import "./page.css";
import { fetchProductsWithRating } from "@/app/lib/data";

export default async function Home() {
  const products = await fetchProductsWithRating();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroCard />
        <section className="product-section">
          <h2>New Products</h2>
          <div className="products">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                rating={product.average_rating}
                photoSrc={product.image_url}
              />
            ))}
          </div>
        </section>
        <AboutUs />
      </main>
    </div>
  );
}
