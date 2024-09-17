import { FadeLoader, PropagateLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";
import { IoMdCloseCircle, IoMdImages } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { BiSolidError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { overrideStyle, provinces } from "../../utils/utils";
import {
    caregiver_info,
    messageClear,
    update_profile,
} from "../../store/reducer/caregiverReducer";
import { FaImages } from "react-icons/fa";
import JoditEditor from "jodit-react";

const EditProfile = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const { loader, successMessage, errorMessage, errors, caregiver } =
        useSelector((state) => state.caregiver);

    const navigate = useNavigate();
    const editor = useRef(null);

    const [state, setState] = useState({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        phone: "",
        businessForm: "",
        address: "",
        serviceArea: "",
        introduce: "",
        experience: "",
        shopName: "",
        image: "",
    });

    const [images, setImages] = useState([]);
    const [imageShow, setImageShow] = useState([]);
    const [imageProfileShow, setImageProfileShow] = useState([]);
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
            let tempUrl = [...imageShow];
            let tempImages = [...images];

            tempImages[index] = img;
            tempUrl[index] = { url: URL.createObjectURL(img) };

            setImageShow(tempUrl);
            setImages(tempImages);
        }
    };

    const removeImage = (i) => {
        const filterImage = images.filter((img, index) => index !== i);
        const filterImageUrl = imageShow.filter((img, index) => index !== i);

        setImages(filterImage);
        setImageShow(filterImageUrl);
    };

    const imageProfileHandle = (e) => {
        let files = e.target.files;
        if (files.length > 0) {
            setImageProfileShow(URL.createObjectURL(files[0]));
            setState({
                ...state,
                image: files[0],
            });
        }
    };

    useEffect(() => {
        dispatch(caregiver_info(userInfo._id));
    }, [userInfo._id]);

    useEffect(() => {
        if (caregiver) {
            setState({
                name: userInfo.name,
                email: userInfo?.email || "",
                phone: caregiver.phone,
                businessForm: caregiver.businessForm,
                address: caregiver.address,
                introduce: caregiver.introduce || "",
                experience: caregiver.experience,
                shopName: caregiver.shopName || "",
            });
            const serviceAreaArray = Array.isArray(caregiver.serviceArea)
                ? caregiver.serviceArea
                : [caregiver.serviceArea];
            setSelectedServiceAreas(serviceAreaArray);

            const imagesArray = Array.isArray(caregiver.certificates)
                ? caregiver.certificates
                : [caregiver.certificates];
            setImageShow(imagesArray);
            setImages(imagesArray);
            setImageProfileShow(caregiver.caregiverId?.image);
        }
    }, [caregiver]);

    const submit_request = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", state.name);
        formData.append("email", state.email);
        formData.append("phone", state.phone);
        formData.append("businessForm", state.businessForm);
        formData.append("address", state.address);
        formData.append("serviceArea", JSON.stringify(selectedServiceAreas));
        formData.append("introduce", state.introduce);
        formData.append("experience", state.experience);
        formData.append("shopName", state.shopName);
        formData.append(
            "oldProfileImage",
            caregiver.caregiverId?.image !== ""
                ? caregiver.caregiverId?.image
                : ""
        );
        formData.append("newProfileImage", state.image);
        formData.append("careId", userInfo._id);

        images.forEach((cert) => {
            if (
                typeof cert === "string" &&
                (cert.startsWith("http://") || cert.startsWith("https://"))
            ) {
                formData.append(`oldImage`, cert);
            } else {
                formData.append(`newImage`, cert);
            }
        });

        dispatch(update_profile(formData));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate("/caregiver/profile");
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage]);

    return (
        <section className="px-2 lg:px-7 pt-5">
            <div className="bg-primary p-5 rounded-md text-white flex flex-col justify-center ">
                <span className="font-bold text-[20px]">Update Profile</span>
                <form onSubmit={submit_request}>
                    <div className="grid grid-cols-2 gap-10 mt-8 text-black">
                        <div className=" px-4 py-2">
                            <div className="flex justify-center items-center py-3">
                                {imageProfileShow ? (
                                    <label
                                        htmlFor="image"
                                        className="h-[200px] w-[200px] rounded-999 relative p-3 cursor-pointer overflow-hidden"
                                    >
                                        <img
                                            className="absolute top-0 left-0 w-full h-full object-cover"
                                            src={imageProfileShow}
                                            alt=""
                                        />
                                        {loader && (
                                            <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                                <span>
                                                    <FadeLoader />
                                                </span>
                                            </div>
                                        )}
                                    </label>
                                ) : (
                                    <label
                                        className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
                                        htmlFor="image"
                                    >
                                        <span>
                                            <FaImages />
                                        </span>
                                        <span>Select Image</span>
                                        {loader && (
                                            <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                                <span>
                                                    <FadeLoader />
                                                </span>
                                            </div>
                                        )}
                                    </label>
                                )}
                                <input
                                    onChange={imageProfileHandle}
                                    type="file"
                                    className="hidden"
                                    id="image"
                                />
                                {errors.image && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.image}
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-[20px]">
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label className="font-bold" htmlFor="name">
                                        Name:
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
                                            <BiSolidError />
                                            {errors.businessForm}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col w-full gap-1 mb-3">
                                <label className="font-bold" htmlFor="address">
                                    Shop Name
                                </label>
                                <input
                                    value={state.shopName}
                                    onChange={handleState}
                                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                    type="text"
                                    id="shopName"
                                    name="shopName"
                                    placeholder="Shop Name"
                                />
                                {errors.shopName && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.shopName}
                                    </span>
                                )}
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

                                {errors.serviceArea && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.serviceArea}
                                    </span>
                                )}
                            </div>
                            <div className="flex  flex-col w-full gap-1 mb-3">
                                <label
                                    className="font-bold"
                                    htmlFor="introduce"
                                >
                                    Introduce
                                </label>
                                <JoditEditor
                                    ref={editor}
                                    value={state.introduce}
                                    onChange={(newContent) =>
                                        setState({
                                            ...state,
                                            introduce: newContent,
                                        })
                                    }
                                />
                                {errors.introduce && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.introduce}
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

                                <JoditEditor
                                    ref={editor}
                                    value={state.experience}
                                    onChange={(newContent) =>
                                        setState({
                                            ...state,
                                            experience: newContent,
                                        })
                                    }
                                />
                                {errors.experience && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.experience}
                                    </span>
                                )}
                            </div>

                            <div className="grid lg:grid-cols-2 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
                                {imageShow.map((img, i) => (
                                    <div key={i} className="h-[180px] relative">
                                        <label htmlFor={`edit-image-${i}`}>
                                            <img
                                                className="w-full h-full rounded-sm object-contain"
                                                src={img.url || img}
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
                                            id={`edit-image-${i}`}
                                            className="hidden"
                                        />
                                        <span
                                            onClick={() => removeImage(i)}
                                            className="p-2 z-10 cursor-pointer absolute top-1 right-1 rounded-full"
                                        >
                                            <IoMdCloseCircle className="text-red-800 text-[25px]" />
                                        </span>
                                    </div>
                                ))}

                                <label
                                    className="flex justify-center items-center flex-col h-[230px] bg-white cursor-pointer border border-dashed hover:border-red-500 w-full text-[#d0d2d6]"
                                    htmlFor="new-image"
                                >
                                    <span>
                                        <IoMdImages className="text-red-600" />
                                    </span>
                                    <span className="text-black">
                                        Select Image
                                    </span>
                                </label>
                                <input
                                    className="hidden"
                                    onChange={imageHandle}
                                    multiple
                                    type="file"
                                    id="new-image"
                                />
                            </div>

                            {errors.certificates && (
                                <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                    <BiSolidError /> {errors.certificates}
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
        </section>
    );
};

export default EditProfile;
