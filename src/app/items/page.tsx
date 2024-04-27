import styles from "@/app/page.module.css"
import { listItems } from "@/utils/data"
import { ItemCard } from "@/components/ui/item-card"

export const dynamic = "force-dynamic"
export const revalidate = 1

export default async function Page() {
  const items = await listItems()

  return (
    <div className={styles.itemsContainer}>
      {items?.results?.length > 0 ? (
        items?.results?.map((item) => <ItemCard key={item.id} {...item} />)
      ) : (
        <h2>No Items Found</h2>
      )}
    </div>
  )
}
