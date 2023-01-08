import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.scss';
import App from './containers/App';
// import the redux modules here
import { store } from './store/store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import Home from './routes/home/home.component';
import Contact from "./routes/contact/contact.component";
import Checkout from "./routes/checkout/checkout.component";
import AuthenticationComponent from "./routes/authentication/authentication.component";

import CategoriesPreview from "./routes/categories-preview/categories-preview.component";
import Category from "./routes/category/category.component";

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
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
