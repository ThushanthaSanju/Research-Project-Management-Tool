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
import Templates from './pages/student/templates/Templates';
import Requests from './pages/staff/requests/Requests';
import Documents from './pages/staff/documents/Documents';
import Topics from './pages/staff/topic/Topics';

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
  {
    path: "/templates",
    element: <Templates />,
  },
];

export const staffRoutes = [
  {
    path: '/',
    element: <Requests />
  },
  {
    path: '/documents',
    element: <Documents />
  },
  {
    path: '/topics',
    element: <Topics />
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace />,
  },
]
