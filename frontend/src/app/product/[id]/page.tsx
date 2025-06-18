import ProductDetails from "@/app/ui/ProductDetails";
import ProductReviews from "@/app/ui/ProductReviews";
import { fetchProductById, fetchRatingsAndReviewsByID } from "@/app/lib/data";
import { auth } from "@/auth";
import "./page.css";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const product = await fetchProductById(id);
  const productReviews = await fetchRatingsAndReviewsByID(id);
  const session = await auth();
  const userId = session?.user?.id || "";

  return (
    <div className="product-page">
      <ProductDetails product={product} />
      <ProductReviews
        productId={product.id}
        userId={userId}
        productReviews={productReviews}
      />
    </div>
  );
}
