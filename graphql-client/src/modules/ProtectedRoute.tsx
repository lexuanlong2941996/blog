import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../context/AuthProvider"

const ProtectedRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
    const { authState } = useAuth()
    const location = useLocation()
    if (!authState.isAuth) return <Navigate to={"/auth/signin"} state={{ previousPage: location.pathname }} replace={true} />
    return children
}

export default ProtectedRoute
