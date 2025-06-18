import { auth } from "@/auth";
import { fetchProducts } from "@/app/lib/data";
import { fetchUserById } from "@/app/lib/fetchUserById";
import DeleteForm from "@/app/ui/profile/UpdateListing/DeleteForm";
import React from "react";
import styles from "./page.module.css";

export default async function UpdateListingPage() {
  const session = await auth();
  const userId = session?.user?.id || "";
  const user = userId ? await fetchUserById(userId) : null;
  const role = user?.role || "user";

  if (role !== "artisan") {
    return (
      <main className={styles.updateListingPage}>
        <h1>Remove and View Listing</h1>
        <p>Only artisans can update listings.</p>
      </main>
    );
  }

  const products = (await fetchProducts()) || [];
  const myProducts = products.filter((p) => p.user_id === userId);

  return (
    <main className={styles.updateListingPage}>
      <h1>Remove and View Listing</h1>
      {myProducts.length === 0 ? (
        <p>You have no listings yet.</p>
      ) : (
        <ul>
          {myProducts.map((product) => (
            <li key={product.id}>
              <strong>{product.title}</strong> <br />
              <span>Category: {product.category}</span> <br />
              <span>Price: ${Number(product.price).toFixed(2)}</span> <br />
              <span>Description: {product.description}</span> <br />
              <span>
                Image:{" "}
                <a
                  href={product.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </span>{" "}
              <br />
              <DeleteForm product={product} userId={userId} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
