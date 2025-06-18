import { auth } from "@/auth";
import CreateProductForm from "./CreateProductForm";
import { fetchUserById } from "@/app/lib/fetchUserById";

export default async function CreateListingPage() {
  const session = await auth();
  const userId = session?.user?.id || "";
  const user = userId ? await fetchUserById(userId) : null;
  const role = user?.role || "user";

  if (role !== "artisan") {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Create Listing</h1>
        <p>Only artisans can create listings.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h1>Create Listing</h1>
      <CreateProductForm userId={userId} />
    </main>
  );
}
