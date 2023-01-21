import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from '../containers/App';
import Home from './home/home.component';
import Contact from "./contact/contact.component";
import Checkout from "./checkout/checkout.component";
import AuthenticationComponent from "./authentication/authentication.component";

import CategoriesPreview from "./categories-preview/categories-preview.component";
import Category from "./category/category.component";

// define the routes
const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "categories",
                element: <CategoriesPreview />,
            },
            {
                path: "categories/:category",
                element: <Category />,
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "checkout",
                element: <Checkout />
            },
            {
                path: "sign-in",
                element: <AuthenticationComponent />
            }
        ]
    }
]

// setting up the router
export const router = createBrowserRouter(routes);
export { RouterProvider };