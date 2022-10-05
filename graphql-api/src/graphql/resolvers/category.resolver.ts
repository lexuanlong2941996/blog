import {
    Ctx,
    Arg,
    Mutation,
    Query,
    Resolver,
    InputType,
    Field,
    ID,
    UseMiddleware,
} from "type-graphql"
import { CategoryArrResponse, CategoryObjectResponse } from "../../response-type/categoryResponse"
import authMiddleware from "../../middlewares/auth.middleware"
import { Category } from "../../models/category.model"
import { User } from "../../models/user.model"
import { Post } from "../../models/post.model"
import { ObjectId } from "mongoose"
import { IContext } from "../../global-types/token.type"
import { catchErr } from "../../response-type/errResponse"

@InputType()
class CreateCategoryInput {
    @Field()
    title: string

    @Field()
    description: string
}

@InputType()
class UpdateCategoryInput {
    @Field(() => ID)
    _id: ObjectId

    @Field()
    title: string

    @Field()
    description: string
}

@Resolver()
export class CategoryResolver {
    // Query
    @Query(() => CategoryArrResponse, { nullable: true })
    @UseMiddleware(authMiddleware)
    async getAllCategories(@Ctx() ctx: IContext) {
        const { userId } = ctx.req.user
        try {
            const categories = await Category.find({ author: userId })
                .populate("posts")
                .populate("author")

            return {
                success: true,
                msg: "",
                data: categories,
            }
        } catch (error) {
            return catchErr
        }
    }

    @Query(() => CategoryObjectResponse, { nullable: true })
    @UseMiddleware(authMiddleware)
    async getCategoryById(@Arg("_id") _id: string, @Ctx() ctx: IContext) {
        const { userId } = ctx.req.user
        try {
            const category = await Category.findOne({ _id, author: userId })
                .populate("posts")
                .populate("author")

            return {
                success: true,
                msg: "Successfully Create category",
                data: category,
            }
        } catch (error) {
            return catchErr
        }
    }

    // Mutation
    @Mutation(() => CategoryObjectResponse, { nullable: true }) // create
    @UseMiddleware(authMiddleware)
    async createCategory(
        @Arg("CreateCategoryInput")
        { title, description }: CreateCategoryInput,
        @Ctx() ctx: IContext
    ): Promise<CategoryObjectResponse> {
        const { userId } = ctx.req.user
        try {
            const existedCategory = await Category.findOne({ title, author: userId })
            if (existedCategory)
                return {
                    success: false,
                    msg: "Category title is existing... Please input another one!",
                }
            const category = await Category.create({
                title,
                description,
                author: userId,
            })
            await User.findByIdAndUpdate(userId, { $push: { categories: category } }) // add category to array of user owned
            return {
                success: true,
                msg: "Successfully create a new category!",
                data: category,
            }
        } catch (error) {
            return catchErr
        }
    }

    @Mutation(() => CategoryObjectResponse, { nullable: true }) // update
    @UseMiddleware(authMiddleware)
    async updateCategory(
        @Arg("UpdateCategoryInput")
        { _id, title, description }: UpdateCategoryInput,
        @Ctx() ctx: IContext
    ): Promise<CategoryObjectResponse> {
        const { userId } = ctx.req.user
        try {
            const category = await Category.findOneAndUpdate(
                { _id, author: userId },
                {
                    title,
                    description,
                },
                { new: true }
            )
            return {
                success: true,
                msg: "Successfully update category!",
                data: category,
            }
        } catch (error) {
            return catchErr
        }
    }

    @Mutation(() => CategoryObjectResponse, { nullable: true }) // update status
    @UseMiddleware(authMiddleware)
    async updateStatusCategory(
        @Arg("_id") _id: string,
        @Ctx() ctx: IContext
    ): Promise<CategoryObjectResponse> {
        const { userId } = ctx.req.user
        try {
            const category = await Category.findOne({ _id, author: userId })
            const newCategory = await Category.findOneAndUpdate(
                { _id, author: userId },
                {
                    status: category?.status === "Active" ? "Inactive" : "Active",
                },
                { new: true }
            )
            return {
                success: true,
                msg: "Successfully update category 's status!",
                data: newCategory,
            }
        } catch (error) {
            return catchErr
        }
    }

    @Mutation(() => CategoryObjectResponse, { nullable: true }) // Remove
    @UseMiddleware(authMiddleware)
    async removeCategory(
        @Arg("_id") _id: string,
        @Ctx() ctx: IContext
    ): Promise<CategoryObjectResponse> {
        const { userId } = ctx.req.user
        try {
            const exitedCategory = await Category.findOne({ _id, author: userId })
            if (!exitedCategory)
                return {
                    success: false,
                    msg: "Have no category ID",
                }
            const removeFromUser = User.findByIdAndUpdate(userId, {
                $pull: { categories: _id },
            }).select("-password") // remove cate to array of user owned
            const removeFromPost = Post.deleteMany({ category: _id }) // delete all posts of this category
            const removeCategory = Category.deleteOne({ _id }) // delete category

            const solvedRemove = await Promise.all([removeFromUser, removeFromPost, removeCategory])

            if (!solvedRemove)
                return {
                    success: false,
                    msg: "Can not remove category... Please check again!",
                }

            return {
                success: true,
                msg: "Successfully delete category!",
            }
        } catch (error) {
            return catchErr
        }
    }
}
