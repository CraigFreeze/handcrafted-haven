"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import styles from "./login-form.module.css";
import Link from "next/link";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <form action={formAction} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <h1 className={styles.formTitle}>Please log in to continue.</h1>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <div>
            <input
              className={styles.input}
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <div>
            <input
              className={styles.input}
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button className={styles.button} aria-disabled={isPending}>
          Log in
        </button>
        <div className={styles.error} aria-live="polite" aria-atomic="true">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <Link className={styles.registerPageLink} href={"/register"}>
          Go To Register Page
        </Link>
      </div>
    </form>
  );
}
