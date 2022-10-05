import { gql } from "@apollo/client"

// AUTH
export const SIGN_UP = gql`
    mutation Register($registerInput: RegisterInput!) {
        register(registerInput: $registerInput) {
            success
            msg
        }
    }
`

export const SIGN_IN = gql`
    mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            success
            msg
            data {
                accessToken
                refreshToken
            }
        }
    }
`