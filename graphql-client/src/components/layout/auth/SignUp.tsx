// Chakra imports
import {
    Button,
    Center,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Icon,
    Input,
    Link,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"
import { FaGithub, FaFacebook, FaGoogle } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { ColorModeSwitcher } from "../../../modules/ColorModeSwitcher"
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { SIGN_UP } from "../../../graphql-query/auth/mutation"
import { useToast } from "../../../utils/toast"

interface ISignUpData {
    email: string
    password: string
    name: string
}

const SignUp: React.FC = () => {
    const navigate = useNavigate()
    const toast = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignUpData>()
    const [signUp, { loading }] = useMutation(SIGN_UP, {
        onCompleted({ register }) {
            const { success, msg } = register
            if (!success)
                return toast({
                    title: "ERROR",
                    description: msg,
                    status: "error",
                })
            toast({
                title: "SUCCESS",
                description: msg,
                status: "success",
            })
            return navigate("/", { replace: true })
        },
    })
    const handleSignUp: SubmitHandler<ISignUpData> = async signUpData => {
        try {
            signUp({ variables: { registerInput: signUpData } })
        } catch (error) {}
    }
    // Chakra color
    const titleColor = useColorModeValue("teal.300", "teal.200")
    const textColor = useColorModeValue("gray.700", "white")
    const bgColor = useColorModeValue("white", "gray.700")
    const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)")

    return (
        <>
            <ColorModeSwitcher position="absolute" top="0" right="0" />
            <Center h="100vh">
                <Flex
                    direction="column"
                    w="400px"
                    background="transparent"
                    borderRadius="15px"
                    p="40px"
                    mx={{ base: "100px" }}
                    bg={bgColor}
                    boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                >
                    <Text
                        fontSize="xl"
                        color={textColor}
                        fontWeight="bold"
                        textAlign="center"
                        mb="22px"
                    >
                        Register With
                    </Text>
                    <HStack spacing="15px" justify="center" mb="22px">
                        <Flex
                            justify="center"
                            align="center"
                            w="75px"
                            h="75px"
                            borderRadius="15px"
                            border="1px solid lightgray"
                            cursor="pointer"
                            transition="all .25s ease"
                            _hover={{ filter: "brightness(120%)", bg: bgIcons }}
                        >
                            <Link href="#">
                                <Icon
                                    as={FaGithub}
                                    w="30px"
                                    h="30px"
                                    _hover={{ filter: "brightness(120%)" }}
                                />
                            </Link>
                        </Flex>
                        <Flex
                            justify="center"
                            align="center"
                            w="75px"
                            h="75px"
                            borderRadius="15px"
                            border="1px solid lightgray"
                            cursor="pointer"
                            transition="all .25s ease"
                            _hover={{ filter: "brightness(120%)", bg: bgIcons }}
                        >
                            <Link href="#">
                                <Icon
                                    as={FaFacebook}
                                    w="30px"
                                    h="30px"
                                    _hover={{ filter: "brightness(120%)" }}
                                />
                            </Link>
                        </Flex>
                        <Flex
                            justify="center"
                            align="center"
                            w="75px"
                            h="75px"
                            borderRadius="15px"
                            border="1px solid lightgray"
                            cursor="pointer"
                            transition="all .25s ease"
                            _hover={{ filter: "brightness(120%)", bg: bgIcons }}
                        >
                            <Link href="#">
                                <Icon
                                    as={FaGoogle}
                                    w="30px"
                                    h="30px"
                                    _hover={{ filter: "brightness(120%)" }}
                                />
                            </Link>
                        </Flex>
                    </HStack>
                    <Text
                        fontSize="lg"
                        color="gray.400"
                        fontWeight="bold"
                        textAlign="center"
                        mb="22px"
                    >
                        or
                    </Text>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <FormControl mb="4" isInvalid={!!errors.email}>
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Email
                            </FormLabel>
                            <Input
                                {...register("email", {
                                    required: "Email is required",
                                    minLength: {
                                        value: 6,
                                        message: "Must be at least 6 characters",
                                    },
                                })}
                                type="email"
                                fontSize="sm"
                                borderRadius="15px"
                                placeholder="Your email"
                                size="lg"
                            />
                            <FormErrorMessage my="2" fontSize="xs">
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mb="4" isInvalid={!!errors.password}>
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Password
                            </FormLabel>
                            <Input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Must be at least 6 characters",
                                    },
                                })}
                                type="password"
                                placeholder="Your password"
                                fontSize="sm"
                                borderRadius="15px"
                                size="lg"
                            />
                            <FormErrorMessage my="2" fontSize="xs">
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!errors.name}>
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Name (Optional)
                            </FormLabel>
                            <Input
                                {...register("name")}
                                id="signup-name"
                                type="text"
                                fontSize="sm"
                                borderRadius="15px"
                                placeholder="Your name"
                                mb="24px"
                                size="lg"
                            />
                            <Button
                                type="submit"
                                bg="teal.300"
                                fontSize="15px"
                                color="white"
                                fontWeight="bold"
                                w="100%"
                                h="45"
                                mb="24px"
                                _hover={{
                                    bg: "teal.200",
                                }}
                                _active={{
                                    bg: "teal.400",
                                }}
                                isLoading={loading}
                            >
                                SIGN UP
                            </Button>
                        </FormControl>
                    </form>
                    <Flex
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        maxW="100%"
                        mt="0px"
                    >
                        <Text color={textColor} fontWeight="medium">
                            Already have an account?
                            <Link
                                as={NavLink}
                                to="/auth/signin"
                                color={titleColor}
                                ms="5px"
                                fontWeight="bold"
                            >
                                Sign In
                            </Link>
                        </Text>
                    </Flex>
                </Flex>
            </Center>
        </>
    )
}

export default SignUp
