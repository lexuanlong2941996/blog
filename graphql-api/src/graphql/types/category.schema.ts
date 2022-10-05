import { ObjectType, Field, ID } from "type-graphql"
import { MinLength } from "class-validator"
import { ObjectId } from "mongoose"
import { PostType } from "./post.schema"
import { UserType } from "./user.schema"
import { Status } from "../../types/enum"

@ObjectType()
export class CategoryType {
    @Field(() => ID)
    readonly _id: ObjectId

    @Field()
    @MinLength(6)
    title: string

    @Field()
    description: string

    @Field(() => Status)
    status: Status

    @Field(() => [PostType], { nullable: true })
    posts: PostType[]

    @Field(() => UserType, { nullable: true })
    author: UserType

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
