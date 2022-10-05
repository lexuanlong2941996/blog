import { Field, ObjectType } from "type-graphql"
import { IResponse } from "./response.type"
import { PostType } from "../graphql/types/post.schema"

// Array/Collection
@ObjectType({ implements: IResponse })
export class PostArrResponse implements IResponse {
    success!: boolean
    msg!: string

    @Field(() => [PostType], { nullable: true })
    data?: PostType[] | any
}

// Single
@ObjectType({ implements: IResponse })
export class PostObjectResponse implements IResponse {
    success!: boolean
    msg!: string

    @Field(() => PostType, { nullable: true })
    data?: PostType | any
}
