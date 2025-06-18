import { auth } from "@/auth";
import CreateProductForm from "./CreateProductForm";
import { fetchUserById } from "@/app/lib/fetchUserById";
import styles from "./page.module.css";

export default async function CreateListingPage() {
  const session = await auth();
  const userId = session?.user?.id || "";
  const user = userId ? await fetchUserById(userId) : null;
  const role = user?.role || "user";

  if (role !== "artisan") {
    return (
      <main className={styles.createListingPage}>
        <h1>Create Listing</h1>
        <p>Only artisans can create listings.</p>
      </main>
    );
  }

  return (
    <main className={styles.createListingPage}>
      <h1>Create Listing</h1>
      <CreateProductForm userId={userId} />
    </main>
  );
}
