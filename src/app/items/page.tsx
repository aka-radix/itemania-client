import styles from "@/app/page.module.css"
import { listItems } from "@/utils/data"
import { ItemCard } from "@/components/ui/item-card"

export default async function Page() {
  const items = await listItems()

  return (
    <div className={styles.itemsContainer}>
      {items?.results?.map((item) => <ItemCard key={item.id} {...item} />)}
    </div>
  )
}
