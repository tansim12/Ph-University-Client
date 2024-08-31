import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { adminRoutes } from "./route.admin";
import { facultyRoutes } from "./route.faculty";
import { studentRoutes } from "./route.student";
import PrivateRoute from "../Components/Layout/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },

  //   admin routes
  {
    path: "/admin",
    element: (
      <PrivateRoute role="admin">
        <App />
      </PrivateRoute>
    ),
    children: adminRoutes,
  },
  //   student routes
  {
    path: "/student",
    element: (
      <PrivateRoute role="student">
        <App />
      </PrivateRoute>
    ),
    children: studentRoutes,
  },
  {
    path: "/faculty",
    element: (
      <PrivateRoute role="faculty">
        <App />
      </PrivateRoute>
    ),
    children: facultyRoutes,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
