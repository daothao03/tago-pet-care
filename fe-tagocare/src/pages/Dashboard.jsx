import { useState } from "react";
import { FaList } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import Header2 from "../layout/Header2";
import Footer from "../layout/Footer";
import { ImProfile } from "react-icons/im";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { user_reset } from "../store/reducer/authReducer";

const Dashboard = () => {
    const dispatch = useDispatch();
    const [filterShow, setFilterShow] = useState(false);

    const navigate = useNavigate();

    const logout = async () => {
        try {
            const { data } = await api.get("/user/logout");
            localStorage.removeItem("customerToken");
            dispatch(user_reset());
            // dispatch(reset_count());
            navigate("/");
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div>
            <Header2 />
            <div className="pt-[100px] px-[120px] text-[#ed6436] ">
                <div className="w-[90%] mx-auto md-lg:block hidden">
                    <div>
                        <button
                            onClick={() => setFilterShow(!filterShow)}
                            className="text-center py-3 px-3 bg-green-500 "
                        >
                            <FaList />
                        </button>
                    </div>
                </div>

                <div>
                    <div className="py-5 flex md-lg:w-[90%] mx-auto relative">
                        <div
                            className={`rounded-md  md-lg:absolute ${
                                filterShow ? "-left-4" : "-left-[360px]"
                            } w-[270px] ml-4 bg-[#fffcf2]`}
                        >
                            <ul className="py-2 font-bold text-[18px] px-4 text-[#ed6436]">
                                <li className="flex justify-start items-center gap-2 py-2">
                                    <span className="text-xl">
                                        <IoIosHome className="text-[#ed6436]" />
                                    </span>
                                    <Link to="/dashboard" className="block">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="flex justify-start items-center gap-2 py-2">
                                    <span className="text-xl">
                                        <FaBorderAll className="text-[#ed6436]" />
                                    </span>
                                    <Link
                                        to="/dashboard/my-orders"
                                        className="block"
                                    >
                                        My Orders
                                    </Link>
                                </li>
                                <li className="flex justify-start items-center gap-2 py-2">
                                    <span className="text-xl">
                                        <FaHeart className="text-[#ed6436]" />
                                    </span>
                                    <Link
                                        to="/dashboard/my-wishlist"
                                        className="block"
                                    >
                                        Wishlist
                                    </Link>
                                </li>
                                <li className="flex justify-start items-center gap-2 py-2">
                                    <span className="text-xl">
                                        <IoChatbubbleEllipsesSharp className="text-[#ed6436]" />
                                    </span>
                                    <Link
                                        to="/dashboard/chat"
                                        className="block"
                                    >
                                        Chat
                                    </Link>
                                </li>
                                <li className="flex justify-start items-center gap-2 py-2">
                                    <span className="text-xl">
                                        <ImProfile className="text-[#ed6436]" />
                                    </span>
                                    <Link
                                        to="/dashboard/change-password"
                                        className="block"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li
                                    onClick={logout}
                                    className="flex cursor-pointer justify-start items-center gap-2 py-2"
                                >
                                    <span className="text-xl">
                                        <IoMdLogOut className="text-[#ed6436]" />
                                    </span>
                                    <div className="block">Logout </div>
                                </li>
                            </ul>
                        </div>

                        <div className="w-[calc(100%-270px)] md-lg:w-full">
                            <div className="mx-4 md-lg:mx-0">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
export default Dashboard;
