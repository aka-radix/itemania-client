"use server"

import type { EditProductFormState, Item } from "@/lib/definitions"
import { EditItemFormSchema } from "@/lib/definitions"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { env } from "../app/env.js"

export async function editProduct(
  formState: EditProductFormState,
  formData: FormData
) {
  const validatedFields = EditItemFormSchema.safeParse({
    productName: formData.get("productName"),
    productDescription: formData.get("productDescription"),
    productPrice: formData.get("productPrice"),
    productImage: formData.get("productImage"),
  })

  const productId = formData.get("productId")

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const validatedFormData = new FormData()

    const { productImage, productName, productDescription, productPrice } =
      validatedFields.data

    if (productImage?.name !== "undefined") {
      validatedFormData.set("image", productImage)
    }
    validatedFormData.set("name", productName)
    validatedFormData.set("description", productDescription)
    validatedFormData.set("price", productPrice)

    const accessCookie = cookies().get("access")
    const accessToken = accessCookie ? accessCookie.value : ""

    const response = await fetch(
      `${env.API_HOST}/api/items/${productId?.toString()}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: validatedFormData,
        cache: "no-cache",
      }
    )

    if (!response.ok) {
      throw new Error("Failed to edit item")
    }
  } catch (error) {
    throw new Error("Failed to edit item")
  }

  revalidatePath("/items")
  revalidatePath(`/items/${productId?.toString()}`)
  redirect(`/items/${productId?.toString()}`)
}
