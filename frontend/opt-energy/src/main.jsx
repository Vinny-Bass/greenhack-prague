import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import SavingsChart from "./routes/savingsChart";
import Companies from "./routes/companies";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/chart",
        element: <SavingsChart />
    },
    {
        path: "/companies",
        element: <Companies />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
