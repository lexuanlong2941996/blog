import { Arg, Mutation, Resolver, InputType, Field } from "type-graphql"
import { User } from "../../models/user.model"
import { AuthResponse } from "../../response-type/authResponse"
import argon2 from "argon2"
import jwt from "jsonwebtoken"

@InputType()
class RegisterInput {
    @Field()
    email!: string

    @Field()
    password!: string

    @Field()
    name: string
}

@InputType()
class LoginInput {
    @Field()
    email!: string

    @Field()
    password!: string
}

@Resolver()
export class AuthResolver {
    @Mutation(() => AuthResponse, { nullable: true })
    async register(
        @Arg("registerInput") { email, password, name }: RegisterInput
    ): Promise<AuthResponse> {
        try {
            const existedUser = await User.findOne({ email })
            if (existedUser)
                return {
                    success: false,
                    msg: "User is existed.....",
                }
            const hashedPassword = await argon2.hash(`${password}`)
            await User.create({
                email,
                password: hashedPassword,
                name,
            })
            return {
                success: true,
                msg: "Successfully create a new user!",
            }
        } catch (error) {
            return {
                success: false,
                msg: "Bad request.....",
            }
        }
    }

    @Mutation(() => AuthResponse, { nullable: true })
    async login(@Arg("loginInput") { email, password }: LoginInput): Promise<AuthResponse> {
        try {
            const existedUser = await User.findOne({ email: email })
            if (!existedUser)
                return {
                    success: false,
                    msg: "Please sign up an account and try to login again...",
                }
            const validatedPassword = await argon2.verify(existedUser.password, `${password}`)
            if (!validatedPassword)
                return {
                    success: false,
                    msg: "Password is incorrect.....",
                }
            const accessToken = jwt.sign(
                {
                    userId: existedUser.id,
                    email: existedUser.email,
                    name: existedUser.name,
                    role: existedUser.role,
                },
                `${process.env.SECRET}`,
                { expiresIn: "1h" }
            )
            return {
                success: true,
                msg: "Successfully login!",
                data: {
                    accessToken,
                    refreshToken: "hoho",
                },
            }
        } catch (error) {
            return {
                success: false,
                msg: "Bad request.....",
            }
        }
    }
}
