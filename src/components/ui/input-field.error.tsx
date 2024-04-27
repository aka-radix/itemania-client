import type { AuthFormState, EditItemFormState } from "@/lib/definitions"
import React from "react"

export default function InputFieldError({
  field,
  state,
}: {
  field:
    | "username"
    | "password"
    | "other"
    | "image"
    | "name"
    | "description"
    | "price"
  state: AuthFormState & EditItemFormState
}) {
  const fieldError = state?.errors
  let errorsArray: string[] = []
  if (fieldError && field in fieldError) {
    const errors = fieldError?.[field]
    errorsArray = errors ? (Array.isArray(errors) ? errors : [errors]) : []
  }
  return (
    errorsArray?.length > 0 && (
      <ul>
        {Array.isArray(errorsArray) &&
          errorsArray?.map((error: string) => (
            <li className="error" key={error}>
              {error}
            </li>
          ))}
      </ul>
    )
  )
}
