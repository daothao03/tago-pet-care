import { PropagateLoader } from "react-spinners";
import { overrideStyle, provinces } from "../utils/utils";
import Footer from "../layout/Footer";
import HeaderPageCommon from "../components/HeaderPageCommon";
import { useEffect, useState } from "react";
import { IoMdCloseCircle, IoMdImages } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
    caregiver_request,
    messageClear,
} from "../store/reducer/caregiverReducer";
import toast from "react-hot-toast";
import { BiSolidError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const RegisterCaregiver = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const { loader, successMessage, errorMessage, errors } = useSelector(
        (state) => state.caregiver
    );

    const navigate = useNavigate();

    const [state, setState] = useState({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        phone: "",
        businessForm: "",
        address: "",
        serviceArea: "",
        reasons: "",
        experience: "",
    });

    const [images, setImages] = useState([]);
    const [imageShow, setImageShow] = useState([]);
    const [selectedServiceAreas, setSelectedServiceAreas] = useState([]);

    const handleDropdownChange = (e) => {
        const selectedArea = e.target.value;
        if (selectedArea && !selectedServiceAreas.includes(selectedArea)) {
            setSelectedServiceAreas([...selectedServiceAreas, selectedArea]);
        }
        setState({
            ...state,
            serviceArea: selectedArea,
        });
    };

    const removeServiceArea = (areaToRemove) => {
        setSelectedServiceAreas(
            selectedServiceAreas.filter((area) => area !== areaToRemove)
        );
    };

    const handleState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const imageHandle = (e) => {
        const files = e.target.files;
        const length = files.length;
        if (length > 0) {
            setImages([...images, ...files]);
            let imageUrl = [];
            for (let i = 0; i < length; i++) {
                imageUrl.push({ url: URL.createObjectURL(files[i]) });
            }
            setImageShow([...imageShow, ...imageUrl]);
        }
    };

    const changeImage = (img, index) => {
        if (img) {
            let tempUrl = imageShow;
            let tempImages = images;
            tempImages[index] = img;
            tempUrl[index] = { url: URL.createObjectURL(img) };
            setImageShow([...tempUrl]);
            setImages([...tempImages]);
        }
    };

    const removeImage = (i) => {
        const filterImage = images.filter((img, index) => index !== i);
        const filterImageUrl = imageShow.filter((img, index) => index !== i);

        setImages(filterImage);
        setImageShow(filterImageUrl);
    };

    const submit_request = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("email", state.email);
        formData.append("phone", state.phone);
        formData.append("businessForm", state.businessForm);
        formData.append("address", state.address);
        // formData.append("serviceArea", state.serviceArea);
        formData.append("serviceArea", JSON.stringify(selectedServiceAreas));
        formData.append("reasons", state.reasons);
        formData.append("experience", state.experience);
        formData.append("cusId", userInfo.id);

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        dispatch(caregiver_request(formData));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate("/");
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage]);

    return (
        <div>
            <div className="relative">
                <HeaderPageCommon
                    title=""
                    desc="Welcome members of the community"
                    showBookNow={false}
                />
            </div>
            <div className="absolute top-[400px] left-[50px] w-[95%] py-2 px-10 flex flex-col justify-center ">
                <form onSubmit={submit_request}>
                    <div className="grid grid-cols-2 gap-10 mt-8 text-black">
                        <div className=" px-4 py-2">
                            <div className="grid grid-cols-2 gap-[20px]">
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label className="font-bold" htmlFor="name">
                                        Name:{" "}
                                    </label>
                                    <input
                                        disabled
                                        value={state.name}
                                        onChange={handleState}
                                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder=" Name"
                                    />
                                </div>
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label
                                        className="font-bold"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        disabled
                                        value={state.email}
                                        onChange={handleState}
                                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-[20px]">
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label
                                        className="font-bold"
                                        htmlFor="phone"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        value={state.phone}
                                        onChange={handleState}
                                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="Phone"
                                    />
                                    {errors.phone && (
                                        <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                            <BiSolidError /> {errors.phone}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label className="font-bold" htmlFor="type">
                                        Business Form
                                    </label>
                                    <select
                                        value={state.businessForm}
                                        onChange={handleState}
                                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                        id="type"
                                        name="businessForm"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="business">
                                            Business establishment
                                        </option>
                                        <option value="online">Online</option>
                                    </select>
                                    {errors.businessForm && (
                                        <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                            <BiSolidError />{" "}
                                            {errors.businessForm}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-1 mb-3">
                                <label className="font-bold" htmlFor="address">
                                    Address
                                </label>
                                <input
                                    value={state.address}
                                    onChange={handleState}
                                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Address"
                                />
                                {errors.address && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.address}
                                    </span>
                                )}
                            </div>
                            <div className="flex mt-3 flex-col w-full gap-1 mb-3">
                                <label
                                    className="font-bold"
                                    htmlFor="serviceArea"
                                >
                                    Service area
                                </label>

                                <div className="mt-2 flex flex-wrap gap-2">
                                    {selectedServiceAreas.map((area) => (
                                        <span
                                            key={area}
                                            className="bg-gray-200 px-2 py-1 rounded-full flex items-center"
                                        >
                                            {area}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeServiceArea(area)
                                                }
                                                className="ml-2 text-red-500"
                                            >
                                                X
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <select
                                    value={state.serviceArea}
                                    onChange={handleDropdownChange}
                                    id="serviceArea"
                                    name="serviceArea"
                                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                >
                                    <option value="">Chọn khu vực</option>
                                    {provinces.map((area) => (
                                        <option key={area} value={area}>
                                            {area}
                                        </option>
                                    ))}
                                </select>

                                {/* <select
                                    value={state.serviceArea}
                                    onChange={handleState}
                                    id="serviceArea"
                                    name="serviceArea"
                                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                >
                                    <option value="">Chọn khu vực</option>
                                    <option value="Hà Nội">Hà Nội</option>
                                    <option value="TP Hồ Chí Minh">
                                        TP Hồ Chí Minh
                                    </option>
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                    <option value="Hải Phòng">Hải Phòng</option>
                                    <option value="Cần Thơ">Cần Thơ</option>
                                    <option value="An Giang">An Giang</option>
                                    <option value="Bà Rịa - Vũng Tàu">
                                        Bà Rịa - Vũng Tàu
                                    </option>
                                    <option value="Bắc Giang">Bắc Giang</option>
                                    <option value="Bắc Kạn">Bắc Kạn</option>
                                    <option value="Bạc Liêu">Bạc Liêu</option>
                                    <option value="Bắc Ninh">Bắc Ninh</option>
                                    <option value="Bến Tre">Bến Tre</option>
                                    <option value="Bình Định">Bình Định</option>
                                    <option value="Bình Dương">
                                        Bình Dương
                                    </option>
                                    <option value="Bình Phước">
                                        Bình Phước
                                    </option>
                                    <option value="Bình Thuận">
                                        Bình Thuận
                                    </option>
                                    <option value="Cà Mau">Cà Mau</option>
                                    <option value="Cao Bằng">Cao Bằng</option>
                                    <option value="Đắk Lắk">Đắk Lắk</option>
                                    <option value="Đắk Nông">Đắk Nông</option>
                                    <option value="Điện Biên">Điện Biên</option>
                                    <option value="Đồng Nai">Đồng Nai</option>
                                    <option value="Đồng Tháp">Đồng Tháp</option>
                                    <option value="Gia Lai">Gia Lai</option>
                                    <option value="Hà Giang">Hà Giang</option>
                                    <option value="Hà Nam">Hà Nam</option>
                                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                                    <option value="Hải Dương">Hải Dương</option>
                                    <option value="Hậu Giang">Hậu Giang</option>
                                    <option value="Hòa Bình">Hòa Bình</option>
                                    <option value="Hưng Yên">Hưng Yên</option>
                                    <option value="Khánh Hòa">Khánh Hòa</option>
                                    <option value="Kiên Giang">
                                        Kiên Giang
                                    </option>
                                    <option value="Kon Tum">Kon Tum</option>
                                    <option value="Lai Châu">Lai Châu</option>
                                    <option value="Lâm Đồng">Lâm Đồng</option>
                                    <option value="Lạng Sơn">Lạng Sơn</option>
                                    <option value="Lào Cai">Lào Cai</option>
                                    <option value="Long An">Long An</option>
                                    <option value="Nam Định">Nam Định</option>
                                    <option value="Nghệ An">Nghệ An</option>
                                    <option value="Ninh Bình">Ninh Bình</option>
                                    <option value="Ninh Thuận">
                                        Ninh Thuận
                                    </option>
                                    <option value="Phú Thọ">Phú Thọ</option>
                                    <option value="Phú Yên">Phú Yên</option>
                                    <option value="Quảng Bình">
                                        Quảng Bình
                                    </option>
                                    <option value="Quảng Nam">Quảng Nam</option>
                                    <option value="Quảng Ngãi">
                                        Quảng Ngãi
                                    </option>
                                    <option value="Quảng Ninh">
                                        Quảng Ninh
                                    </option>
                                    <option value="Quảng Trị">Quảng Trị</option>
                                    <option value="Sóc Trăng">Sóc Trăng</option>
                                    <option value="Sơn La">Sơn La</option>
                                    <option value="Tây Ninh">Tây Ninh</option>
                                    <option value="Thái Bình">Thái Bình</option>
                                    <option value="Thái Nguyên">
                                        Thái Nguyên
                                    </option>
                                    <option value="Thanh Hóa">Thanh Hóa</option>
                                    <option value="Thừa Thiên Huế">
                                        Thừa Thiên Huế
                                    </option>
                                    <option value="Tiền Giang">
                                        Tiền Giang
                                    </option>
                                    <option value="Trà Vinh">Trà Vinh</option>
                                    <option value="Tuyên Quang">
                                        Tuyên Quang
                                    </option>
                                    <option value="Vĩnh Long">Vĩnh Long</option>
                                    <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                                    <option value="Yên Bái">Yên Bái</option>
                                </select> */}

                                {errors.serviceArea && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.serviceArea}
                                    </span>
                                )}
                            </div>
                            <div className="flex  flex-col w-full gap-1 mb-3">
                                <label className="font-bold" htmlFor="reasons">
                                    Reasons to want to be a caregiver
                                </label>
                                <textarea
                                    value={state.reasons}
                                    onChange={handleState}
                                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                    type="text"
                                    id="reasons"
                                    name="reasons"
                                    placeholder="Reasons to want to be a caregiver"
                                    rows={10}
                                    cols={1}
                                />
                                {errors.reasons && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.reasons}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className=" px-4 py-2">
                            <div className="flex flex-col w-full gap-1 mb-3">
                                <label
                                    className="font-bold"
                                    htmlFor="experience"
                                >
                                    Experience
                                </label>
                                <textarea
                                    value={state.experience}
                                    onChange={handleState}
                                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                    type="text"
                                    id="experience"
                                    name="experience"
                                    placeholder="Experience"
                                    rows={13}
                                    cols={1}
                                />
                                {errors.experience && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.experience}
                                    </span>
                                )}
                            </div>

                            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
                                {imageShow.map((img, i) => (
                                    <div key={i} className="h-[180px] relative">
                                        <label htmlFor={i}>
                                            <img
                                                className="w-full h-full rounded-sm object-contain"
                                                src={img.url}
                                                alt=""
                                            />
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                changeImage(
                                                    e.target.files[0],
                                                    i
                                                )
                                            }
                                            type="file"
                                            id={i}
                                            className="hidden"
                                        />
                                        <span
                                            onClick={() => removeImage(i)}
                                            className="p-2 z-10 cursor-pointer   absolute top-1 right-1 rounded-full"
                                        >
                                            <IoMdCloseCircle className="text-red-800 text-[25px]" />
                                        </span>
                                    </div>
                                ))}

                                <label
                                    className="flex justify-center items-center flex-col h-[230px] bg-white cursor-pointer border border-dashed hover:border-red-500 w-full text-[#d0d2d6]"
                                    htmlFor="image"
                                >
                                    <span>
                                        <IoMdImages className="text-red-600" />
                                    </span>
                                    <span className="text-black">
                                        Select Image{" "}
                                    </span>
                                </label>
                                <input
                                    className="hidden"
                                    onChange={imageHandle}
                                    multiple
                                    type="file"
                                    id="image"
                                />
                            </div>
                            {errors.images && (
                                <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                    <BiSolidError /> {errors.images}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            disabled={loader ? true : false}
                            type="submit"
                            className=" text-white cursor-pointer items-center gap-2 font-bold border-[3px] px-8 rounded-full rounded-tl-3xl py-1 bg-[#ed6436] hover:bg-white hover:border-[2px] hover:text-black"
                        >
                            {loader ? (
                                <PropagateLoader
                                    color="#fff"
                                    cssOverride={overrideStyle}
                                />
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-[500px]">
                <Footer />
            </div>
        </div>
    );
};

export default RegisterCaregiver;
