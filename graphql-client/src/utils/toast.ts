import { useToast as useChakraToast, UseToastOptions } from "@chakra-ui/react"

export const useToast = () => {
    const toast = useChakraToast()
    const returnFunction = (options: UseToastOptions) => toast({
        ...options,
        position: "bottom-right",
        duration: 2000,
        isClosable: true,
    })

    return Object.assign(returnFunction, toast)
}
