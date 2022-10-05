import { Schema, model } from "mongoose"

const PostModel: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["Active", "Inactive"],
            default: "Inactive",
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "category",
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
)

export const Post = model("post", PostModel)
