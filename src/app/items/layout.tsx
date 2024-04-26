import styles from "@/app/page.module.css"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className={styles.itemsLayout}>{children}</div>
}
