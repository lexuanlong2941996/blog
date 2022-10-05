import { gql } from "@apollo/client"

export const GET_ALL_CATEGORIES = gql`
    query getAllCategories {
        getAllCategories {
            success
            msg
            data {
                _id
                title
                description
                status
                posts {
                    _id
                }
                author {
                    name
                }
            }
        }
    }
`
