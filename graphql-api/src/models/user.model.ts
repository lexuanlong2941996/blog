import { Schema, model } from "mongoose"

const UserModel: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        wallet: {
            type: String,
        },
        role: {
            type: String,
            required: true,
            enum: ["Admin", "Guest"],
            default: "Admin",
        },
        categories: [{ type: Schema.Types.ObjectId, ref: "category" }],
        posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
    },
    { timestamps: true }
)

export const User = model("user", UserModel)
