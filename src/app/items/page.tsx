import styles from "@/app/page.module.css"
import { listItems } from "@/utils/data"
import Image from "next/image"
import Link from "next/link"

export default async function Page() {
  const items = await listItems()

  return (
    <div className={styles.main}>
      {items?.results?.map((item) => (
        <Link href={`/items/${item.id}`} key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.price}</p>
          <Image src={item.image} alt={item.name} width={200} height={200} />
          <p>{item.description}</p>
        </Link>
      ))}
    </div>
  )
}
