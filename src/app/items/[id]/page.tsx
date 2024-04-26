import { getItem } from "@/utils/data"
import Image from "next/image"
import Link from "next/link"

export default async function Page({ params }: { params: { id: number } }) {
  const item = await getItem(params.id)

  return (
    <div>
      <h1>{item?.name}</h1>
      <p>{item?.price}</p>
      <Image src={item?.image} alt={item?.name} height={200} width={200} />
      <p>{item?.description}</p>
      <Link href={`/items/${params.id}/edit`}>Edit item</Link>
    </div>
  )
}
