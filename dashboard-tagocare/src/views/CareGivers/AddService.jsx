import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import {
    IoMdArrowRoundBack,
    IoMdCloseCircle,
    IoMdImages,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../../store/reducer/cateReducer";

import { useNavigate, useParams } from "react-router-dom";
import {
    add_service,
    get_service_id,
    messageClear,
    update_service,
} from "../../store/reducer/serviceReducer";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { BiSolidError } from "react-icons/bi";

const AddService = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const { categories } = useSelector((state) => state.category);

    const {
        loader,
        successMessage,
        errorMessage,
        service,
        categoryByServiceId,
        errors,
    } = useSelector((state) => state.service);

    const { serviceId } = useParams();

    const [state, setState] = useState({
        name: "",
        price: "",
        category: "",
        discount: "",
        short_description: "",
        long_description: "",
        complete_time: 30,
    });

    const navigate = useNavigate();

    const editor = useRef(null);
    const [images, setImages] = useState([]);
    const [imageShow, setImageShow] = useState([]);

    const [cateShow, setCateShow] = useState(false);
    const [category, setCategory] = useState("");
    const [allCategory, setAllCategory] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const categorySearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        if (value) {
            let srcValue = allCategory.filter(
                (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
            );
            setAllCategory(srcValue);
        } else {
            setAllCategory(categories);
        }
    };

    useEffect(() => {
        setAllCategory(categories);
    }, [categories]);

    const inputHandle = (e) => {
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

    //get categories
    useEffect(() => {
        dispatch(
            get_category({
                page: "",
                searchValue: "",
                parPage: "",
                typeCate: "",
            })
        );
    }, []);

    useEffect(() => {
        if (serviceId) {
            dispatch(get_service_id(serviceId));
        }
    }, [serviceId]);

    useEffect(() => {
        if (service) {
            setState({
                name: service.name,
                price: service.price,
                category: service.category,
                discount: service.discount,
                long_description: service.long_description,
                short_description: service.short_description,
                complete_time: service.complete_time,
            });

            const imagesArray = Array.isArray(service.images)
                ? service.images
                : [service.images];
            setImageShow(imagesArray);
            setImages(imagesArray);
            setCategory(categoryByServiceId.name);
            setCateShow(categoryByServiceId.name);
        }
    }, [service]);

    const submit_request = (e) => {
        e.preventDefault();

        if (serviceId) {
            const formData = new FormData();
            formData.append("serviceId", serviceId);
            formData.append("name", state.name);
            formData.append("category", state.category);
            formData.append("price", state.price);
            formData.append("discount", state.discount);
            formData.append("long_description", state.long_description);
            formData.append("short_description", state.short_description);
            formData.append("complete_time", state.complete_time);

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
            dispatch(update_service(formData));
        } else {
            const formData = new FormData();
            formData.append("caregiverId", userInfo._id);
            formData.append("name", state.name);
            formData.append("category", state.category);
            formData.append("price", state.price);
            formData.append("discount", state.discount);
            formData.append("long_description", state.long_description);
            formData.append("short_description", state.short_description);
            formData.append("complete_time", state.complete_time);

            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }

            dispatch(add_service(formData));
        }
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate("/caregiver/services");
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage]);

    return (
        <section className="px-2 lg:px-7 pt-5  ">
            <div className=" bg-primary p-5 rounded-md text-white gap-[50px]">
                <div
                    onClick={() => {
                        navigate("/caregiver/services");
                    }}
                >
                    <span className="flex items-center gap-1 cursor-pointer hover:translate-x-1 font-bold text-[17px]">
                        <IoMdArrowRoundBack /> Back
                    </span>
                </div>

                <form onSubmit={submit_request}>
                    <div className="grid grid-cols-2 gap-[30px] mt-10">
                        <div>
                            <div className="flex flex-col w-full gap-1 mb-3 ">
                                <label className="font-bold" htmlFor="name">
                                    Name:
                                </label>
                                <input
                                    value={state.name}
                                    onChange={inputHandle}
                                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder=" Name"
                                />

                                {errors.name && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.name}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col w-full gap-1 relative">
                                <label htmlFor="category">Category</label>
                                <input
                                    readOnly
                                    onClick={() => setCateShow(!cateShow)}
                                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-primary border border-slate-700 rounded-md text-[#d0d2d6]"
                                    onChange={inputHandle}
                                    value={category}
                                    type="text"
                                    id="category"
                                    placeholder="--select category--"
                                />
                                {errors.category && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.category}
                                    </span>
                                )}
                                <div
                                    className={`absolute top-[101%] rounded-md bg-second w-full transition-all ${
                                        cateShow ? "scale-100" : "scale-0"
                                    } `}
                                >
                                    <div className="w-full px-4 py-2 fixed">
                                        <input
                                            value={searchValue}
                                            onChange={categorySearch}
                                            className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                                            type="text"
                                            placeholder="search"
                                        />
                                    </div>
                                    <div className="pt-14"></div>
                                    <div className="flex justify-start items-start flex-col h-auto overflow-x-scroll">
                                        {allCategory.map((c, i) =>
                                            c.type === "service" ? (
                                                <span
                                                    key={i}
                                                    className={`px-4 py-2 hover:bg-third hover:text-white hover:shadow-lg w-full cursor-pointer ${
                                                        category === c.name &&
                                                        "bg-third"
                                                    }`}
                                                    onClick={() => {
                                                        setCateShow(false);
                                                        setCategory(c.name);
                                                        setState({
                                                            ...state,
                                                            category: c._id,
                                                        });
                                                        setSearchValue("");
                                                        setAllCategory(
                                                            categories
                                                        );
                                                    }}
                                                >
                                                    {c.name}
                                                </span>
                                            ) : (
                                                ""
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-[20px] mt-5">
                                <div className="flex flex-col w-full gap-1 mb-3 ">
                                    <label
                                        className="font-bold"
                                        htmlFor="category"
                                    >
                                        Price:
                                    </label>
                                    <input
                                        value={state.price}
                                        onChange={inputHandle}
                                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                        type="text"
                                        id="price"
                                        name="price"
                                        placeholder="Price"
                                    />
                                    {errors.price && (
                                        <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                            <BiSolidError /> {errors.price}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label
                                        className="font-bold"
                                        htmlFor="discount"
                                    >
                                        Discount:
                                    </label>
                                    <input
                                        value={state.discount}
                                        onChange={inputHandle}
                                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                        type="text"
                                        id="discount"
                                        name="discount"
                                        placeholder="Discount"
                                    />
                                    {errors.discount && (
                                        <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                            <BiSolidError /> {errors.discount}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-1 mb-3 ">
                                <label className="font-bold" htmlFor="name">
                                    Complete time:
                                </label>
                                <input
                                    value={state.complete_time}
                                    onChange={inputHandle}
                                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                    type="text"
                                    id="complete_time"
                                    name="complete_time"
                                    placeholder=" Complete_time"
                                />

                                {errors.complete_time && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.complete_time}
                                    </span>
                                )}
                            </div>
                            <div className="grid lg:grid-cols-2 mt-3 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
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
                        </div>
                        <div>
                            <div className="flex flex-col  text-black w-full gap-1 mb-3 mt-5">
                                <label
                                    className="font-bold text-white"
                                    htmlFor="short_description"
                                >
                                    Short Description:
                                </label>
                                <JoditEditor
                                    ref={editor}
                                    value={state.short_description}
                                    onChange={(newContent) =>
                                        setState({
                                            ...state,
                                            short_description: newContent,
                                        })
                                    }
                                    style={{ height: "400px" }}
                                />
                                {errors.short_description && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError />
                                        {errors.short_description}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col  text-black w-full gap-1 mb-3 mt-5">
                                <label
                                    className="font-bold text-white"
                                    htmlFor="long_description"
                                >
                                    Long Description:
                                </label>
                                <JoditEditor
                                    ref={editor}
                                    value={state.long_description}
                                    onChange={(newContent) =>
                                        setState({
                                            ...state,
                                            long_description: newContent,
                                        })
                                    }
                                    style={{ height: "400px" }}
                                />
                                {errors.long_description && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError />
                                        {errors.long_description}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center mt-2">
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

export default AddService;
