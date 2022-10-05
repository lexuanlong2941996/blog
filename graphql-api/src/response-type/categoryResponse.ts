import { CategoryType } from "../graphql/types/category.schema"
import { Field, ObjectType } from "type-graphql"
import { IResponse } from "./response.type"

// Array/Collection
@ObjectType({ implements: IResponse })
export class CategoryArrResponse implements IResponse {
    success?: boolean
    msg?: string

    @Field(() => [CategoryType], { nullable: true })
    data?: CategoryType[] | any
}

// Single
@ObjectType({ implements: IResponse })
export class CategoryObjectResponse implements IResponse {
    success?: boolean
    msg?: string

    @Field(() => CategoryType, { nullable: true })
    data?: CategoryType | any
}
