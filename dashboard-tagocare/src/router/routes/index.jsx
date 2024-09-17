import { lazy } from "react";
import { privateRoutes } from "./privateRoutes";
import ProtectRoute from "./ProtectRoute";

const MainLayout = lazy(() => import("./../../layout/MainLayout"));

export const getRoutes = () => {
    privateRoutes.map((r) => {
        r.element = <ProtectRoute route={r}> {r.element} </ProtectRoute>;
    });

    return {
        path: "/",
        element: <MainLayout />,
        children: privateRoutes,
    };
};
