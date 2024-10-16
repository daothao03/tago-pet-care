import { lazy } from "react";

const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const Home = lazy(() => import("../../views/Home"));
const CareGiverLogin = lazy(() => import("../../views/auth/CareGiverLogin"));
const Register = lazy(() => import("../../views/auth/Register"));
import UnAuthorized from "./../../views/UnAuthorized";
import Success from "../../views/Success";

const publicRoutes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
    {
        path: "/login",
        element: <CareGiverLogin />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/unauthorized",
        element: <UnAuthorized />,
    },
    {
        path: "/success?",
        element: <Success />,
    },
];

export default publicRoutes;
