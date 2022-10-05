import { Field, ObjectType } from "type-graphql"
import { IResponse } from "./response.type"
import { UserType } from "../graphql/types/user.schema"

// Array/Collection
@ObjectType({ implements: IResponse })
export class UserArrResponse implements IResponse {
    success?: boolean
    msg?: string

    @Field(() => [UserType], { nullable: true })
    data?: UserType[] | any
}

// Single
@ObjectType({ implements: IResponse })
export class UserObjectResponse implements IResponse {
    success?: boolean
    msg?: string

    @Field(() => UserType, { nullable: true })
    data?: UserType | any
}
