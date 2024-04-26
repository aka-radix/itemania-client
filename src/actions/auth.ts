"use server"
import {
  SignupFormSchema,
  type FormState,
  type RegisterResponse,
} from "@/lib/definitions"
import { cookies } from "next/headers"
import { permanentRedirect } from "next/navigation"

export async function signup(formState: FormState, formData: FormData) {
  return await authenticate(
    `${process.env.API_HOST}/api/signup/`,
    formState,
    formData
  )
}

export async function login(formState: FormState, formData: FormData) {
  return await authenticate(
    `${process.env.API_HOST}/api/login/`,
    formState,
    formData
  )
}

function deleteTokens() {
  cookies().delete("access")
  cookies().delete("refresh")
}

export async function logout() {
  const accessCookie = cookies().get("access")
  const accessToken = accessCookie ? accessCookie.value : ""

  try {
    await fetch(`${process.env.API_HOST}/api/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    })
  } catch (err) {
  } finally {
    deleteTokens()
  }

  permanentRedirect("/items")
}

async function authenticate(
  endpoint: string,
  formState: FormState,
  formData: FormData
) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...validatedFields.data,
      }),
    })

    if (response.ok) {
      const { access, refresh }: RegisterResponse = await response.json()
      cookies().set("access", access)
      cookies().set("refresh", refresh)
    } else {
      const errors = await response.json()
      if ("non_field_errors" in errors) {
        return {
          errors: {
            other:
              "Invalid credentials. Check your credentials or try to sign up.",
          },
        }
      }
      return {
        errors: {
          ...errors,
        },
      }
    }
  } catch (err) {
    return {
      errors: {
        other: "An error occurred. Please try again later.",
      },
    }
  }
  permanentRedirect("/items")
}
