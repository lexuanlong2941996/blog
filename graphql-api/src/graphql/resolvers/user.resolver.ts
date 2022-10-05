import { Ctx, Arg, Query, Resolver, UseMiddleware } from "type-graphql"
import { UserArrResponse, UserObjectResponse } from "../../response-type/userResponse"
import authMiddleware from "../../middlewares/auth.middleware"
import { User } from "../../models/user.model"
import { IContext } from "../../global-types/token.type"

const catchErr = {
    success: false,
    msg: "Bad request.....",
}

@Resolver()
export class UserResolver {
    @Query(() => UserArrResponse, { nullable: true })
    @UseMiddleware(authMiddleware)
    async getAllUsers() {
        try {
            const users = await User.find().populate("categories")
            return {
                success: true,
                data: users,
                msg: "",
            }
        } catch (error) {
            return catchErr
        }
    }

    @Query(() => UserObjectResponse, { nullable: true })
    @UseMiddleware(authMiddleware)
    async getUserById(@Ctx() ctx: IContext) {
        const { userId } = ctx.req.user
        try {
            const user = await User.findById({ _id: userId })
                .populate("categories")
                .populate("posts")
            return {
                success: true,
                msg: "",
                data: user,
            }
        } catch (error) {
            return catchErr
        }
    }
}
