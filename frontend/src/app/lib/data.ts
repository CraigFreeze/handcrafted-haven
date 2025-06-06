import postgres from "postgres";
import { Product, ProductWithRating, Rating, User } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchProducts() {
  try {
    const data = await sql<Product[]>`
  SELECT * FROM products
`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchProductsWithRating() {
  try {
    const data = await sql<ProductWithRating[]>`
      SELECT 
        products.id,
        products.user_id,
        products.title,
        products.category,
        products.price,
        products.description,
        products.image_url,
        ROUND(AVG(ratings.star_rating)::numeric, 1) AS average_rating
      FROM products
      LEFT JOIN ratings ON products.id = ratings.product_id
      GROUP BY products.id
    `;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products with ratings.");
  }
}

export async function fetchRatings() {
  try {
    const data = await sql<Rating[]>`
  SELECT * FROM ratings
`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchUsers() {
  try {
    const data = await sql<User[]>`
  SELECT * FROM users
`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}
