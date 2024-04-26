import { jwtVerify } from "jose"
import { env } from "../app/env.js"

export const getEncodedSecretKey = () => {
  return new TextEncoder().encode(env.SECRET_KEY)
}

const checkTokenValid = (exp: number) => {
  const expTime = exp * 1000
  const currentTime = Date.now()
  return currentTime >= expTime
}

export const verifyToken = async (token: string) => {
  try {
    const verified = await jwtVerify(token, getEncodedSecretKey(), {
      algorithms: ["HS256"],
    })
    const { exp, user_id } = verified.payload
    return user_id && !checkTokenValid(exp ?? Date.now())
  } catch (error) {
    return false
  }
}
