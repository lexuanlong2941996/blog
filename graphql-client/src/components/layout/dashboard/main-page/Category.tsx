// Chakra imports
import {
    Table,
    Tbody,
    Text,
    Td,
    Th,
    Thead,
    Tr,
    TableContainer,
    Button,
    Badge,
    useColorModeValue,
    Box,
    ButtonGroup,
    useDisclosure,
    FormControl,
    FormLabel,
    Textarea,
    Tooltip,
    InputLeftElement,
    InputGroup,
    Input,
    FormErrorMessage,
} from "@chakra-ui/react"
import { VscAdd } from "react-icons/vsc"
import { FiEdit2, FiDelete, FiBookOpen } from "react-icons/fi"
import { useState } from "react"
import { useForm, Resolver, FormProvider, useFormContext, SubmitHandler, Controller } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client"
import { GET_ALL_CATEGORIES } from "../../../../graphql-query/category/query"
import {
    CREATE_CATEGORY,
    UPDATE_CATEGORY,
    UPDATE_STATUS_CATEGORY,
    REMOVE_CATEGORY,
} from "../../../../graphql-query/category/mutation"
import { ICategoryData } from "../../../../types/data.type"
import { useToast } from "../../../../utils/toast"
import ModalComponent from "../../../../modules/ModalComponent"

interface ICategoryInput {
    _id?: string
    title: string
    description: string
}

const Category: React.FC = () => {
    // Chakra color mode
    const titleColor = useColorModeValue("purple.700", "purple.200")
    const bgColor = useColorModeValue("white", "gray.800")
    const textColor = useColorModeValue("gray.800", "white")

    const toast = useToast()
    const [modalValue, setModalValue] = useState<any>(null)

    // GET ALL CATEs
    const [categories, setCategories] = useState([])
    useQuery(GET_ALL_CATEGORIES, {
        onCompleted({ getAllCategories }) {
            setCategories(getAllCategories.data)
        },
        fetchPolicy: "cache-and-network",
    })

    // CREATE CATE
    const {
        isOpen: isOpenCreateCategory,
        onOpen: onOpenCreateCategory,
        onClose: onCloseCreateCategory,
    } = useDisclosure() // Create category
    const createMethods = useForm<ICategoryInput>()
    const { handleSubmit: handleSubmitCreateCategory, reset: resetValueCreateCategory } = createMethods
    const [createCategoryMutation, { loading: isLoadingCreateCate }] = useMutation(CREATE_CATEGORY, {
        onCompleted({ createCategory }) {
            const { success, msg } = createCategory
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
            resetValueCreateCategory()
            return onCloseCreateCategory()
        },
        refetchQueries: [{ query: GET_ALL_CATEGORIES }],
    })
    const handleCreateCategory: SubmitHandler<ICategoryInput> = data => {
        try {
            createCategoryMutation({ variables: { createCategoryInput: data } })
        } catch (error) {}
    }

    // UPDATE CATE
    const {
        isOpen: isOpenUpdateCategory,
        onOpen: onOpenUpdateCategory,
        onClose: onCloseUpdateCategory,
    } = useDisclosure() // Update category
    const updateMethods = useForm<ICategoryInput>()
    const { handleSubmit: handleSubmitUpdateCategory, reset: resetValueUpdateCategory } = updateMethods
    const [updateCategoryMutation, { loading: isLoadingUpdateCate }] = useMutation(UPDATE_CATEGORY, {
        onCompleted({ updateCategory }) {
            const { success, msg } = updateCategory
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
            resetValueUpdateCategory()
            return onCloseUpdateCategory()
        },
        refetchQueries: [{ query: GET_ALL_CATEGORIES }],
    })
    const handleUpdateCategory: SubmitHandler<ICategoryInput> = data => {
        try {
            updateCategoryMutation({ variables: { updateCategoryInput: data } })
        } catch (error) {}
    }

    // UPDATE CATE STATUS
    const {
        isOpen: isOpenUpdateStatusCategory,
        onOpen: onOpenUpdateStatusCategory,
        onClose: onCloseUpdateStatusCategory,
    } = useDisclosure() // Update status category
    const [updateStatusCategoryMutation, { loading: isLoadingUpdateStatusCate }] = useMutation(UPDATE_STATUS_CATEGORY, {
        onCompleted({ updateStatusCategory }) {
            const { success, msg } = updateStatusCategory
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
            return onCloseUpdateStatusCategory()
        },
        refetchQueries: [{ query: GET_ALL_CATEGORIES }],
    })
    const handleUpdateStatusCategory = () => {
        try {
            updateStatusCategoryMutation({ variables: { id: modalValue } })
        } catch (error) {}
    }

    // REMOVE CATE
    const {
        isOpen: isOpenRemoveCategory,
        onOpen: onOpenRemoveCategory,
        onClose: onCloseRemoveCategory,
    } = useDisclosure() // Remove category
    const [removeCategoryMutation, { loading: isLoadingRemoveCate }] = useMutation(REMOVE_CATEGORY, {
        onCompleted({ removeCategory }) {
            const { success, msg } = removeCategory
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
            return onCloseRemoveCategory()
        },
        refetchQueries: [{ query: GET_ALL_CATEGORIES }],
    })
    const handleRemoveCategory = () => {
        try {
            removeCategoryMutation({ variables: { id: modalValue } })
        } catch (error) {}
    }

    return (
        <>
            <Button onClick={onOpenCreateCategory} size="sm" rightIcon={<VscAdd />} colorScheme="green" variant="ghost">
                Add New
            </Button>
            <Box mt="3" p="3" bg={bgColor} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <TableContainer>
                    <Table variant="simple" colorScheme="telegram" color={textColor}>
                        <Thead>
                            <Tr color={titleColor}>
                                <Th>Title</Th>
                                <Th>Description</Th>
                                <Th>Status</Th>
                                <Th>Total Post</Th>
                                <Th>Author</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {categories &&
                                categories.map((item: ICategoryData, index) => (
                                    <Tr key={index}>
                                        <Td>
                                            <Text fontSize="sm" color={textColor}>
                                                {item.title}
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Text fontSize="sm" color={textColor}>
                                                {item.description}
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Tooltip label="Change status" placement="left-start">
                                                <Badge
                                                    as="button"
                                                    onClick={() => {
                                                        onOpenUpdateStatusCategory()
                                                        setModalValue(item._id)
                                                    }}
                                                    bg={item.status === "Active" ? "green.400" : "red.400"}
                                                    color="white"
                                                    fontSize="sm"
                                                    p="3px 10px"
                                                    borderRadius="5px"
                                                >
                                                    {item.status}
                                                </Badge>
                                            </Tooltip>
                                        </Td>
                                        <Td>
                                            <Text fontSize="sm" color={textColor}>
                                                {item.posts.length}
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Text fontSize="sm" color={textColor}>
                                                {item.author.name}
                                            </Text>
                                        </Td>
                                        <Td isNumeric>
                                            <ButtonGroup size="sm" gap="1">
                                                <Button
                                                    onClick={() => {
                                                        onOpenUpdateCategory()
                                                        resetValueUpdateCategory()
                                                        setModalValue({
                                                            _id: item._id,
                                                            title: item.title,
                                                            description: item.description,
                                                        })
                                                    }}
                                                    variant="solid"
                                                    leftIcon={<FiEdit2 />}
                                                    colorScheme="teal"
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        onOpenRemoveCategory()
                                                        setModalValue(item._id)
                                                    }}
                                                    variant="solid"
                                                    leftIcon={<FiDelete />}
                                                    colorScheme="red"
                                                >
                                                    Remove
                                                </Button>
                                            </ButtonGroup>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            {/* modal create category */}
            {isOpenCreateCategory && (
                <ModalComponent
                    type="create"
                    component={
                        <FormProvider {...createMethods}>
                            <CreateFormInput />
                        </FormProvider>
                    }
                    isOpen={isOpenCreateCategory}
                    onOpen={onOpenCreateCategory}
                    onClose={onCloseCreateCategory}
                    handleSubmit={handleSubmitCreateCategory(handleCreateCategory)}
                    isLoading={isLoadingCreateCate}
                    title="Create New Category"
                    btn="Create"
                />
            )}
            {/* modal update category */}
            {isOpenUpdateCategory && (
                <ModalComponent
                    type="update"
                    component={
                        <FormProvider {...updateMethods}>
                            <UpdateFormInput
                                _id={modalValue._id}
                                title={modalValue.title}
                                description={modalValue.description}
                            />
                        </FormProvider>
                    }
                    isOpen={isOpenUpdateCategory}
                    onOpen={onOpenUpdateCategory}
                    onClose={onCloseUpdateCategory}
                    handleSubmit={handleSubmitUpdateCategory(handleUpdateCategory)}
                    isLoading={isLoadingUpdateCate}
                    title="Update Category"
                    btn="Update"
                />
            )}
            {/* modal update status category */}
            {isOpenUpdateStatusCategory && (
                <ModalComponent
                    type="updateStatus"
                    isOpen={isOpenUpdateStatusCategory}
                    onOpen={onOpenUpdateStatusCategory}
                    onClose={onCloseUpdateStatusCategory}
                    handleSubmit={handleUpdateStatusCategory}
                    isLoading={isLoadingUpdateStatusCate}
                    title="Update Status Category"
                    body="Do you want to update status this Category?"
                    btn="Update"
                />
            )}
            {/* modal remove category */}
            {isOpenRemoveCategory && (
                <ModalComponent
                    type="remove"
                    isOpen={isOpenRemoveCategory}
                    onOpen={onOpenRemoveCategory}
                    onClose={onCloseRemoveCategory}
                    handleSubmit={handleRemoveCategory}
                    isLoading={isLoadingRemoveCate}
                    title="Remove Category"
                    body="Do you want to remove this Category?"
                    btn="Remove"
                />
            )}
        </>
    )
}

const CreateFormInput = () => {
    const {
        register: registerCreateCategory,
        formState: { errors: errorsCreateCategory },
    } = useFormContext<ICategoryInput>()
    console.log(errorsCreateCategory)
    return (
        <>
            <FormControl mb="4" isInvalid={!!errorsCreateCategory.title} isRequired>
                <FormLabel>Title</FormLabel>
                <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<FiBookOpen />} />
                    <Input
                        {...registerCreateCategory("title", {
                            required: "* Title is required",
                            minLength: {
                                value: 6,
                                message: "Must be at least 6 characters",
                            },
                        })}
                        placeholder="Title"
                    />
                </InputGroup>
                <FormErrorMessage>{errorsCreateCategory.title && errorsCreateCategory.title.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errorsCreateCategory.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                    {...registerCreateCategory("description", {
                        required: "* Description is required",
                        minLength: {
                            value: 10,
                            message: "Must be at least 10 characters",
                        },
                    })}
                    placeholder="Description"
                />
                <FormErrorMessage>
                    {errorsCreateCategory.description && errorsCreateCategory.description.message}
                </FormErrorMessage>
            </FormControl>
        </>
    )
}

const UpdateFormInput = ({ _id, title, description }: ICategoryInput) => {
    const {
        register: registerUpdateCategory,
        formState: { errors: errorsUpdateCategory },
        control: controlUpdateCategory,
    } = useFormContext<ICategoryInput>()

    return (
        <>
            <FormControl mb="4" isInvalid={!!errorsUpdateCategory.title}>
                <FormLabel>Title</FormLabel>
                <Controller
                    name="title"
                    control={controlUpdateCategory}
                    render={({ field }) => (
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<FiBookOpen />} />
                            <Input
                                {...registerUpdateCategory("title", {
                                    required: "* Title is required",
                                    minLength: {
                                        value: 6,
                                        message: "* Must be at least 6 characters",
                                    },
                                })}
                                placeholder="Title"
                                {...field}
                            />
                        </InputGroup>
                    )}
                    defaultValue={title}
                />

                <FormErrorMessage>{errorsUpdateCategory.title && errorsUpdateCategory.title.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errorsUpdateCategory.description}>
                <FormLabel>Description</FormLabel>
                <div {...registerUpdateCategory("_id", { value: _id })}></div>
                <Controller
                    name="description"
                    control={controlUpdateCategory}
                    render={({ field }) => (
                        <Textarea
                            {...registerUpdateCategory("description", {
                                required: "* Description is required",
                                minLength: {
                                    value: 10,
                                    message: "* Must be at least 10 characters",
                                },
                            })}
                            {...registerUpdateCategory("description")}
                            placeholder="Description"
                            {...field}
                        />
                    )}
                    defaultValue={description}
                />
                <FormErrorMessage>
                    {errorsUpdateCategory.description && errorsUpdateCategory.description.message}
                </FormErrorMessage>
            </FormControl>
        </>
    )
}

export default Category
