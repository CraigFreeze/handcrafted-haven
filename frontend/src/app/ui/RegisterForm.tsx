"use client";

import React, { useActionState } from "react";
import { createUser } from "@/app/lib/actions";
import styles from "./RegisterForm.module.css";
import Link from "next/link";

const initialState = {
  errors: {},
  message: "",
};

export default function RegisterForm() {
  const [state, formAction] = useActionState(createUser, initialState);

  return (
    <form action={formAction} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Register</h2>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input name="email" type="email" required className={styles.input} />
        {state.errors?.email && (
          <p className={styles.error}>{state.errors.email}</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          className={styles.input}
        />
        {state.errors?.password && (
          <p className={styles.error}>{state.errors.password}</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="public_name" className={styles.label}>
          Public Name
        </label>
        <input
          name="public_name"
          type="text"
          required
          className={styles.input}
        />
        {state.errors?.public_name && (
          <p className={styles.error}>{state.errors.public_name}</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="image" className={styles.label}>
          Image URL
        </label>
        <input name="image" type="url" required className={styles.input} />
        {state.errors?.image && (
          <p className={styles.error}>{state.errors.image}</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="role" className={styles.label}>
          Role
        </label>
        <select name="role" required className={styles.select}>
          <option value="user">User</option>
          <option value="artisan">Artisan</option>
        </select>
        {state.errors?.role && (
          <p className={styles.error}>{state.errors.role}</p>
        )}
      </div>

      <button type="submit" className={styles.button}>
        Register
      </button>
      {state.message && <p className={styles.success}>{state.message}</p>}

      <Link className={styles.loginPageLink} href={"/login"}>
        Go To Login Page
      </Link>
    </form>
  );
}
