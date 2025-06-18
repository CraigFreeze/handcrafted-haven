import { auth } from "@/auth";
import CreateProductForm from "./CreateProductForm";

export default async function CreateListingPage() {
  const session = await auth();
  const userId = session?.user?.id || "";

  return (
    <main style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h1>Create Listing</h1>
      <CreateProductForm userId={userId} />
    </main>
  );
}
