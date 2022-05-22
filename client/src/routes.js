import { Navigate } from "react-router-dom";

// pages
import Users from './pages/admin/users/Users';

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
  {
    path: "/roles",
    element: <h6>User roles</h6>,
  },
];
