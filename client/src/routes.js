import { Navigate } from "react-router-dom";

// pages
import Users from "./pages/admin/users/Users";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Submissions from "./pages/admin/submissions/Submissions";
import MarkingSchema from "./pages/admin/markingSchemas/MarkingSchema";
import Dashboard from "./pages/student/dashboard/Dashboard";
import Chat from "./pages/chat/Chat";
import PanelMembers from './pages/admin/panelMembers/PanelMembers';
import Uploads from './pages/admin/uploads/Uploads';
import StudentUploads from './pages/student/submissions/Uploads';

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
    element: <PanelMembers />,
  },
  {
    path: "/schemas",
    element: <MarkingSchema />,
  },
  {
    path: "/uploads",
    element: <Uploads />,
  },
];

export const studentRoutes = [
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/sign-up',
    element: <Dashboard />
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/group-chat/:id",
    element: <Chat />,
  },
  {
    path: "/submissions",
    element: <StudentUploads />,
  },
];
