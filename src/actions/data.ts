"use server"

import type { EditItemFormState } from "@/lib/definitions"
import { EditItemFormSchema } from "@/lib/definitions"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { env } from "../app/env.js"

export async function editProduct(
  formState: EditItemFormState,
  formData: FormData
) {
  const validatedFields = EditItemFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    image: formData.get("image"),
  })

  const productId = formData.get("productId")

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const validatedFormData = new FormData()

    const {
      image = undefined,
      name,
      description = undefined,
      price,
    } = validatedFields.data

    if (image && image?.name !== "undefined") {
      validatedFormData.set("image", image)
    }
    validatedFormData.set("name", name)
    if (description) {
      validatedFormData.set("description", description)
    }
    validatedFormData.set("price", price)

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
      return {
        errors: { ...((await response.json()) as EditItemFormState) },
      }
    }
  } catch (error) {
    return {
      errors: {
        other: "An error occurred. Please try again later.",
      },
    }
  }

  revalidatePath("/items")
  revalidatePath(`/items/${productId?.toString()}`)
  redirect(`/items/${productId?.toString()}`)
}
