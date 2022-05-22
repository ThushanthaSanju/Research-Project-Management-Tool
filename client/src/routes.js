import { Navigate } from "react-router-dom";

// pages
import Users from "./pages/admin/users/Users";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Submissions from "./pages/admin/submissions/Submissions";

export const publicRoutes = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/sign-in",
    element: <Navigate to="/" replace />,
  },
];

export const adminRoutes = [
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "/users",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/submissions",
    element: <Submissions />,
  },
  {
    path: "/panels",
    element: <h6>Panel Members</h6>,
  },
  {
    path: "/schemas",
    element: <h6>Marking Schemas</h6>,
  },
  {
    path: "/uploads",
    element: <h6>Uploads</h6>,
  },
];
