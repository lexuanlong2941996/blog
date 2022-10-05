

export interface IModal {
    type: string
    component?: React.ReactNode
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    handleSubmit: () => void
    isLoading: boolean
    error?: any
    title?: string
    body?: string
    btn?: string
}