export type Product = {
  id: string;
  user_id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
};

export type ProductWithRating = {
  id: string;
  user_id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
  average_rating: number | null;
};

export type User = {
  id: string;
  email: string;
  password: string;
  role: "user" | "artisan";
};

export type Rating = {
  id: string;
  user_id: string;
  product_id: string;
  title: string;
  review: string;
  star_rating: number;
  created_at: string;
};
