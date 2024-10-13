import { lazy } from "react";
import AddService from "../../views/CareGivers/AddService";
import OrdersProductDetail from "../../views/CareGivers/OrdersProductDetail";
import OrderServiceDetail from "../../views/CareGivers/OrderServiceDetail";

const EditPassword = lazy(() => import("../../views/CareGivers/EditPassword"));
const ChatCustomer = lazy(() => import("../../views/CareGivers/ChatCustomer"));
const ChatSupport = lazy(() => import("../../views/CareGivers/ChatSupport"));
const Pending = lazy(() => import("../../views/Pending"));
const Deactive = lazy(() => import("../../views/Deactive"));
const EditProfile = lazy(() => import("../../views/CareGivers/EditProfile"));
const CaregiverDashboard = lazy(() =>
    import("../../views/CareGivers/CaregiverDashboard")
);
const Profile = lazy(() => import("../../views/CareGivers/Profile"));
const Products = lazy(() => import("./../../views/CareGivers/Products"));
const Services = lazy(() => import("../../views/CareGivers/Services"));
const CashManagement = lazy(() =>
    import("../../views/CareGivers/CashManagement")
);
const PetServiceOrders = lazy(() =>
    import("../../views/CareGivers/PetServiceOrders")
);
const PetProductOrders = lazy(() =>
    import("../../views/CareGivers/PetProductOrders")
);
const AddProduct = lazy(() => import("../../views/CareGivers/AddProduct"));

export const caregiverRoutes = [
    {
        path: "/caregiver/dashboard",
        element: <CaregiverDashboard />,
        role: "caregiver",
        status: "active",
    },
    {
        path: "/caregiver/profile",
        element: <Profile />,
        role: "caregiver",
        visibility: ["active", "inactive", "pending"],
    },
    {
        path: "/caregiver/products",
        element: <Products />,
        role: "caregiver",
        status: "active",
    },
    {
        path: "/caregiver/services",
        element: <Services />,
        role: "caregiver",
        status: "active",
    },
    {
        path: "/caregiver/pet-service-orders",
        element: <PetServiceOrders />,
        role: "caregiver",
        visibility: ["active", "inactive"],
    },
    {
        path: "/caregiver/order-service-detail/:orderServiceId",
        element: <OrderServiceDetail />,
        role: "caregiver",
        status: "active",
        visibility: ["active", "inactive"],
    },
    {
        path: "/caregiver/pet-product-orders",
        element: <PetProductOrders />,
        role: "caregiver",
        status: "active",
        visibility: ["active", "inactive"],
    },
    {
        path: "/caregiver/order-detail/:orderId",
        element: <OrdersProductDetail />,
        role: "caregiver",
        status: "active",
        visibility: ["active", "inactive"],
    },
    {
        path: "/caregiver/cash-management",
        element: <CashManagement />,
        role: "caregiver",
        status: "active",
    },
    {
        path: "/caregiver/chat-with-customer",
        element: <ChatCustomer />,
        role: "caregiver",
        status: "active",
    },
    {
        path: "/caregiver/chat-support",
        element: <ChatSupport />,
        role: "caregiver",
        visibility: ["active", "inactive", "pending"],
    },
    {
        path: "/caregiver/account-pending",
        element: <Pending />,
        ability: "caregiver",
    },
    {
        path: "/caregiver/account-deactive",
        element: <Deactive />,
        ability: "caregiver",
    },
    {
        path: "/edit-profile",
        element: <EditProfile />,
        ability: "caregiver",
    },
    {
        path: "/edit-password",
        element: <EditPassword />,
        ability: "caregiver",
    },
    {
        path: "/add-product",
        element: <AddProduct />,
        ability: "caregiver",
    },
    {
        path: "/update-product/:productId",
        element: <AddProduct />,
        ability: "caregiver",
    },
    {
        path: "/add-service",
        element: <AddService />,
        ability: "caregiver",
    },
    {
        path: "/update-service/:serviceId",
        element: <AddService />,
        ability: "caregiver",
    },
];
