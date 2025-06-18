import Image from "next/image";
import styles from "./page.module.css";
import HeroCard from "./ui/HeroCard";
import ProductCard from "./ui/ProductCard";
import AboutUs from "./ui/AboutUs";
import Search from "./ui/Search";
import { signOut } from "@/auth";

import { Suspense } from "react";

import "./page.css";
import { fetchFilteredProductsWithRating } from "@/app/lib/data";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : {};
  const query = searchParams?.query || "";
  const products = (await fetchFilteredProductsWithRating(query)) || [];

  return (
    <div className={styles.page}>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          {/* <PowerIcon className="w-6" /> */}
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
      <main className={styles.main}>
        <HeroCard />
        <section className="product-section">
          <h2>Products</h2>
          <Search placeholder="Search invoices..." />

          <Suspense fallback={<div>Loading...</div>}>
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
            {/* <Products query={query} /> */}
          </Suspense>
        </section>
        <AboutUs />
      </main>
    </div>
  );
}
