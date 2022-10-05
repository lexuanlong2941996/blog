import { Schema, model } from "mongoose"

const CategoryModel: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            required: true,
            enum: ["Active", "Inactive"],
            default: "Inactive",
        },
        posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
        author: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
)

export const Category = model("category", CategoryModel)
