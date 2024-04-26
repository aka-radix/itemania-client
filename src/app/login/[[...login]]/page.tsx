import { login } from "@/actions/auth"
import AuthForm from "@/components/auth-form"

export default function Page() {
  return <AuthForm authFn={login} submitButtonText="Log in" />
}
