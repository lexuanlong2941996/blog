import { Ctx, Arg, Mutation, Query, Resolver, InputType, Field, UseMiddleware } from "type-graphql"
import { PostArrResponse, PostObjectResponse } from "../../response-type/postResponse"
import authMiddleware from "../../middlewares/auth.middleware"
import { Post } from "../../models/post.model"
import { User } from "../../models/user.model"
import { Category } from "../../models/category.model"
import { IContext } from "../../global-types/token.type"
import { catchErr } from "../../response-type/errResponse"

@InputType()
class CreatePostInput {
    @Field()
    title: string

    @Field(() => String, { nullable: true })
    description?: string

    @Field()
    content: string

    @Field()
    thumbnail: string

    @Field()
    cateId: string
}

@Resolver()
export class PostResolver {
    // Query
    @Query(() => PostArrResponse, { nullable: true })
    @UseMiddleware(authMiddleware)
    async getAllPosts(@Ctx() ctx: IContext) {
        const { userId } = ctx.req.user
        try {
            const posts = await Post.find({ author: userId })
                .populate("category")
                .populate("author")
            return {
                success: true,
                msg: "",
                data: posts,
            }
        } catch (error) {
            return catchErr
        }
    }

    @Query(() => PostObjectResponse, { nullable: true })
    @UseMiddleware(authMiddleware)
    async getPostById(@Arg("_id") _id: string, @Ctx() ctx: IContext) {
        const { userId } = ctx.req.user
        try {
            const post = await Post.findOne({ _id, author: userId })
                .populate("category")
                .populate("author")
            return {
                success: true,
                data: post,
                msg: "",
            }
        } catch (error) {
            return catchErr
        }
    }

    @Query(() => PostObjectResponse, { nullable: true })
    @UseMiddleware(authMiddleware)
    async getPostsByCategoryId(@Arg("cateId") cateId: string, @Ctx() ctx: IContext) {
        const { userId } = ctx.req.user
        try {
            const posts = await Post.find({ category: cateId, author: userId })
            return {
                success: true,
                msg: "",
                data: posts,
            }
        } catch (error) {
            return catchErr
        }
    }

    // Mutation
    @Mutation(() => PostObjectResponse, { nullable: true })
    @UseMiddleware(authMiddleware)
    async createPost(
        @Arg("CreatePostInput")
        { title, description, content, thumbnail, cateId }: CreatePostInput,
        @Ctx() ctx: IContext
    ): Promise<PostObjectResponse> {
        const { userId } = ctx.req.user
        try {
            const existedPost = await Post.findOne({ title, author: userId })
            if (existedPost)
                return {
                    success: false,
                    msg: "Post title is existed... Please input another one!",
                }
            const post = await Post.create({
                title,
                description,
                content,
                thumbnail,
                category: cateId,
                author: userId,
            })
            await User.findByIdAndUpdate(userId, { $push: { posts: post } })
            await Category.findByIdAndUpdate(cateId, { $push: { posts: post } })
            return {
                success: true,
                msg: "Successfully create a new post!",
                data: post,
            }
        } catch (error) {
            return catchErr
        }
    }
}
