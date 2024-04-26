import EditProductForm from "@/components/edit-product-form"
import { getItem } from "@/utils/data"
import styles from "@/app/page.module.css"
export default async function Page({ params }: { params: { id: number } }) {
  const item = await getItem(params.id)
  return (
    <div className={styles.editItemPage}>
      <EditProductForm item={item} />
    </div>
  ) 
}
