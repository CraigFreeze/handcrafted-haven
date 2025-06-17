import ProductDetails from "@/app/ui/ProductDetails";
import ProductReviews from "@/app/ui/ProductReviews";
import { fetchProductById, fetchRatingsAndReviewsByID } from "@/app/lib/data";
import "./page.css";

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await fetchProductById(id);
  const productReviews = await fetchRatingsAndReviewsByID(id);

  return (
    <div className="product-page">
      <ProductDetails product={product} />
      <ProductReviews productId={product.id} userId={"6f6c86ee-4b16-4468-9759-7efcb0c8d4be"} productReviews={productReviews} />
    </div>
  );
}
