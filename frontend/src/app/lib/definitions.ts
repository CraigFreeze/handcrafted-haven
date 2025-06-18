export type Product = {
  id: string;
  user_id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
  public_name?: string; // Optional, used in product details
  average_rating?: number | null; // Optional, used in product listing with ratings
};

export type User = {
  id: string;
  email: string;
  password: string;
  role: "user" | "artisan";
  public_name: string;
  image: string;
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
