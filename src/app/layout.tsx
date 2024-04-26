import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavigationBar from "@/components/ui/navigation-bar"
const inter = Inter({ subsets: ["latin"] })
import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "Itemania",
  description: "List, view, and edit items!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar />
        <div className={styles.mainContainer}>{children}</div>
      </body>
    </html>
  )
}
