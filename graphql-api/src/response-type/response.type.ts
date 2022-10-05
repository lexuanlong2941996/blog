import { Field, InterfaceType } from "type-graphql"

@InterfaceType()
export abstract class IResponse {
    @Field()
    success?: boolean

    @Field({ nullable: true })
    msg?: string
}
