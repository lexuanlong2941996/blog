import { Field, ObjectType } from "type-graphql"
import { IResponse } from "./response.type"

@ObjectType()
class Token {
    @Field()
    accessToken?: string

    @Field()
    refreshToken?: string
}

@ObjectType({ implements: IResponse })
export class AuthResponse implements IResponse {
    success!: boolean
    msg!: string

    @Field(() => Token, { nullable: true })
    data?: Token
}
