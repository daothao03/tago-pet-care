import { lazy } from "react";
import CaregiverDetails from "../../views/admin/CaregiverDetails";
import Orders from "../../views/admin/Orders";
import OrderDetail from "../../views/admin/OrderDetail";

const LiveChat = lazy(() => import("../../views/admin/LiveChat"));
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Category = lazy(() => import("./../../views/admin/Category"));
const Caregiver = lazy(() => import("./../../views/admin/Caregiver"));
const PaymentRequest = lazy(() => import("./../../views/admin/PaymentRequest"));
const CaregiverRequest = lazy(() =>
    import("./../../views/admin/CaregiverRequest")
);
const DeActiveCaregiver = lazy(() =>
    import("./../../views/admin/DeActiveCaregiver")
);

export const adminRoutes = [
    {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
        role: "admin",
    },
    {
        path: "/admin/category",
        element: <Category />,
        role: "admin",
    },
    {
        path: "/admin/category/:cateId",
        element: <Category />,
        role: "admin",
    },
    {
        path: "/admin/caregivers",
        element: <Caregiver />,
        role: "admin",
    },
    {
        path: "/admin/payment-request",
        element: <PaymentRequest />,
        role: "admin",
    },
    {
        path: "/admin/deactive-caregiver",
        element: <DeActiveCaregiver />,
        role: "admin",
    },
    {
        path: "/admin/caregiver-request",
        element: <CaregiverRequest />,
        role: "admin",
    },
    {
        path: "/admin/live-chat",
        element: <LiveChat />,
        role: "admin",
    },
    {
        path: "/admin/caregiver/caregiver-details/:careId",
        element: <CaregiverDetails />,
        role: "admin",
    },
    {
        path: "/admin/orders",
        element: <Orders />,
        role: "admin",
    },
    {
        path: "/admin/order/order-detail/:orderId",
        element: <OrderDetail />,
        role: "admin",
    },
];
