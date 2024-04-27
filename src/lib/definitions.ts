import { z } from "zod"

export interface EditItemFormState {
  errors?: {
    image?: string[]
    name?: string[]
    description?: string[]
    price?: string[]
    other?: string
  }
  message?: string
}

export interface AuthFormState {
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
  name: string
  description: string
  price: number
  image: File | null
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
    .min(2, { message: "Must be at least 2 characters long." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
    .regex(/[0-9]/, { message: "Must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Must contain at least one special character.",
    })
    .trim(),
})

export const EditItemFormSchema = z.object({
  image: z
    .instanceof(File)
    .optional()
    .refine((file: File | undefined) => {
      if (file) {
        return file?.size <= 1024 * 1024 * 20
      }
      return true
    }, `Max image size is 2MB.`)
    .refine((file: File | undefined) => {
      if (file) {
        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "application/octet-stream",
        ].includes(file?.type)
      }
      return true
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters long.")
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      "Product name must not contain special characters."
    ),
  description: z.string().optional(),
  price: z.string().refine(
    (val) => {
      const num = parseInt(val, 10)
      return !Number.isNaN(num) && num >= 1
    },

    "The price must be greater than or equal to 1"
  ),
})
