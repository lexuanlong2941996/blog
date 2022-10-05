import { Center, useColorModeValue } from "@chakra-ui/react"
import { Audio } from "react-loader-spinner"

const Loading = () => {
    const bgColor = useColorModeValue("gray.50", "gray.900")
    const textColor = useColorModeValue("teal.300", "white")
    return (
        <Center bg={bgColor} h="100vh">
            <Audio height="100" width="100" color={textColor} ariaLabel="loading" />
        </Center>
    )
}

export default Loading
