import { verifyToken } from "@/utils/auth"
import { getAccessToken, getItem } from "@/utils/data"
import Image from "next/image"
import Link from "next/link"
import styles from "@/app/page.module.css"

export default async function Page({ params }: { params: { id: number } }) {
  const item = await getItem(params.id)

  return (
    <div className={styles.itemViewContainer}>
      <div className={styles.itemViewImageContainer}>
        <Image
          src={item?.image}
          alt={`Product Image ${item.name}`}
          objectFit="cover"
          placeholder="blur"
          blurDataURL="/product-placeholder.png"
          quality={75}
          fill
        />
      </div>
      <div className={styles.itemViewDetailsContainer}>
        <div className={styles.itemViewEditButtonContainer}>
          {((await verifyToken(getAccessToken())) as boolean) && (
            <Link
              href={`/items/${item.id}/edit`}
              className={styles.itemViewEditButton}
            >
              <Image
                src="/icons/edit.svg"
                width={15}
                height={15}
                alt="Edit icon"
              />
              <span>Edit</span>
            </Link>
          )}
        </div>
        <div className={styles.itemViewDetailsContent}>
          <h2 className={styles.itemName}>{item?.name}</h2>
          <p className={styles.itemViewDescription}>
            {item?.description ?? "No description provided."}
          </p>
          <div className={styles.itemViewDetailsFooter}>
            <p className={styles.itemViewPrice}>Price ${item?.price}</p>
            <div className={styles.itemViewCTA}>
              <span>CTA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// export default async function Page({ params }: { params: { id: number } }) {
//   const item = await getItem(params.id)
//   const accessToken = getAccessToken()
//   return (
//     <div>
//       <h1>{item?.name}</h1>
//       <p>{item?.price}</p>
//       <Image src={item?.image} alt={item?.name} height={200} width={200} />
//       <p>{item?.description}</p>
//       {((await verifyToken(accessToken)) as boolean) && (
//         <Link href={`/items/${params.id}/edit`}>Edit item</Link>
//       )}
//     </div>
//   )
// }
