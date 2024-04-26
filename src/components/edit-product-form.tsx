"use client"

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
    <form action={action}>
      <div>
        <label htmlFor="productImage">SELECT A FILE TO UPLOAD</label>
        <input
          type="file"
          name="productImage"
          id="productImage"
          accept="image/*"
          multiple={false}
          onChange={(e) => {
            const file = e.target.files[0]
            setFormData({ ...formData, productImage: file })
          }}
        />
      </div>
      <span>Only images are allowed.</span>
      {state?.errors?.productImage && <p>{state.errors.productImage}</p>}

      <div>
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

      <div>
        <label htmlFor="productDescription">Product Description</label>
        <textarea
          rows={1}
          id="productDescription"
          name="productDescription"
          placeholder="Enter Description"
          value={formData?.productDescription}
          onChange={(e) =>
            setFormData({ ...formData, productDescription: e.target.value })
          }
        ></textarea>
      </div>
      {state?.errors?.productDescription && (
        <p>{state.errors.productDescription}</p>
      )}

      <div>
        <label htmlFor="productPrice">Product Price</label>
        <input
          type="number"
          name="productPrice"
          id="productPrice"
          placeholder="Enter Price"
          value={formData?.productPrice}
          onChange={(e) =>
            setFormData({ ...formData, productPrice: e.target.value })
          }
        />
      </div>
      {state?.errors?.productPrice && <p>{state.errors.productPrice}</p>}

      <input type="hidden" name="productId" value={item?.id} />
      <div>
        <Link href={`/items/${item?.id}`}>
          Cancel
        </Link>
        <button type="submit">
          Save Changes
        </button>
      </div>
    </form>
  )
}
