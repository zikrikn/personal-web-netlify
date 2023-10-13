import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Schedule from "./components/schedule.jsx";

const router = createBrowserRouter([
{
    path: "/",
    element: <App />,
},
{
    path: "schedule",
    element: <Schedule />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );