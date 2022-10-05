import { Routes, Route } from "react-router-dom"
import { routes } from "../../../utils/routes"

const Main: React.FC = () => (
    <Routes>
        {routes.map((item, index: number) => (
            <Route key={index} path={item.path} element={<item.element />} />
        ))}
    </Routes>
)

export default Main
