import { gql } from "@apollo/client"

export const GET_ALL_POSTS = gql`
    query getAllPosts {
        getAllPosts {
            success
            msg
            data {
                _id
                title
                content
                thumbnail
                status
                category {
                    title
                }
                author {
                    name
                }
                createdAt
                updatedAt
            }
        }
    }
`
