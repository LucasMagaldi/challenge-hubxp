import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Categories } from "../pages/categories";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/categories',
                element: <Categories />
            }
        ]
    }
])