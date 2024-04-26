import type { Item, ItemsResponse } from "@/lib/definitions"
import { cookies } from "next/headers"

export function getAccessToken() {
  const accessCookie = cookies().get("access")
  return accessCookie ? accessCookie.value : ""
}

export async function listItems(): Promise<ItemsResponse> {
  try {
    const response = await fetch(`${process.env.API_HOST}/api/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      return await response.json() as ItemsResponse
    } else {
      throw new Error("Failed to fetch items")
    }
  } catch (error) {
    throw new Error("Failed to fetch items")
  }
}

export async function getItem(id: number) {
  try {
    const response = await fetch(`${process.env.API_HOST}/api/items/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      return await response.json() as Item
    } else {
      throw new Error("Failed to fetch item")
    }
  } catch (error) {
    throw new Error("Failed to fetch item")
  }
}
