import bcrypt from "bcrypt";
import postgres from "postgres";
import { users, products, ratings } from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('user', 'artisan'))
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, email, password, role)
        VALUES (${user.id}, ${user.email}, ${hashedPassword}, ${user.role})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedProducts() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      category TEXT NOT NULL,
      price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
      description TEXT,
      image_url TEXT
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (product) => sql`
        INSERT INTO products (id, user_id, category, price, description, image_url)
        VALUES (${product.id}, ${product.user_id}, ${product.category}, ${product.price}, ${product.description}, ${product.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedProducts;
}

async function seedRatings() {
  await sql`
    CREATE TABLE IF NOT EXISTS ratings (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  d
      title TEXT,
      review TEXT,
      star_rating INTEGER NOT NULL CHECK (star_rating BETWEEN 1 AND 5),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
    );
  `;

  const insertedRatings = await Promise.all(
    ratings.map(
      (rating) => sql`
        INSERT INTO ratings (id, user_id, product_id, title, review, star_rating, created_at)
        VALUES (${rating.id}, ${rating.user_id}, ${rating.product_id}, ${rating.title}, ${rating.review}, ${rating.star_rating}, ${rating.created_at})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedRatings;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedProducts(),
      seedRatings(),
    ]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
