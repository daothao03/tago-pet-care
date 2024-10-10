import { useEffect, useRef, useState } from "react";
import HeaderPageCommon from "../components/HeaderPageCommon";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { Range } from "react-range";
import { formatPrice } from "./../utils/utils";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_service_details } from "../store/reducer/homeReducer";
import { format } from "date-fns/format";
import { addDays } from "date-fns";
import addMinutes from "date-fns/addMinutes";
import {
    messageClear,
    place_order_service,
} from "../store/reducer/orderReducer";
import toast from "react-hot-toast";

const ServiceDetail = () => {
    const dispatch = useDispatch();
    const { service } = useSelector((state) => state.home);
    const { userInfo } = useSelector((state) => state.auth);
    const { errorMessage, successMessage } = useSelector(
        (state) => state.order
    );

    const { slug } = useParams();
    const refOne = useRef(null);
    const [days, setDays] = useState(1);
    const [open, setOpen] = useState(false);
    // const [openEndDate, setOpenEndDate] = useState(false);

    const [state, setState] = useState({
        petType: "",
        formCare: "",
        address: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectStartDate = (date) => {
        setState({
            ...state,
            startDate: format(date, "dd/MM/yyyy"),
        });
        setOpen(false);
    };

    useEffect(() => {
        setState({
            ...state,
            startDate: format(new Date(), "dd/MM/yyyy"),
            endDate: format(addDays(new Date(), days), "dd/MM/yyyy"),
        });
        document.addEventListener("keydown", hiddenOnEscape, true);
        document.addEventListener("click", hideOnClickOutSide, true);
    }, [days]);

    const hiddenOnEscape = (e) => {
        if (e.key === "Escape") {
            setOpen(false);
        }
    };

    const hideOnClickOutSide = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        dispatch(get_service_details(slug));
    }, [slug]);

    const renderShortDescWithIcons = (string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(string, "text/html");
        const childNodes = doc.body.childNodes;

        return Array.from(childNodes).map((node, index) => {
            if (node.nodeName === "UL") {
                return (
                    <ul key={index} className="ml-5">
                        {Array.from(node.childNodes).map((liNode, liIndex) => (
                            <li key={liIndex} className="flex gap-3">
                                <FaCheck className="text-[#ed6436]  " />
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: liNode.innerHTML,
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                );
            } else {
                return (
                    <div
                        key={index}
                        dangerouslySetInnerHTML={{ __html: node.outerHTML }}
                    ></div>
                );
            }
        });
    };

    const calculateEndTime = (startTime, complete_time) => {
        if (!startTime) return "";

        const [hours, minutes] = startTime.split(":");
        const startDate = new Date();
        startDate.setHours(hours, minutes);

        const endDate = addMinutes(startDate, complete_time);

        const endTimeFormatted = format(endDate, "HH:mm");
        return endTimeFormatted;
    };

    useEffect(() => {
        if (state.startTime) {
            const endTime = calculateEndTime(
                state.startTime,
                service.complete_time
            );
            setState((prevState) => ({
                ...prevState,
                endTime: endTime,
            }));
        }
    }, [state.startTime, service.complete_time]);

    const submit_request = (e) => {
        e.preventDefault();

        dispatch(
            place_order_service({
                price: service.price,
                service: service,
                userId: userInfo.id,
                petType: state.petType,
                startTime: state.startTime,
                endTime: state.endTime,
                serviceType: state.formCare,
                address: state.address || "",
                startDate: state.startDate,
                endDate: state.endDate,
                days,
                navigate,
            })
        );
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [errorMessage, successMessage]);

    return (
        <>
            <HeaderPageCommon
                showBookNow={false}
                title={""}
                desc={service.name ? service.name : ""}
            />
            <div className="container grid grid-cols-2 gap-[50px]">
                <div>
                    <img
                        src={service.images?.[0]}
                        alt=""
                        className="object-cover rounded-[50px] w-full"
                    />
                    <div className="mt-10">
                        <span className="font-bold">
                            Time: {service.complete_time} minutes
                        </span>
                        <div className="mt-5">
                            <span className="font-bold">Benefits: </span>
                            <p>
                                {renderShortDescWithIcons(
                                    service.short_description
                                )}
                            </p>
                        </div>
                        <div className="mt-5 flex gap-3 items-center">
                            <span className="font-bold">Price: </span>
                            {service.discount > 0 ? (
                                <div className="flex items-center">
                                    <span className="font-bold  text-[25px] text-red-600 mr-2">
                                        {formatPrice(
                                            service.price -
                                                service.price *
                                                    (service.discount / 100)
                                        )}
                                    </span>
                                    <span className="block text-[14px] line-through font-semibold">
                                        {formatPrice(service.price)} / day
                                    </span>
                                </div>
                            ) : (
                                <span className="font-bold text-[25px] text-red-600 mr-2">
                                    {formatPrice(service.price)} /day
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-[#f2f2f4] rounded-[50px] p-[60px]">
                    <span className="text-[#ed6436] font-semibold text-center block">
                        PLANNING A VACATION?
                    </span>
                    <h2 className="font-pacifico mt-2 text-[25px]  text-center">
                        {service.name}
                    </h2>
                    <form onSubmit={submit_request}>
                        <div className="flex mt-3 flex-col w-full gap-1 mb-3">
                            <label className="font-bold" htmlFor="petType">
                                Your pet
                            </label>

                            <select
                                id="petType"
                                name="petType"
                                value={state.petType}
                                onChange={handleInputChange}
                                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                            >
                                <option value="">Select...</option>
                                <option value="cat">Cat</option>
                                <option value="dog">Dog</option>
                            </select>
                        </div>
                        <div className="flex mt-3 flex-col w-full gap-1 mb-3">
                            <label className="font-bold" htmlFor="formCare">
                                Form of care
                            </label>

                            <select
                                id="formCare"
                                name="formCare"
                                value={state.formCare}
                                onChange={handleInputChange}
                                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                            >
                                <option value="">Select...</option>
                                <option value="home">Home</option>
                                <option value="store">Store</option>
                            </select>
                        </div>

                        {state.formCare === "home" && (
                            <div className="flex flex-col w-full gap-1 mb-3">
                                <label className="font-bold" htmlFor="address">
                                    Address
                                </label>
                                <input
                                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Address"
                                    value={state.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        <div className="mt-2">
                            <label className="font-bold" htmlFor="days">
                                Number of day:
                            </label>
                            <div className="my-7">
                                <Range
                                    step={1}
                                    min={1}
                                    max={30}
                                    values={[days]}
                                    onChange={(values) => setDays(values[0])}
                                    renderTrack={({ props, children }) => (
                                        <div
                                            {...props}
                                            className="w-full h-[6px] bg-[#ed6436] rounded-full cursor-pointer"
                                        >
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div
                                            className="w-[30px] h-[30px] bg-[#ed6436] font-bold text-[14px] rounded-full flex items-center justify-center text-white "
                                            {...props}
                                        >
                                            {days}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        <div ref={refOne} className=" w-full  mb-5">
                            <div className="flex-1">
                                <label
                                    htmlFor="startDate"
                                    className="font-bold"
                                >
                                    Start Date
                                </label>

                                <input
                                    className="px-4 w-full py-2 flex focus:border-indigo-500 outline-none  border border-slate-700 mb-2 rounded-md"
                                    type="text"
                                    readOnly
                                    id="startDate"
                                    value={state.startDate}
                                    onClick={() => setOpen(!open)}
                                />

                                {open && (
                                    <Calendar
                                        onChange={handleSelectStartDate}
                                        date={new Date()}
                                        minDate={new Date()}
                                    />
                                )}
                            </div>
                            {/* <div className="flex-1">
                                <label
                                    htmlFor="startDate "
                                    className="font-bold"
                                >
                                    End Date
                                </label>

                                <input
                                    className="px-4 w-full py-2 flex focus:border-indigo-500 outline-none  border border-slate-700 mb-2 rounded-md text-[#d0d2d6]"
                                    type="text"
                                    readOnly
                                    id="startDate"
                                    // value={state.endDate}
                                    onClick={() => setOpenEndDate(!openEndDate)}
                                />

                                {openEndDate && (
                                    <Calendar
                                        // onChange={handleSelectEndDate}
                                        date={new Date()}
                                    />
                                )}
                            </div> */}
                        </div>
                        <div className="flex-1">
                            <label htmlFor="startTime" className="font-bold">
                                Start Time
                            </label>
                            <input
                                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 mb-2 rounded-md text-[#000000] w-full"
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={state.startTime}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* <div className="flex justify-end gap-3 items-center">
                            <span className="font-semibold mt-1">
                                Travel fee:
                            </span>
                            <span className="text-[19px] font-pacifico">
                                {formatPrice(20000)}
                            </span>
                        </div> */}

                        <div className="flex justify-end gap-3 items-center">
                            <span className="text-[20px] mt-3 font-semibold ">
                                Total:
                            </span>
                            <span className="font-pacifico text-[35px]">
                                {formatPrice(days * service.price)}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="flex items-center justify-center  w-full text-white cursor-pointer gap-2 font-bold border-[3px] mt-5 px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436]"
                        >
                            <span className="hover:translate-x-3 flex gap-3 items-center">
                                Checkout <FaArrowRight />
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ServiceDetail;
