// Chakra imports
import {
    Flex,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Switch,
    Text,
    useColorModeValue,
    Center,
    FormErrorMessage,
} from "@chakra-ui/react"
import { NavLink, Navigate, useLocation } from "react-router-dom"
import { ColorModeSwitcher } from "../../../modules/ColorModeSwitcher"
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { SIGN_IN } from "../../../graphql-query/auth/mutation"
import { useToast } from "../../../utils/toast"
import useAuth from "../../../context/AuthProvider"

interface ISignInData {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const { authState, signIn } = useAuth()
    const location = useLocation()
    const toast = useToast()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignInData>()
    const [signInMutation, { loading }] = useMutation(SIGN_IN, {
        onCompleted(res) {
            const {
                login: { success, msg, data },
            } = res
            if (!success)
                return toast({
                    title: "Opps...",
                    description: msg,
                    status: "error",
                })
            toast({
                title: "Congrt!",
                description: msg,
                status: "success",
            })
            signIn(data.accessToken)
        },
    })

    const handleSignIn: SubmitHandler<ISignInData> = data => {
        signInMutation({ variables: { loginInput: data } })
    }

    // Chakra color mode
    const titleColor = useColorModeValue("teal.300", "teal.200")
    const textColor = useColorModeValue("gray.400", "white")
    const bgColor = useColorModeValue("white", "gray.700")

    const from = location.state as { previousPage: string }
    if (authState?.isAuth) return <Navigate to={from ? from.previousPage : "/"} replace={true} />
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
                    <Heading color={titleColor} fontSize="32px" mb="10px">
                        Welcome Back
                    </Heading>
                    <Text mb="36px" ms="4px" color={textColor} fontWeight="bold" fontSize="14px">
                        Enter your email and password to sign in
                    </Text>
                    <form onSubmit={handleSubmit(handleSignIn)}>
                        <FormControl mb="4" isInvalid={!!errors.email}>
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Email
                            </FormLabel>
                            <Input
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                type="text"
                                borderRadius="15px"
                                fontSize="sm"
                                placeholder="Your email adress"
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
                                })}
                                type="password"
                                borderRadius="15px"
                                fontSize="sm"
                                placeholder="Your password"
                                size="lg"
                            />
                            <FormErrorMessage my="2" fontSize="xs">
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl display="flex" alignItems="center">
                            <Switch colorScheme="teal" me="10px" />
                            <FormLabel htmlFor="remember-login" mb="0" ms="1" fontWeight="normal">
                                Remember me
                            </FormLabel>
                        </FormControl>
                        <Button
                            fontSize="20px"
                            type="submit"
                            bg="teal.300"
                            w="100%"
                            h="45"
                            mb="20px"
                            color="white"
                            mt="20px"
                            _hover={{
                                bg: "teal.200",
                            }}
                            _active={{
                                bg: "teal.400",
                            }}
                            isLoading={loading && true}
                        >
                            SIGN IN
                        </Button>
                    </form>
                    <Flex
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        maxW="100%"
                        mt="0px"
                    >
                        <Text color={textColor} fontWeight="medium">
                            Don't have an account?
                            <Link
                                as={NavLink}
                                to="/auth/signup"
                                color={titleColor}
                                ms="5px"
                                fontWeight="bold"
                            >
                                Sign Up
                            </Link>
                        </Text>
                    </Flex>
                </Flex>
            </Center>
        </>
    )
}

export default SignIn
