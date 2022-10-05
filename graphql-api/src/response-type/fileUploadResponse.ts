import { Field, ObjectType } from "type-graphql"
import { FileType } from "../graphql/types/file.schema"
import { IResponse } from "./response.type"

// Array/Collection
@ObjectType({ implements: IResponse })
export class FileArrResponse implements IResponse {
    success?: boolean
    msg?: string

    @Field(() => [FileType], { nullable: true })
    data?: FileType[]
}

// Single
@ObjectType({ implements: IResponse })
export class FileObjectResponse implements IResponse {
    success?: boolean
    msg?: string

    @Field(() => String, { nullable: true })
    data?: string
}
