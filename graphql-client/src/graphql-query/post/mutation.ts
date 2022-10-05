import { gql } from "@apollo/client"

export const CREATE_POST = gql`
    mutation createPost($createPostInput: CreatePostInput!) {
        createPost(CreatePostInput: $createPostInput) {
            success
            msg
            data {
                _id
            }
        }
    }
`

// export const UPDATE_POST = gql``

// export const DELETE_POST = gql``
