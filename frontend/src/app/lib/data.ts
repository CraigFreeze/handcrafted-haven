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

export async function fetchProductsWithRating() {
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
