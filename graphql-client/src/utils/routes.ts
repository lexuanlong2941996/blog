import { lazy } from "react"
import { IconType } from "react-icons"
import {
    FcStatistics,
    FcList,
    FcViewDetails,
    FcFile,
    FcVlc,
    FcBusinessman,
    FcPaid,
    FcShipped,
    FcMoneyTransfer,
    FcCurrencyExchange,
} from "react-icons/fc"

// Main
const MainIndex = lazy(() => import("../components/layout/dashboard/main-page/index"))
const Category = lazy(() => import("../components/layout/dashboard/main-page/Category"))
const Post = lazy(() => import("../components/layout/dashboard/main-page/Post"))
const CreatePost = lazy(
    () => import("../components/layout/dashboard/main-page/sub-page/CreatePost")
)
const UpdatePost = lazy(
    () => import("../components/layout/dashboard/main-page/sub-page/UpdatePost")
)
// const File = lazy(() => import("../components/layout/dashboard/main-page/File"))
// const Product = lazy(() => import("../components/layout/dashboard/main-page/Product"))
// const Order = lazy(() => import("../components/layout/dashboard/main-page/Order"))
// const Shipping = lazy(() => import("../components/layout/dashboard/main-page/Shipping"))
// const Payment = lazy(() => import("../components/layout/dashboard/main-page/Payment"))
// const Billing = lazy(() => import("../components/layout/dashboard/main-page/Billing"))

const User = lazy(() => import("../components/layout/dashboard/main-page/User"))

interface IRoute {
    title: string
    path: string
    element: React.FC
    icon?: IconType
    childPath?: string
}

export const routes: IRoute[] = [
    {
        title: "Dashboard",
        path: "/",
        element: MainIndex,
        icon: FcStatistics,
    },
    {
        title: "Category",
        path: "/category",
        element: Category,
        icon: FcList,
    },
    {
        title: "Post",
        path: "/post",
        element: Post,
        icon: FcViewDetails,
        childPath: "/post/create",
    },
    {
        title: "CreatePost",
        path: "/post/create",
        element: CreatePost,
    },
    {
        title: "UpdatePost",
        path: "/post/update",
        element: UpdatePost,
    },
    // {
    //     title: "File",
    //     path: "/file",
    //     element: File,
    //     icon: FcFile,
    // },
    // // Product
    // {
    //     title: "Product",
    //     path: "/product",
    //     element: Product,
    //     icon: FcVlc,
    // },
    // // Order
    // {
    //     title: "Order",
    //     path: "/order",
    //     element: Order,
    //     icon: FcPaid,
    // },
    // {
    //     title: "Shipping",
    //     path: "/shipping",
    //     element: Shipping,
    //     icon: FcShipped,
    // },
    // {
    //     title: "Payment",
    //     path: "/payment",
    //     element: Payment,
    //     icon: FcMoneyTransfer,
    // },
    // {
    //     title: "Billing",
    //     path: "/billing",
    //     element: Billing,
    //     icon: FcCurrencyExchange,
    // },
    {
        title: "User",
        path: "/user",
        element: User,
        icon: FcBusinessman,
    },
]
