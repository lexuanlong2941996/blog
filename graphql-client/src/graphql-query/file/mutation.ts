import { gql } from "@apollo/client"

export const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!) {
        singleUpload(file: $file) {
            success
            msg
            data
        }
    }
`
