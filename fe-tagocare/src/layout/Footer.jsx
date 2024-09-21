import { FaFacebook, FaInstagram, FaPhone, FaTiktok } from "react-icons/fa";
import logo from "../assets/images/Remove-bg.ai_1724425793461.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { caregiver } = useSelector((state) => state.caregiver);

    const navigate = useNavigate();

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
        <footer className="container mt-[150px] grid grid-cols-3 mb-[50px]">
            <div>
                <div className="flex gap-3 items-center pt-2">
                    <img
                        src={logo}
                        alt="TagoCare Logo"
                        className="w-[50px] h-[50px] object-cover"
                    />
                    <h1 className="font-[800] text-[25px] text-[#ed6436]">
                        TagoCare
                    </h1>
                </div>
                <div className="flex items-center ml-[50px] mt-[7px]  gap-1 text-[#ed6436] font-bold mb-4">
                    <FaPhone />
                    +2342 5446 67
                </div>
                <div className="flex items-center ml-[50px] mt-[7px] gap-[20px]">
                    <a href="" className=" bg-[#ed6436] rounded-full p-1">
                        {" "}
                        <FaFacebook className="text-white text-[20px]" />
                    </a>
                    <a href="" className=" bg-[#ed6436] rounded-full p-1">
                        <FaInstagram className="text-white text-[20px]" />
                    </a>
                    <a href="" className=" bg-[#ed6436] rounded-full p-1">
                        <FaTiktok className="text-white text-[20px]" />
                    </a>
                </div>
            </div>
            <div>
                <span className="text-[#ed6436] font-pacifico font-bold text-[24px]">
                    Information
                </span>
                <ul className="mt-4 text-[17px] cursor-pointer font-semibold">
                    <li className="mb-2">About Us</li>
                    <Link to={"/contact"}>
                        <li className="mb-2">Contact</li>
                    </Link>
                    <li className="mb-2">Shipping Policy</li>
                    <li className="mb-2">FAQ</li>
                    <li onClick={handleSellerChannelClick} className="mb-2">
                        Caregiver Channel
                    </li>
                </ul>
            </div>
            <div>
                <span className="text-[#ed6436] font-pacifico font-bold text-[24px]">
                    Newsletter
                </span>
                <p className="mt-4 text-[17px] cursor-pointer font-semibold">
                    Subscribe to the Petmark mailing list to receive updates on
                    new arrivals, special offers and other discount information.
                </p>
                <form className="mt-5">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Your Email"
                        className="border outline-none w-[98%] rounded-full px-4 text-[#ed6436] border-[#e9e9e9] py-1 text-center text-[14px] font-semibold"
                    />
                    <button className="flex mt-2 justify-center w-full text-[13px] text-white cursor-pointer items-center gap-2 font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436]">
                        SUBSCRIBE
                    </button>
                </form>
            </div>
        </footer>
    );
};

export default Footer;
