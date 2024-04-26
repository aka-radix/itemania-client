import styles from "@/app/page.module.css"
import { verifyToken } from "@/utils/auth"
import { getAccessToken } from "@/utils/data"
import Link from "next/link"
import React from "react"
import LogoutButton from "../logout-button"

export default async function NavigationBar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/items">Items</Link>
      {((await verifyToken(getAccessToken())) as boolean) ? (
        <LogoutButton />
      ) : (
        <Link href="/login">
          <button>Log in / Sign up</button>
        </Link>
      )}
    </nav>
  )
}
