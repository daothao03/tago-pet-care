import { IoMdLogOut } from "react-icons/io";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNav } from "../navigation";
import { useDispatch, useSelector } from "react-redux";
import { log_out } from "../store/reducer/authReducer";
import ModalConfirm from "../views/components/ModalConfirm";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [allNav, setAllNav] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { role } = useSelector((state) => state.auth);

    useEffect(() => {
        const navs = getNav(role);
        setAllNav(navs);
    }, []);

    const handleLogout = () => {
        dispatch(log_out({ role }));
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div
                className={`flex duration-200 w-screen  bg-[#354f52] top-0 left-0 z-10 ${
                    !showSidebar ? "invisible" : "visible h-screen"
                }`}
                onClick={() => setShowSidebar(false)}
            ></div>

            <div
                className={`w-[260px] fixed bg-primary z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
                    showSidebar ? "left-0" : "-left-[260px] lg:left-0"
                }`}
            >
                <div className="h-[70px] flex justify-center items-center">
                    <Link to={"/"} className="w-[180px] h-[50px]">
                        <h1 className="flex justify-center  items-center text-[3rem] font-bold text-white">
                            Tago.
                        </h1>
                    </Link>
                </div>

                <div className="px-[16px]">
                    <ul className="text-white pt-[16px]">
                        {allNav.map((nav) => (
                            <li key={nav.id}>
                                <Link
                                    to={nav.path}
                                    className={`flex items-center justify-start gap-[12px] hover:pl-4 transition-all mb-1  w-full cursor-pointer px-[20px] py-[9px] rounded-999 ${
                                        pathname === nav.path
                                            ? "bg-[#dad7cd] font-bold shadow-indigo-500/50 duration-500 text-[#000]"
                                            : "text-[#fff] font-semibold duration-200"
                                    }`}
                                >
                                    <span>{nav.icon}</span>
                                    <span>{nav.title}</span>
                                </Link>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex text-[#fff] font-semibold duration-200 items-center justify-start gap-[12px] hover:pl-4 transition-all mb-1  w-full cursor-pointer px-[20px] py-[9px] rounded-999"
                            >
                                <span>
                                    <IoMdLogOut />
                                </span>
                                <span>Log Out</span>
                            </button>
                            {isModalOpen && (
                                <ModalConfirm
                                    message="Are you sure you want to log out?"
                                    onConfirm={handleLogout}
                                    onCancel={handleCancel}
                                />
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
Sidebar.propTypes = {
    showSidebar: PropTypes.bool.isRequired,
    setShowSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
