import { Navigate } from "react-router-dom";

// pages
import Users from './pages/admin/users/Users';
import SignIn from './pages/auth/SignIn';
import SignUp from "./pages/auth/SignUp";

export const publicRoutes = [
  {
    path: "/",
    element: <SignIn />
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
    element: <Users />
  },
  {
    path: "/users",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/submissions",
    element: <h6>Submissions</h6>,
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
