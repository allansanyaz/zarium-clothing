import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.scss';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';

import Home from './routes/home/home.component';
import Contact from "./routes/contact/contact.component";
import SignIn from "./routes/sign-in/sign-in.component";

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
                element: <div>I am the shop</div>
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "sign-in",
                element: <SignIn />
            }
        ]
    }
]

// setting up the router
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
