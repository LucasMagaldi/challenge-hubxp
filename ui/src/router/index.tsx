import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Categories } from "../pages/categories";
import { Products } from "../pages/products";
import { Orders } from "../pages/orders";
import { Home } from "../pages/home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/categories',
                element: <Categories />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/orders',
                element: <Orders />
            }
        ]
    }
])