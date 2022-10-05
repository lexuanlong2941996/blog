import { Fragment } from "react"
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Image,
    keyframes,
    Stack,
} from "@chakra-ui/react"
import { IconType } from "react-icons"
import { routes } from "../../../utils/routes"
import { FcPlus } from "react-icons/fc"
import { FiBell, FiChevronDown } from "react-icons/fi"
import { FcMenu } from "react-icons/fc"
import { ColorModeSwitcher } from "../../../modules/ColorModeSwitcher"
import { NavLink, Link as RouterLink } from "react-router-dom"
import useAuth from "../../../context/AuthProvider"

const Sidebar: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {/* Desktop Menu */}
            <SidebarContent onClose={onClose} display={{ base: "none", md: "block" }} />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                onOverlayClick={onClose}
                returnFocusOnClose={false}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>

            {/* Mobile Menu */}
            <MobileNav onOpen={onOpen} />
        </>
    )
}

interface SidebarProps extends BoxProps {
    onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const bgColor = useColorModeValue("white", "gray.900")
    return (
        <Box
            transition="3s ease"
            bg={bgColor}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.100", "gray.800")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="4" justifyContent="space-around">
                <Image boxSize="70px" src="/zuno.png" />
                <Text
                    color={useColorModeValue("cyan.500", "white")}
                    fontSize="xl"
                    fontFamily="monospace"
                    fontWeight="bold"
                >
                    ZUNO CMS
                </Text>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>
            {routes.map(
                (route, index: number) =>
                    route.icon && (
                        <Fragment key={index}>
                            {!route.childPath && (
                                <NavItem icon={route.icon} href={route.path} onClick={onClose}>
                                    {route.title}
                                </NavItem>
                            )}
                            {route.childPath && (
                                <Stack spacing="12" direction="row">
                                    <NavItem icon={route.icon} href={route.path} onClick={onClose}>
                                        {route.title}
                                    </NavItem>

                                    <Flex align="center">
                                        <RouterLink to={route.childPath} replace={true}>
                                            <FcPlus onClick={onClose} />
                                        </RouterLink>
                                    </Flex>
                                </Stack>
                            )}
                        </Fragment>
                    )
            )}
            <Flex alignItems="center" justifyContent="center">
                <ColorModeSwitcher />
            </Flex>
        </Box>
    )
}

interface NavItemProps extends FlexProps {
    icon: IconType
    href: string
    children: React.ReactNode
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
    return (
        <Link as={NavLink} to={href} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "cyan.400",
                    color: "white",
                }}
                {...rest}
            >
                <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                        color: "white",
                    }}
                    as={icon}
                />
                {children}
            </Flex>
        </Link>
    )
}

interface MobileProps extends FlexProps {
    onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const {
        authState: { user },
        signOut,
    } = useAuth()
    const size = "35px"
    const color = useColorModeValue("purple.700", "purple.200")

    const pulseRing = keyframes`
        0% {
            transform: scale(0.33);
        }
        40%,
        50% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
	`

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.100", "gray.800")}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FcMenu />}
            />

            <Text display={{ base: "flex", md: "none" }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
                <Flex alignItems="center">
                    <Menu>
                        <MenuButton py="2" transition="all 0.3s" _focus={{ boxShadow: "none" }}>
                            <HStack>
                                <Flex justifyContent="center" alignItems="center" w="full" h="full" overflow="hidden">
                                    {/* Ideally, only the box should be used. The <Flex /> is used to style the preview. */}
                                    <Box
                                        as="div"
                                        position="relative"
                                        w={size}
                                        h={size}
                                        _before={{
                                            content: "''",
                                            position: "relative",
                                            display: "block",
                                            width: "300%",
                                            height: "300%",
                                            boxSizing: "border-box",
                                            marginLeft: "-100%",
                                            marginTop: "-100%",
                                            borderRadius: "50%",
                                            bgColor: color,
                                            animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
                                        }}
                                    >
                                        <Avatar src="zuno.png" size="full" position="absolute" top="0" left="0" />
                                    </Box>
                                </Flex>

                                <VStack display={{ base: "none", md: "flex" }} alignItems="flex-start" spacing="1px">
                                    <Text fontSize="sm">{user?.name}</Text>
                                    <Text fontSize="xs" color={useColorModeValue("purple.700", "purple.200")}>
                                        {user?.role}
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue("white", "gray.800")}
                            borderColor={useColorModeValue("gray.200", "gray.700")}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={() => signOut("fn")}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}

export default Sidebar
