import styles from "./page.module.css"
import LogoutButton from "@/components/logout-button"

export default function Home() {
  return (
    <main className={styles.main}>
      <LogoutButton />
    </main>
  )
}
