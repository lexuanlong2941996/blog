import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import { AuthenticationError } from "apollo-server-express"
import { MiddlewareFn, NextFn } from "type-graphql"
import { IContext } from "../global-types/token.type"
import { User } from "../models/user.model"

const authMiddleware: MiddlewareFn<IContext> = async ({ context }, next: NextFn) => {
    try {
        // getting a token from authorization header
        const authHeader = context.req.headers.authorization
        if (!authHeader) throw new AuthenticationError("Not authen!...")

        const accessToken = authHeader.split("Bearer ")[1]
        if (!accessToken) throw new AuthenticationError("You need to perform Token!...")

        const decoded = jwt.verify(accessToken, process.env.SECRET as Secret) as JwtPayload
        if (!decoded) throw new AuthenticationError("You have no authorization!...")

        // check user
        const user = await User.findOne({
            _id: decoded.userId,
            email: decoded.email,
            role: "Admin",
        })
        if (!user) throw new AuthenticationError("You need to admin access...")

        context.req.user = { userId: decoded.userId, email: decoded.email }
        return next()
    } catch (error: any) {
        console.log(error.message)
        return {
            success: false,
            msg: error.message,
        }
    }
}

export default authMiddleware
