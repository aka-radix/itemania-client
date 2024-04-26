import styles from "@/app/page.module.css"
import type { ProductProps } from "@/lib/definitions"
import Image from "next/image"
import Link from "next/link"

export function ItemCard({ id, name, price, image }: ProductProps) {
  return (
    <Link href={`/items/${id}`} className={styles.itemCard}>
      <div className={styles.itemCardImageContainer}>
        <Image
          src={image}
          objectFit="cover"
          alt={`Product ${name} image`}
          placeholder="blur"
          blurDataURL="/product-placeholder.png"
          fill
        />
      </div>
      <div className={styles.itemCardNameContainer}>{name}</div>
      <div className={styles.itemCardPriceWrapper}>
        <p className={styles.itemCardPriceContainer}>${price}</p>
      </div>
    </Link>
  )
}
