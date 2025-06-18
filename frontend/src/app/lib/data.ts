import postgres from "postgres";
import { Product, Rating, User } from "./definitions";

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

export async function fetchProductById(id: string) {
  try {
    const data = await sql<Product[]>`
  SELECT 
        products.id,
        products.title,
        products.user_id,
        products.category,
        products.price,
        products.description,
        products.image_url,
        users.public_name
      FROM products
      JOIN users ON products.user_id = users.id
      WHERE products.id = ${id}
`;
    return data[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchFilteredProductsWithRating(query: string) {
  try {
    const data = await sql<Product[]>`
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
  WHERE
    products.title ILIKE ${`%${query}%`} OR
    products.category ILIKE ${`%${query}%`} OR
    products.description ILIKE ${`%${query}%`} OR
    products.price::text ILIKE ${`%${query}%`}
  GROUP BY products.id
`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch products with ratings.");
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

export async function fetchRatingsAndReviewsByID(id: string) {
  try {
    const data = await sql<Rating[]>`
  SELECT 
        ratings.id,
        ratings.product_id,
        ratings.user_id,
        ratings.title,
        ratings.star_rating,
        ratings.review,
        ratings.created_at,
        users.public_name
      FROM ratings
      JOIN users ON ratings.user_id = users.id
      WHERE ratings.product_id = ${id}
      ORDER BY ratings.created_at DESC
`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product reviews.");
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
