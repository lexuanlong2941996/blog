// Chakra imports
import { useNavigate } from "react-router-dom"
import { Text, Button, useColorModeValue, Grid, Box, Image, Stack, Heading, Avatar } from "@chakra-ui/react"
import { VscAdd } from "react-icons/vsc"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_ALL_POSTS } from "../../../../graphql-query/post/query"
import { IPostData } from "../../../../types/data.type"
import Moment from "react-moment"

type TPostCard = {
    bgColor: string
    textColor: string
    data: IPostData
}

const PostCard = ({ bgColor, textColor, data }: TPostCard) => {
    const categoryColor = useColorModeValue("purple.700", "purple.200")

    return (
        <Box maxW="400px" bg={bgColor} boxShadow="base" w="full" p="3" overflow="hidden">
            <Box bg={bgColor} mt="-6" mx="-6" mb="6" pos="relative">
                <Image w="100%" objectFit="cover" src={data.thumbnail} />
            </Box>
            <Stack>
                <Text color={categoryColor} fontWeight="600" fontSize="sm" letterSpacing="1.1">
                    {data.category.title}
                </Text>
                <Heading color={textColor} fontSize="2xl">
                    {data.title}
                </Heading>
            </Stack>
            <Stack mt="6" direction="row" spacing="4" align="center">
                <Avatar src="https://avatars0.githubusercontent.com/u/1164541?v=4" />
                <Stack direction="column" spacing="0" fontSize="sm">
                    <Text fontWeight="600">{data.author.name}</Text>
                    <Text color={textColor}>
                        <Moment date={data.createdAt} format="DD/MM/YYYY hh:mm:ss A" />
                    </Text>
                </Stack>
            </Stack>
        </Box>
    )
}

const Post: React.FC = () => {
    const [posts, setPosts] = useState([])
    useQuery(GET_ALL_POSTS, {
        onCompleted({ getAllPosts }) {
            setPosts(getAllPosts.data)
        },
        fetchPolicy: "cache-and-network",
    })

    const navigate = useNavigate()

    // CHAKRA COLOR
    const bgColor = useColorModeValue("white", "gray.700")
    const textColor = useColorModeValue("gray.800", "white")

    return (
        <>
            <Button
                onClick={() => navigate("/post/create")}
                rightIcon={<VscAdd />}
                size="sm"
                colorScheme="green"
                variant="ghost"
            >
                Add New
            </Button>
            <Grid
                mt="3"
                p="3"
                color={textColor}
                borderRadius="5px"
                templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
                templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
                gap="24px"
            >
                {posts &&
                    posts.map((item: IPostData, index: number) => (
                        <PostCard key={index} bgColor={bgColor} textColor={textColor} data={item} />
                    ))}
            </Grid>
        </>
    )
}

export default Post
