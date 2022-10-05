import { useRef } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "ckeditor5-build-classic-dna"
import { configCKEDITOR } from "../utils/ckEditorCustomDarkMode"
import { useColorModeValue } from "@chakra-ui/react"
import "../styles/ckeditor.css"

type TCkEditorCustom = {
    getContent: (content: string) => void
    isSubmitted: boolean
}

const CkeditorCustom = ({ getContent, isSubmitted }: TCkEditorCustom) => {
    // STYLE CKEDITOR
    const baseColor = useColorModeValue("white", "#1721371c")
    const foreColor = useColorModeValue("rgb(239 225 255)", "#8396d99c")
    const textColor = useColorModeValue("gray", "white")
    const toolTipBgColor = useColorModeValue("black", "white")
    const toolTipTextColor = useColorModeValue("white", "black")
    configCKEDITOR(baseColor, foreColor, textColor, toolTipBgColor, toolTipTextColor)

    // HANDLE DATA
    const typingTimeOutRef = useRef(null)
    const handleChangeData = (content: string) => {
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        }
        typingTimeOutRef.current = setTimeout(() => {
            getContent(content)
        }, 300) as any
    }

    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                image: {
                    toolbar: [
                        "imageStyle:inline",
                        "imageStyle:block",
                        "imageStyle:side",
                        "|",
                        "toggleImageCaption",
                        "imageTextAlternative",
                    ],
                },
            }}
            // data={getValues("content") ?? ""}
            data={isSubmitted && ""}
            onReady={(editor: any) => {}}
            onChange={(event: string, editor: any) => {
                const data = editor.getData()
                handleChangeData(data)
            }}
        />
    )
}

export default CkeditorCustom
