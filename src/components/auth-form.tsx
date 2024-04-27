"use client"

import { useFormState, useFormStatus } from "react-dom"
import type { AuthFormState } from "../lib/definitions"
import Link from "next/link"
import styles from "@/app/page.module.css"
import InputFieldError from "./ui/input-field.error"

export default function AuthForm({
  authFn,
  submitButtonText,
}: {
  authFn: (formState: AuthFormState, formData: FormData) => object
  submitButtonText: string
}) {
  const [state, action] = useFormState<AuthFormState, FormData>(authFn, {
    errors: {
      username: [],
      password: [],
      other: "",
    },
  })
  const { pending } = useFormStatus()
  return (
    <form action={action} className={styles.authForm}>
      <h2>{submitButtonText}</h2>
      <div className={styles.authInputFieldsWrapper}>
        <input
          id="username"
          name="username"
          placeholder="Username"
          className={styles.authFormInput}
        />
        <InputFieldError field="username" state={state} />

        <input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          className={styles.authFormInput}
        />
        <InputFieldError field="password" state={state} />
      </div>

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
