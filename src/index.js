import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.scss';
import App from './containers/App';
// import the user context component
import { UserProvider } from './contexts/user.context';
import { ProductProvider } from "./contexts/product.context";
import { CartProvider } from "./contexts/cart.context";
import reportWebVitals from './reportWebVitals';

import Home from './routes/home/home.component';
import Shop from "./routes/shop/shop.component";
import Contact from "./routes/contact/contact.component";
import Checkout from "./routes/checkout/checkout.component";
import AuthenticationComponent from "./routes/authentication/authentication.component";

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
                path: "shop",
                element: <Shop />
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
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserProvider>
            <ProductProvider>
                <CartProvider>
                    <RouterProvider router={router} />
                </CartProvider>
            </ProductProvider>
        </UserProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
