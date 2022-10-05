import { gql } from "@apollo/client"

export const GET_ALL_FILES = gql`
    query getAllFiles {
        getAllFiles {
            success
            msg
            data {
                name
                url
            }
        }
    }
`
