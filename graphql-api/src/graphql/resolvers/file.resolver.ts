import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql"
import authMiddleware from "../../middlewares/auth.middleware"
import fs, { createWriteStream } from "fs"
import path from "path"
import { readdir } from "node:fs/promises"
import { FileUpload } from "graphql-upload"
import { FileArrResponse, FileObjectResponse } from "../../response-type/fileUploadResponse"
import { IContext } from "../../global-types/token.type"

const GraphQLUpload = require("graphql-upload/GraphQLUpload.js")

const pathUpload = path.join(__dirname, "/../..", "/upload/")

@Resolver()
export class FileResolver {
    @Query(() => FileArrResponse, { nullable: true })
    @UseMiddleware(authMiddleware)
    async getAllFiles(@Ctx() ctx: IContext): Promise<FileArrResponse> {
        const { userId } = ctx.req.user
        console.log(userId)
        try {
            const objData = []
            const files = await readdir(pathUpload)
            for (const file of files) {
                const splitFile = file.split(".")
                if (
                    splitFile[1] === "png" ||
                    splitFile[1] === "jpg" ||
                    splitFile[1] === "jpeg" ||
                    splitFile[1] === "webp"
                ) {
                    objData.push({
                        name: splitFile[0],
                        url: `${process.env.PUBLIC_URL}/${file}`,
                    })
                }
            }
            return {
                success: true,
                msg: "",
                data: objData,
            }
        } catch (error) {
            return { success: false, msg: "Bad request...!" }
        }
    }

    // Upload
    @Mutation(() => FileObjectResponse, { nullable: true })
    @UseMiddleware(authMiddleware)
    async singleUpload(
        @Arg("file", () => GraphQLUpload) { createReadStream, filename }: FileUpload
    ): Promise<FileObjectResponse> {
        try {
            if (!fs.existsSync(pathUpload)) fs.mkdirSync(pathUpload)
            createReadStream().pipe(createWriteStream(pathUpload + filename))

            const fileUrl = `${process.env.PUBLIC_URL}/${filename}`
            return {
                success: true,
                msg: "Upload file successfully!!!!!",
                data: fileUrl,
            }
        } catch (error) {
            return { success: false, msg: "Can not upload file... Please try again!" }
        }
    }
}
