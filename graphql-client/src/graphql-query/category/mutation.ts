import { gql } from "@apollo/client"

export const CREATE_CATEGORY = gql`
    mutation createCategory($createCategoryInput: CreateCategoryInput!) {
        createCategory(CreateCategoryInput: $createCategoryInput) {
            success
            msg
            data {
                _id
                title
                description
            }
        }
    }
`

export const UPDATE_CATEGORY = gql`
    mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {
        updateCategory(UpdateCategoryInput: $updateCategoryInput) {
            success
            msg
            data {
                _id
                title
                description
            }
        }
    }
`

export const UPDATE_STATUS_CATEGORY = gql`
    mutation updateStatusCategory($id: String!) {
        updateStatusCategory(_id: $id) {
            success
            msg
            data {
                _id
                status
            }
        }
    }
`

export const REMOVE_CATEGORY = gql`
    mutation removeCategory($id: String!) {
        removeCategory(_id: $id) {
            success
            msg
        }
    }
`
