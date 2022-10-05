import { useMutation } from "@apollo/client"
import { FormControl, FormLabel, Button, Icon, FormErrorMessage } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { FiImage } from "react-icons/fi"
import { UPLOAD_FILE } from "../../../../graphql-query/file/mutation"
import FileUpload from "../../../../modules/FileUpload"

const Order: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [uploadMutation, { loading }] = useMutation(UPLOAD_FILE, {
        onCompleted(res) {
            console.log(res.singleUpload)
        },
    })

    const handleUpload = (data: any) => {
        try {
            const file = data.thumb[0]
            uploadMutation({ variables: { file } })
        } catch (error) {}
    }

    return (
        <form onSubmit={handleSubmit(handleUpload)} encType="multipart/form-data">
            <FormControl mb="4" isInvalid={!!errors.thumb} isRequired>
                <FormLabel>Upload thumbnail</FormLabel>

                <FileUpload
                    accept={"image/*"}
                    register={register("thumb", {
                        validate: (files: any) => {
                            // handle thumbnail upload
                            if (files.length < 1) return "* Files is required"
                            // for (const file of Array.from(files)) {}
                            // validate single file upload
                            const fsMb = files[0].size / (1024 * 1024)
                            const maxSize = 10
                            if (fsMb > maxSize) return "* Max file size 10mb"
                            return true
                        },
                    })}
                >
                    <Button leftIcon={<Icon as={FiImage} />}>Upload</Button>
                </FileUpload>
                <FormErrorMessage>
                    {/* {errors.thumb && errors.thumb.message} */}
                    loi roi
                </FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={loading} colorScheme="green" mr="3">
                Upload
            </Button>
        </form>
    )
}

export default Order
