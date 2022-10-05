import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    useColorModeValue,
} from "@chakra-ui/react"
import { FiChevronRight } from "react-icons/fi"
import { useLocation, Link as RouterLink } from "react-router-dom"

const BreadCrumb: React.FC = () => {
    const { pathname } = useLocation()
    const textColor = useColorModeValue("yellow.500", "yellow.200")

    const x: number = pathname.slice(1).split("/").length

    return (
        <>
            {pathname !== "/" && (
                <Flex mb="4" justifyContent="flex-end" alignItems="center">
                    <Breadcrumb
                        spacing="10px"
                        color={textColor}
                        fontSize="sm"
                        separator={<FiChevronRight />}
                    >
                        <BreadcrumbItem as="i">
                            <BreadcrumbLink as={RouterLink} to="/">
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem as="i" isCurrentPage>
                            <BreadcrumbLink
                                as={RouterLink}
                                to={pathname.split("/")[1]}
                                style={{ textTransform: "capitalize" }}
                            >
                                {pathname.split("/")[1]}
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {x >= 2 && (
                            <BreadcrumbItem as="i" isCurrentPage>
                                <BreadcrumbLink
                                    as={RouterLink}
                                    to={pathname}
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {pathname.split("/")[x]}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        )}
                    </Breadcrumb>
                </Flex>
            )}
        </>
    )
}

export default BreadCrumb
