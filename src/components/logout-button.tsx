"use client"

import { logout } from "@/actions/auth"
import { useFormState, useFormStatus } from "react-dom"
import SubmitButton from "./submit-button"

export default function LogoutButton() {
  const [, action] = useFormState(logout, undefined)
  const { pending } = useFormStatus()
  return (
    <form action={action}>
      <SubmitButton text="Log out" pending={pending} />
    </form>
  )
}
