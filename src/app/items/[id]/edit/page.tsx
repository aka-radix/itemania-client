import EditProductForm from "@/components/edit-product-form"
import { getItem } from "@/utils/data";

export default async function Page({ params }: { params: { id: number } }) {
  const item = await getItem(params.id);
  return (
    <>
      <div>Edit Product Page</div>
      <EditProductForm item={item}/>
    </>
  )
}
