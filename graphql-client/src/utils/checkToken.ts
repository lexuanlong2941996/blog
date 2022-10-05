import { isExpired, decodeToken } from "react-jwt"

type TToken = {
    userId: string
    email: string
    name: string
    role: string
    iat: number
    exp: number
}

export const checkToken = (accessToken: string) => {
    const userInfo = decodeToken<TToken>(accessToken)
    const isExp = isExpired(accessToken)
    return { userInfo, isExp }
}
