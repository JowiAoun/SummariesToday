// --- Imports
// Modules
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Components
import App from "./App.tsx";
import Topbar from "./Topbar.tsx";
// Styling
import "./index.css";


// --- Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile",
    element: <p>Profile page!</p>,
  },
  {
    path: "/books/:bookId",
    element: <p>Book page!</p>,
  },
  {
    path: "/test",
    element: <Topbar />,
  },
]);


// Create React DOM
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
