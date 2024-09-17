import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

const MainLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="bg-admin w-full min-h-screen bg-[#bcb8b1] font-roboto">
            <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
