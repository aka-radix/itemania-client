import { signup } from "@/actions/auth"
import styles from "@/app/page.module.css"
import AuthForm from "@/components/auth-form"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
  return (
    <div className={styles.authFormWrapper}>
      <div className={styles.tamatemPlus}>
        <Image src="/favicon.ico" alt="logo icon" width={60} height={60} />
        <p>tamatem plus</p>
      </div>
      <AuthForm authFn={signup} submitButtonText="Sign up" />
      <Link href="/login">
        <p>Login instead</p>
      </Link>
    </div>
  )
}
