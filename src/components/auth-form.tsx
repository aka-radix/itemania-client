"use client"

import SubmitButton from "@/components/submit-button"
import { useFormState, useFormStatus } from "react-dom"
import type { FormState } from "../lib/definitions"

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
    <form action={action}>
      <input id="username" name="username" placeholder="Username" />
      {state?.errors?.username?.map((error: string) => (
        <li key={error}>{error}</li>
      ))}

      <input
        id="password"
        name="password"
        placeholder="Password"
        type="Password"
      />
      {state?.errors?.password?.map((error: string) => (
        <li key={error}>{error}</li>
      ))}

      {state?.errors?.other && <p>{state?.errors?.other}</p>}

      <SubmitButton text={submitButtonText} pending={pending} />
    </form>
  )
}
