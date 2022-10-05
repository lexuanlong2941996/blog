import { lazy, Suspense } from "react"
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthProvider"

const SignUp = lazy(() => import("./components/layout/auth/SignUp"))
const SignIn = lazy(() => import("./components/layout/auth/SignIn"))
const Layout = lazy(() => import("./components/layout/dashboard/Layout"))
const ProtectedRoute = lazy(() => import("./modules/ProtectedRoute"))
const NotFound = lazy(() => import("./components/layout/dashboard/NotFound"))
const Loading = lazy(() => import("./modules/Loading"))

// import SignIn from "./components/layout/auth/SignIn"
// import Layout from "./components/layout/dashboard/Layout"
// import Main from "./components/layout/dashboard/Main"
// import ProtectedRoute from "./modules/ProtectedRoute"
// import NotFound from "./components/layout/dashboard/NotFound"
// import Loading from "./modules/Loading"

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript />
            <AuthContextProvider>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/auth/signup" element={<SignUp />} />
                        <Route path="/auth/signin" element={<SignIn />} />
                        <Route
                            path="/*"
                            element={
                                <ProtectedRoute>
                                    <Layout />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </AuthContextProvider>
        </ChakraProvider>
    )
}

export default App
