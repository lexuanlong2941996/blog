import { lazy } from "react"
import { Box, useColorModeValue } from "@chakra-ui/react"

const Sidebar = lazy(() => import("./Sidebar"))
const BreadCumb = (lazy(() => import("../../../modules/BreadCrumb")))
const Main = lazy(() => import("./Main"))

const Layout: React.FC = () => {
    return (
        <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
            <Sidebar />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <BreadCumb />
                <Main />
            </Box>
        </Box>
    )
}



export default Layout
