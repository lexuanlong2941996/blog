export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_AUTH":
            return {
                ...state,
                isLoading: action.isLoading,
                isAuth: action.isAuth,
                user: action.user,
            }
        default:
            return state
    }
}
