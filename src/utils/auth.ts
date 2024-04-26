import { jwtVerify } from "jose"

export const getEncodedSecretKey = () => {
  return new TextEncoder().encode("django-insecure-k2m38fbv_g(4g!3+t_=zyk09@$k7gae44zf+p_%jw2kqb_@vt&")
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
