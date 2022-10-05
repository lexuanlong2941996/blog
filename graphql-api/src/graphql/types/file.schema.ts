import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class FileType {
    @Field()
    name?: string

    @Field()
    url?: string
}
