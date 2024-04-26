import { z } from "zod"


export type EditProductFormState = {
  errors?: {
    productImage?: string
    productName?: string
    productDescription?: string
    productPrice?: string
  }
  message?: string
}

export interface FormState {
errors?: {
  username?: string[]
  password?: string[]
  other?: string
}
message?: string
}

export interface RegisterResponse {
access: string
refresh: string
}

export interface Item {
id: number
name: string
description: string
price: number
image: string
}

export interface EditItemState {
productName: string
productDescription: string
productPrice: number
productImage: File | null

}

export interface ItemsResponse {
next: string | null
previous: string | null
count: number
page: number
results: Item[]
}

export interface ProductProps {
  id: number
  name: string
  price: number
  image: string
}

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
})


export const EditItemFormSchema = z.object({
  productImage: z
    .any()
    .optional()
    .refine((file: File) => {
      if (file) {
        return file?.size <= 1024 * 1024 * 20
      }
      return true;
    }, `Max image size is 2MB.`)
    .refine(
      (file: File) => {
        if (file) {
          return ["image/jpeg", "image/jpg", "image/png", "application/octet-stream"].includes(file?.type)
        }
      }
      ,
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  productName: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters long." })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Product name must not contain special characters.",
    }),
  productDescription: z.string().optional(),
  productPrice: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
})
