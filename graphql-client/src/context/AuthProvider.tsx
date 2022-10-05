import { useApolloClient } from "@apollo/client"
import { createContext, useEffect, useContext, useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { checkToken } from "../utils/checkToken"
import { useToast } from "../utils/toast"

type TUserInfo = {
    userId: string | undefined
    email: string | undefined
    name: string | undefined
    role: string | undefined
}
type TAuthState = {
    isAuth: boolean
    user: TUserInfo | null
}

type TContext = {
    signIn: (token: string) => void
    signOut: (event: string) => void
    authState: TAuthState
}

export const AuthContext = createContext<TContext | null>(null)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<TAuthState>({
        isAuth: false,
        user: null,
    })
    const location = useLocation()
    const navigate = useNavigate()
    const toast = useToast()

    const client = useApolloClient()

    // check Auth then change state TRUE
    const checkAuth = () => {
        const accessToken = localStorage.getItem("accessToken") as string
        const { userInfo, isExp } = checkToken(accessToken)
        if (!isExp) {
            setAuthState({
                isAuth: true,
                user: {
                    userId: userInfo?.userId,
                    email: userInfo?.email,
                    name: userInfo?.name,
                    role: userInfo?.role,
                },
            })
        } else {
            localStorage.removeItem("accessToken")
            setAuthState({
                isAuth: false,
                user: null,
            })
        }
    }
    useEffect(() => checkAuth, [])

    // sign in
    const signIn = (token: string) => {
        try {
            localStorage.setItem("accessToken", token)
            checkAuth()
            const from = location.state as { previousPage: string }
            navigate(from ? from.previousPage : "/", { replace: true })
        } catch (error) {}
    }

    // sign out
    const signOut = (event: string) => {
        try {
            localStorage.removeItem("accessToken") // revoke accessToken
            client.clearStore().then(() => client.resetStore()) // Clear APollo store
            switch (event) {
                case "fn":
                    toast({
                        title: "Logout successfully!",
                        description: "See you later...",
                        status: "info",
                    })
                    break
                case "timeout":
                    toast({
                        title: "Session is time out!",
                        description: "Please login again to continue...",
                        status: "error",
                    })
                    break
                case "emptytoken":
                    toast({
                        title: "You have manually logged out from a session!",
                        description: "Please login again to continue...",
                        status: "error",
                    })
                    break
            }
            return setAuthState({
                isAuth: false,
                user: null,
            })
        } catch (error) {}
    }

    // handle auto logout - track event bind
    const startTimerInterval: React.MutableRefObject<any> = useRef(null)
    useEffect(() => {
        const autoLogout = () => {
            clearTimeout(startTimerInterval.current)
            const accessToken = localStorage.getItem("accessToken") as string
            const { isExp } = checkToken(accessToken)
            startTimerInterval.current = setTimeout(() => {
                if (!accessToken) return signOut("emptytoken") // check token is removed
                if (isExp) return signOut("timeout") // check session JWT time out
            }, 100)
        }
        if (authState.isAuth) window.addEventListener("mouseover", autoLogout)
        return () => window.removeEventListener("mouseover", autoLogout)
    }, [authState.isAuth])

    const authContextValue = { signIn, signOut, authState }

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}

const useAuth = () => {
    return useContext(AuthContext) as TContext
}

export default useAuth
