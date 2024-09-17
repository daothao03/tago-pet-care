import { FaList, FaUser } from "react-icons/fa";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Header = ({ showSidebar, setShowSidebar }) => {
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
            <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-primary px-5 transition-all">
                <div
                    className="w-[35px]  flex lg:hidden h-[35px] rounded-sm shadow-lg bg-[#e09f3e] hover:shadow-indigo-500/50 justify-center items-center cursor-pointer"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    <span>
                        <FaList />
                    </span>
                </div>

                <div className="hidden md:block ">
                    <input
                        className="px-5 py-2 outline-none border bg-transparent border-[#fff] placeholder:text-white rounded-md text-white  overflow-hidden"
                        type="text"
                        name="search"
                        placeholder="Search..."
                        id=""
                    />
                </div>

                <div className="flex justify-center items-center gap-8 relative">
                    <div className="flex justify-center items-center">
                        <div className="flex justify-center items-center gap-3">
                            <div className="flex flex-col text-white flex-col-text-end">
                                <h2 className="text-md font-bold">
                                    {userInfo?.name}
                                </h2>
                                {userInfo?.role?.map((r, index) =>
                                    r === "caregiver" || r === "admin" ? (
                                        <span
                                            key={index + 1}
                                            className="text-end w-full font-semibold"
                                        >
                                            {r}
                                        </span>
                                    ) : (
                                        ""
                                    )
                                )}
                            </div>
                            {userInfo?.role === "admin" ? (
                                <span className="w-[45px] h-[45px] border rounded-full  flex justify-center items-center">
                                    <FaUser className="text-[20px] text-white" />
                                </span>
                            ) : (
                                <img
                                    className="w-[45px] h-[45px] rounded-full overflow-hidden"
                                    src={userInfo?.image}
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    showSidebar: PropTypes.bool.isRequired,
    setShowSidebar: PropTypes.func.isRequired,
};

export default Header;
