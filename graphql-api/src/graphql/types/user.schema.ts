import { ObjectType, Field, ID } from "type-graphql"
import { IsEmail, MaxLength, MinLength } from "class-validator"
import { ObjectId } from "mongoose"
import { CategoryType } from "./category.schema"
import { PostType } from "./post.schema"
import { Role } from "../../types/enum"

@ObjectType()
export class UserType {
    @Field(() => ID)
    readonly _id: ObjectId

    @Field()
    @IsEmail()
    email: string

    @MinLength(6)
    @MaxLength(20)
    password: string

    @Field({ nullable: true })
    @MinLength(4)
    @MaxLength(20)
    name: string

    @Field(() => Role)
    role: Role

    @Field({ nullable: true })
    wallet: string

    @Field(() => [CategoryType], { nullable: true })
    categories: ObjectId[]

    @Field(() => [PostType], { nullable: true })
    posts: ObjectId[]

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
