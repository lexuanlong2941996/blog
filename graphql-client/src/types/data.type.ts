export interface ICategoryData {
    _id: string
    title: string
    description: string
    status: string
    posts: IPostData[]
    author: IUser
    createdAt?: Date
    updatedAt?: Date
}

export interface IPostData {
    _id: string
    title: string
    content: string
    thumbnail: string
    category: ICategoryData,
    author: IUser
    createdAt?: Date
    updatedAt?: Date
}

export interface IUser {
    _id: string
    email: string
    name: string
    categories: ICategoryData[]
    posts: IPostData[]
    createdAt?: Date
    updatedAt?: Date
}