import { signup } from "@/actions/auth"
import AuthForm from "@/components/auth-form"

export default function Page() {
  return <AuthForm authFn={signup} submitButtonText="Sign Up" />
}
