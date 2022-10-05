import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { GET_ALL_CATEGORIES } from "../../../../../graphql-query/category/query"
import {
    Button,
    FormControl,
    FormLabel,
    useColorModeValue,
    FormErrorMessage,
    Icon,
    Input,
    Textarea,
    Image,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react"
import { FcMms, FcExternal, FcAbout } from "react-icons/fc"
import CkeditorCustom from "../../../../../modules/CkeditorCustom"
import { ICategoryData } from "../../../../../types/data.type"
import { SubmitHandler, useForm } from "react-hook-form"
import Select, { StylesConfig } from "react-select"
import { useToast } from "../../../../../utils/toast"
import { FiImage } from "react-icons/fi"
import FileUpload from "../../../../../modules/FileUpload"
import { CREATE_POST } from "../../../../../graphql-query/post/mutation"
import { UPLOAD_FILE } from "../../../../../graphql-query/file/mutation"

interface ICreatePostInput {
    title: string
    description?: string
    content: string
    thumb: string
    cateId: string
    authorId: string
}

// React select
const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",
    ":before": {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: "block",
        marginRight: 8,
        height: 10,
        width: 10,
    },
})

const CreatePost: React.FC = () => {
    // CHAKRA COLOR
    const bgColor = useColorModeValue("white", "gray.700")
    const textColor = useColorModeValue("gray", "white")
    const textPlaceholderColor = useColorModeValue("purple", "yellow")
    const bgMenuColor = useColorModeValue("white", "black")

    const toast = useToast()

    // CUSTOM REACT SELECT 'S STYLE
    const customStyles: StylesConfig = {
        control: (styles: any) => ({
            ...styles,
            backgroundColor: bgColor,
        }),
        input: styles => ({ ...styles, ...dot(textPlaceholderColor) }),
        placeholder: styles => ({ ...styles, ...dot("yellow"), color: textPlaceholderColor }),
        menu: provided => ({
            ...provided,
            backgroundColor: bgMenuColor,
            color: textColor,
            zIndex: 99,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "purple" : bgColor,
            color: state.isSelected ? "yellow" : textColor,
            cursor: state.isSelected ? "not-allowed" : "pointer",
        }),
        singleValue: provided => ({
            ...provided,
            ...dot("yellow"),
            color: textPlaceholderColor,
        }),
    }
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    // GET ALL CATEs
    useQuery(GET_ALL_CATEGORIES, {
        onCompleted({ getAllCategories }) {
            setCategories(
                getAllCategories.data.map((item: ICategoryData) => ({
                    label: item.title,
                    value: item._id,
                }))
            )
        },
        fetchPolicy:"cache-and-network"
    })

    // CREATE POST
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { isSubmitted, errors },
    } = useForm<ICreatePostInput>()

    // handle cateId
    useEffect(() => setValue("cateId", selectedCategory), [selectedCategory])

    // handle content
    const handleContent = (content: string) => setValue("content", content)

    // handle image preview
    const [imgPreview, setImgPreview] = useState<string>()
    useEffect(() => {
        const handlePreviewThumb = () => {
            const stringFile = watch("thumb")
            const blobFile = new Blob([stringFile[0]], { type: "image/*" })

            const fileReader = new FileReader()
            fileReader.onloadend = () => setImgPreview(fileReader.result as string)
            fileReader.readAsDataURL(blobFile)
        }
        handlePreviewThumb()
    }, [watch("thumb")])

    const [createPostMutation, { loading }] = useMutation(CREATE_POST, {
        onCompleted({ createPost }) {
            const { success, msg } = createPost
            if (!success)
                return toast({
                    title: "Opps...",
                    description: msg,
                    status: "error",
                })
            toast({
                title: "Congrt!",
                description: msg,
                status: "success",
            })
        },
    })

    const [uploadThumbMutation] = useMutation(UPLOAD_FILE) // upload image first

    const handleCreatePost: SubmitHandler<ICreatePostInput> = async data => {
        try {
            const { cateId, title, description, content } = data
            const thumbFile = data.thumb[0]
            const fileUploaded = await uploadThumbMutation({ variables: { file: thumbFile } })
            const finishPostData = {
                cateId,
                title,
                description,
                content,
                thumbnail: fileUploaded.data.singleUpload.data,
            }
            createPostMutation({ variables: { createPostInput: finishPostData } })
            // handle reset form
            reset()
        } catch (error) {}
    }

    return (
        <form onSubmit={handleSubmit(handleCreatePost)}>
            <FormControl mb="4" isInvalid={!!errors.cateId} isRequired>
                <FormLabel>Category</FormLabel>
                <span
                    {...register("cateId", {
                        required: "* Please select category",
                    })}
                ></span>
                <Select
                    className="post__cate"
                    styles={customStyles}
                    placeholder="Select Category"
                    options={categories}
                    onChange={({ value }: any) => setSelectedCategory(value)}
                />
                <FormErrorMessage>{errors.cateId && errors.cateId.message}</FormErrorMessage>
            </FormControl>
            <Tabs mb="4" isFitted variant="enclosed">
                <TabList>
                    <Tab>
                        <Icon as={FcExternal} mr="2" />
                        Title *
                    </Tab>
                    <Tab>
                        <Icon as={FcAbout} mr="2" />
                        Description (Optional)
                    </Tab>
                    <Tab>
                        <Icon as={FcMms} mr="2" />
                        Upload Thumbnail *
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <FormControl isInvalid={!!errors.title} isRequired>
                            <Input
                                bg={bgColor}
                                placeholder="Title"
                                {...register("title", {
                                    required: "* Title is required",
                                    minLength: {
                                        value: 6,
                                        message: "* Must be at least 6 characters",
                                    },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.title && errors.title.message}
                            </FormErrorMessage>
                        </FormControl>
                    </TabPanel>
                    <TabPanel>
                        <FormControl>
                            <Textarea
                                bg={bgColor}
                                placeholder="Description..."
                                {...register("description")}
                            />
                        </FormControl>
                    </TabPanel>
                    <TabPanel>
                        <FormControl mb="4" isInvalid={!!errors.thumb} isRequired>
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
                            {imgPreview !== "data:image/*;base64,dW5kZWZpbmVk" && (
                                <Image
                                    my="2"
                                    boxSize="150px"
                                    objectFit="cover"
                                    src={imgPreview}
                                    alt="preview thumbnail"
                                />
                            )}
                            <FormErrorMessage>
                                {errors.thumb && errors.thumb.message}
                            </FormErrorMessage>
                        </FormControl>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <FormControl mb="4" isInvalid={!!errors.content} isRequired>
                <FormLabel>Content</FormLabel>
                <span
                    {...register("content", {
                        required: "* Content is required",
                    })}
                ></span>
                <CkeditorCustom getContent={handleContent} isSubmitted={isSubmitted} />
                <FormErrorMessage>{errors.content && errors.content.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" isLoading={loading} colorScheme="green" mr="3">
                Create
            </Button>
        </form>
    )
}

export default CreatePost
