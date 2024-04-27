"use client"

import { editProduct } from "@/actions/data"
import styles from "@/app/page.module.css"
import type { EditItemFormState, EditItemState, Item } from "@/lib/definitions"
import Link from "next/link"
import { useState } from "react"
import { useFormState } from "react-dom"
import InputFieldError from "./ui/input-field.error"

export default function EditProductForm({ item }: { item: Item }) {
  const [formData, setFormData] = useState<EditItemState>({
    name: item?.name,
    description: item?.description,
    price: item?.price,
    image: null,
  })

  const [state, action] = useFormState<EditItemFormState, FormData>(
    editProduct,
    {
      errors: {
        image: [],
        name: [],
        description: [],
        price: [],
        other: "",
      },
    }
  )
  console.log(state)
  return (
    <form action={action} className={styles.editProductForm}>
      <div className={styles.uploadImageFieldContainerWrapper}>
        <label htmlFor="uploadImageFieldContainer">Upload Image</label>
        <p></p>
        <div
          id="uploadImageFieldContainer"
          className={styles.uploadImageFieldContainer}
        >
          <label htmlFor="image" className={styles.uploadImageFieldLabel}>
            <h5 className={styles.uploadImageFieldLabelMessage}>
              SELECT A FILE TO UPLOAD
            </h5>
          </label>
          <input
            className={styles.uploadImageFieldInput}
            type="file"
            name="image"
            id="image"
            accept="image/*"
            multiple={false}
            onChange={(e) => {
              const file = e?.target?.files?.[0] ?? null
              setFormData({ ...formData, image: file })
            }}
          />
        </div>
        <span className={styles.uploadImageFieldRule}>
          Only png, jpg, and jpeg formats are allowed.
        </span>
      </div>
      <InputFieldError field="image" state={state} />

      <div className={styles.formInputContainer}>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData?.name}
          placeholder="Enter Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <InputFieldError field="name" state={state} />

      <div className={styles.formInputContainer}>
        <label htmlFor="description">Product Description</label>
        <textarea
          rows={3}
          id="description"
          name="description"
          placeholder="Enter Description"
          className={styles.formInputItemDescriptionTextarea}
          value={formData?.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
      </div>
      <InputFieldError field="description" state={state} />

      <div className={styles.formInputContainer}>
        <label htmlFor="price">Product Price</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Enter Price"
          value={formData?.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e?.target?.value) })
          }
        />
      </div>
      <InputFieldError field="price" state={state} />

      <input type="hidden" name="productId" value={item?.id} />

      {state?.errors?.other && <p>{state?.errors?.other}</p>}

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
