import { gql } from "@apollo/client"

export const GET_USER = gql`
    query UserById($id: String!) {
        getUserById(_id: $id) {
            success
            msg
            data {
                _id
                email
            }
        }
    }
`
