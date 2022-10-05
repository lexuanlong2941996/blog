import { ObjectType, Field, ID, registerEnumType } from "type-graphql"
import { MinLength } from "class-validator"
import { ObjectId } from "mongoose"
import { CategoryType } from "./category.schema"
import { UserType } from "./user.schema"
import { Status } from "../../types/enum"

@ObjectType()
export class PostType {
    @Field(() => ID)
    readonly _id: ObjectId

    @Field()
    @MinLength(6)
    title: string

    @Field()
    description: string

    @Field()
    content: string

    @Field()
    thumbnail: string

    @Field(() => Status)
    status: Status

    @Field(() => CategoryType, { nullable: true })
    category: CategoryType

    @Field(() => UserType, { nullable: true })
    author: UserType

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
