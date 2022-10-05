import { useRef } from "react"
import { InputGroup } from "@chakra-ui/react"
import { UseFormRegisterReturn } from "react-hook-form"

// Form upload file
type FileUploadProps = {
    register: UseFormRegisterReturn
    accept?: string
    multiple?: boolean
    children?: React.ReactNode
}

const FileUpload = ({ register, accept, multiple, children }: FileUploadProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { ref, ...rest } = register as { ref: (instance: HTMLInputElement | null) => void }

    const handleClickFormUpload = () => inputRef.current?.click()

    return (
        <InputGroup onClick={handleClickFormUpload}>
            <input
                type="file"
                multiple={multiple || false}
                hidden
                accept={accept}
                ref={e => {
                    ref(e)
                    inputRef.current = e
                }}
                {...rest}
            />
            {children}
        </InputGroup>
    )
}

export default FileUpload
