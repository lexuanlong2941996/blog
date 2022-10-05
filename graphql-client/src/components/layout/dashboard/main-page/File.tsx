import { Grid, Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react"
import { useQuery } from "@apollo/client"
import { GET_ALL_FILES } from "../../../../graphql-query/file/query"

type TFile = {
    name: string
    url: string
}

const File: React.FC = () => {
    // Chakra Color
    const bgColor = useColorModeValue("white", "gray.800")
    const textColor = useColorModeValue("gray.800", "white")

    const { data } = useQuery(GET_ALL_FILES, {
        fetchPolicy: "cache-and-network",
    })

    return (
        <Grid
            bg={bgColor}
            color={textColor}
            borderRadius="10px"
            templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
            templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
            gap="2"
        >
            {data &&
                data.getAllFiles.data &&
                data.getAllFiles.data.map((file: TFile, index: number) => (
                    <Flex key={index} direction="column" p="3">
                        <Box mb="20px" borderRadius="10px">
                            <Image
                                w="100%"
                                h={{ sm: "auto", md: "200px", lg: "300px" }}
                                objectFit="cover"
                                src={file.url}
                            />
                        </Box>
                        <Text fontSize="md" fontWeight="600">
                            {file.name}
                        </Text>
                    </Flex>
                ))}
        </Grid>
    )
}

export default File
