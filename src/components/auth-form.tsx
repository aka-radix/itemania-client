"use client"

import { useFormState, useFormStatus } from "react-dom"
import type { FormState } from "../lib/definitions"
import Link from "next/link"
import styles from "@/app/page.module.css"
export default function AuthForm({
  authFn,
  submitButtonText,
}: {
  authFn: (formState: FormState, formData: FormData) => object
  submitButtonText: string
}) {
  const [state, action] = useFormState(authFn, { errors: {} })
  const { pending } = useFormStatus()
  return (
    <form action={action} className={styles.authForm}>
      <h2>{submitButtonText}</h2>
      <input
        id="username"
        name="username"
        placeholder="Username"
        required
        className={styles.authFormInput}
      />
      {state?.errors?.username?.map((error: string) => (
        <li key={error}>{error}</li>
      ))}

      <input
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        required
        className={styles.authFormInput}
      />
      {state?.errors?.password?.map((error: string) => (
        <li key={error}>{error}</li>
      ))}

      <Link href="/forgot-password" className={styles.forgotPasswordLink}>
        Forgot your password?
      </Link>

      {state?.errors?.other && <p>{state?.errors?.other}</p>}

      <button
        type="submit"
        disabled={pending}
        className={styles.authFormActionButton}
      >
        {submitButtonText}
      </button>
    </form>
  )
}
