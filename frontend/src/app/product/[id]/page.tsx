import ProductDetails from "@/app/ui/ProductDetails";
import ProductReviews from "@/app/ui/ProductReviews";
import { fetchProductById, fetchRatingsAndReviewsByID } from "@/app/lib/data";
import "./page.css";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProductById(id);
  const productReviews = await fetchRatingsAndReviewsByID(id);

  return (
    <div className="product-page">
      <ProductDetails product={product} />
      <ProductReviews productId={product.id} userId={"9a1b7f20-2d64-4db9-9ef2-d42a1b7a1e70"} productReviews={productReviews} />
    </div>
  );
}
