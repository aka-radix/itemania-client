"use client"

import styles from "@/app/page.module.css"
import { editProduct } from "@/actions/data"
import type { EditItemState, Item } from "@/lib/definitions"
import Link from "next/link"
import { useState } from "react"
import { useFormState } from "react-dom"

export default function EditProductForm({ item }: { item: Item }) {
  const [formData, setFormData] = useState<EditItemState>({
    productName: item?.name,
    productDescription: item?.description,
    productPrice: item?.price,
    productImage: null,
  })

  const [state, action] = useFormState(editProduct, {
    productName: item?.name,
    productDescription: item?.description,
    productPrice: item?.price,
    productImage: item?.image,
    productId: item?.id,
  })

  return (
    <form action={action} className={styles.editProductForm}>
      <div className={styles.uploadImageFieldContainerWrapper}>
        <label htmlFor="uploadImageFieldContainer">Upload Image</label>
        <p></p>
        <div
          id="uploadImageFieldContainer"
          className={styles.uploadImageFieldContainer}
        >
          <label
            htmlFor="productImage"
            className={styles.uploadImageFieldLabel}
          >
            <h5 className={styles.uploadImageFieldLabelMessage}>
              SELECT A FILE TO UPLOAD
            </h5>
          </label>
          <input
            className={styles.uploadImageFieldInput}
            type="file"
            name="productImage"
            id="productImage"
            accept="image/*"
            multiple={false}
            onChange={(e) => {
              const file = e?.target?.files?.[0] ?? null
              setFormData({ ...formData, productImage: file })
            }}
          />
        </div>
        <span className={styles.uploadImageFieldRule}>
          Only png, jpg, and jpeg formats are allowed.
        </span>
      </div>
      {state?.errors?.productImage && <p>{state.errors.productImage}</p>}

      <div className={styles.formInputContainer}>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          name="productName"
          id="productName"
          value={formData?.productName}
          required
          minLength={2}
          placeholder="Enter Name"
          onChange={(e) =>
            setFormData({ ...formData, productName: e.target.value })
          }
        />
      </div>
      {state?.errors?.productName && <p>{state.errors.productName}</p>}

      <div className={styles.formInputContainer}>
        <label htmlFor="productDescription">Product Description</label>
        <textarea
          rows={3}
          id="productDescription"
          name="productDescription"
          placeholder="Enter Description"
          className={styles.formInputItemDescriptionTextarea}
          value={formData?.productDescription}
          onChange={(e) =>
            setFormData({ ...formData, productDescription: e.target.value })
          }
        ></textarea>
      </div>
      {state?.errors?.productDescription && (
        <p>{state.errors.productDescription}</p>
      )}

      <div className={styles.formInputContainer}>
        <label htmlFor="productPrice">Product Price</label>
        <input
          type="number"
          name="productPrice"
          id="productPrice"
          placeholder="Enter Price"
          min={1}
          value={formData?.productPrice}
          onChange={(e) =>
            setFormData({ ...formData, productPrice: Number(e?.target?.value) })
          }
        />
      </div>
      {state?.errors?.productPrice && <p>{state.errors.productPrice}</p>}

      <input type="hidden" name="productId" value={item?.id} />

      <div className={styles.formActionButtonsContainer}>
        <Link
          href={`/items/${item?.id}`}
          className={styles.formButton + " " + "cancel"}
        >
          Cancel
        </Link>
        <button type="submit" className={styles.formButton + " " + "save"}>
          Save Changes
        </button>
      </div>
    </form>
  )
}
