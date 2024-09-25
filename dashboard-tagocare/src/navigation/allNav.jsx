import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlinePayment, MdPets } from "react-icons/md";
import {
    FaUserAltSlash,
    FaRocketchat,
    FaProductHunt,
    FaRegMoneyBillAlt,
} from "react-icons/fa";
import { FaCodePullRequest, FaHornbill } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { RiServiceFill } from "react-icons/ri";

export const allNav = [
    {
        id: 1,
        title: "Dashboard",
        icon: <AiOutlineDashboard />,
        role: "admin",
        path: "/admin/dashboard",
    },
    {
        id: 17,
        title: "Orders",
        icon: <FaRocketchat />,
        role: "admin",
        path: "/admin/orders",
    },
    {
        id: 2,
        title: "Category",
        icon: <BiCategoryAlt />,
        role: "admin",
        path: "/admin/category",
    },

    {
        id: 4,
        title: "Payment Request",
        icon: <MdOutlinePayment />,
        role: "admin",
        path: "/admin/payment-request",
    },
    {
        id: 3,
        title: "Caregivers",
        icon: <MdPets />,
        role: "admin",
        path: "/admin/caregivers",
    },
    {
        id: 5,
        title: "DeActive Caregiver",
        icon: <FaUserAltSlash />,
        role: "admin",
        path: "/admin/deactive-caregiver",
    },
    {
        id: 6,
        title: "Caregiver Request",
        icon: <FaCodePullRequest />,
        role: "admin",
        path: "/admin/caregiver-request",
    },
    {
        id: 7,
        title: "Live Chat",
        icon: <FaRocketchat />,
        role: "admin",
        path: "/admin/live-chat",
    },
    {
        id: 9,
        title: "Dashboard",
        icon: <AiOutlineDashboard />,
        role: "caregiver",
        path: "/caregiver/dashboard",
    },
    {
        id: 17,
        title: "Profile",
        icon: <ImProfile />,
        role: "caregiver",
        path: "/caregiver/profile",
    },
    {
        id: 10,
        title: "Products",
        icon: <FaProductHunt />,
        role: "caregiver",
        path: "/caregiver/products",
    },
    {
        id: 11,
        title: "Services",
        icon: <RiServiceFill />,
        role: "caregiver",
        path: "/caregiver/services",
    },
    {
        id: 12,
        title: "Pet Service Orders",
        icon: <FaRegMoneyBillAlt />,
        role: "caregiver",
        path: "/caregiver/pet-service-orders",
    },
    {
        id: 13,
        title: "Pet Product Orders",
        icon: <FaRegMoneyBillAlt />,
        role: "caregiver",
        path: "/caregiver/pet-product-orders",
    },
    {
        id: 14,
        title: "Cash Management",
        icon: <FaHornbill />,
        role: "caregiver",
        path: "/caregiver/cash-management",
    },
    {
        id: 15,
        title: "Chat with Customer",
        icon: <FaRocketchat />,
        role: "caregiver",
        path: "/caregiver/chat-with-customer",
    },
    {
        id: 16,
        title: "Chat Support",
        icon: <FaRocketchat />,
        role: "caregiver",
        path: "/caregiver/chat-support",
    },
];
