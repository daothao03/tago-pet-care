import { useEffect, useState } from "react";
import logo from "../assets/images/Remove-bg.ai_1724425793461.png";
import { FaSearch } from "react-icons/fa";
import Button from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_caregiver_info } from "../store/reducer/caregiverReducer";

const Header2 = () => {
    const dispatch = useDispatch();
    const [openInputSearch, setOpenInputSearch] = useState(false);

    const { userInfo } = useSelector((state) => state.auth);
    const { caregiver } = useSelector((state) => state.caregiver);

    const [isScrolled, setIsScrolled] = useState(false);

    const { pathname } = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (userInfo) {
            dispatch(get_caregiver_info(userInfo.id));
        }
    }, [userInfo.id]);

    const handleSellerChannelClick = () => {
        if (userInfo && caregiver === null) {
            navigate("/register-caregiver");
        } else if (userInfo && caregiver !== null) {
            window.location.href = "http://localhost:5174/login";
        } else {
            navigate("/login");
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[70px] transition-shadow duration-300 ${
                isScrolled
                    ? "shadow-lg bg-opacity-90 px-[100px] bg-white text-black"
                    : "shadow-none container"
            }`}
        >
            <Link to={"/"} className=" flex gap-3 items-center pt-2">
                <img
                    src={logo}
                    alt=""
                    className="w-[50px] h[50px] object-cover"
                />
                <h1 className="font-[800] text-[25px] text-[#ed6436]">
                    TagoCare
                </h1>
            </Link>

            <div className="flex items-center gap-12">
                <ul className="flex gap-10 font-bold text-[15px] cursor-pointer z-20">
                    <Link to={"/"}>
                        <li
                            className={`${
                                pathname === "/"
                                    ? "border-b-[4px] pb-2 border-[#ed6436]"
                                    : ""
                            }`}
                        >
                            Home
                        </li>
                    </Link>
                    <Link to={"/community"}>
                        <li
                            className={`${
                                pathname === "/community"
                                    ? "border-b-[4px] pb-2 border-[#ed6436]"
                                    : ""
                            }`}
                        >
                            Community
                        </li>
                    </Link>
                    <Link to={"/services"}>
                        <li
                            className={`${
                                pathname === "/services"
                                    ? "border-b-[4px] pb-2 border-[#ed6436]"
                                    : ""
                            }`}
                        >
                            Service
                        </li>
                    </Link>
                    <Link to="/products">
                        <li
                            className={`${
                                pathname === "/products"
                                    ? "border-b-[4px] pb-2 border-[#ed6436]"
                                    : ""
                            }`}
                        >
                            Shop
                        </li>
                    </Link>

                    <li onClick={handleSellerChannelClick} className="mb-2">
                        Caregiver Channel
                    </li>
                </ul>

                <div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        {openInputSearch && (
                            <input
                                type="text"
                                placeholder="Search..."
                                className={`duration-500 border-b-2 px-3 bg-transparent font-bold placeholder:text-black  py-1 text-[#000] outline-none w-[300px] `}
                            />
                        )}
                        <button
                            onClick={() => {
                                setOpenInputSearch(!openInputSearch);
                            }}
                        >
                            <FaSearch />
                        </button>
                    </form>
                </div>

                {userInfo ? (
                    <Link to={"/dashboard"}>
                        <Button content={userInfo.name} />
                    </Link>
                ) : (
                    <Link to={"/login"}>
                        <Button content="Sign In" />
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header2;
