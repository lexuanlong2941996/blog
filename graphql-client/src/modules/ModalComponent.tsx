import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormLabel,
    useColorModeValue,
    Button,
} from "@chakra-ui/react"
import { IModal } from "../types/component.type"

const ModalComponent: React.FC<IModal> = ({
    type,
    component,
    isOpen,
    onClose,
    handleSubmit,
    isLoading,
    title,
    body,
    btn,
}) => {
    const titleColor = useColorModeValue("yellow.600", "yellow.400")
    return (
        <Modal size="3xl" closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color={titleColor}>{title}</ModalHeader>
                <ModalCloseButton />

                <ModalBody pb="6">
                    {type === "create" || type === "update" ? (
                        component
                    ) : (
                        <FormLabel>{body}</FormLabel>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        isLoading={isLoading}
                        colorScheme="green"
                        mr="3"
                    >
                        {btn}
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalComponent
