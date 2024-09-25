import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    caregiver_info,
    messageClear,
    update_role_status,
} from "../../store/reducer/caregiverReducer";
import toast from "react-hot-toast";

const CaregiverDetails = () => {
    const dispatch = useDispatch();
    const { caregiver, successMessage } = useSelector(
        (state) => state.caregiver
    );

    const { careId } = useParams();

    useEffect(() => {
        dispatch(caregiver_info(careId));
    }, [careId]);

    const handleChangeStatus = (newStatus) => {
        const obj = {
            status: newStatus,
            careId,
        };
        dispatch(update_role_status(obj));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
    }, [successMessage]);

    return (
        <section className="px-2 lg:px-7 pt-5  ">
            <div className="grid grid-cols-6 bg-primary p-5 rounded-md text-white gap-[50px]">
                <div className="col-span-2">
                    <div className="flex justify-center ">
                        <img
                            src={caregiver.caregiverId?.image}
                            alt=""
                            className="w-[250px] h-[250px] object-cover rounded-full"
                        />
                    </div>
                    <div className=" mt-4">
                        <div className="flex flex-col items-center ">
                            <span className="text-[20px] font-bold">
                                {caregiver.caregiverId?.name}
                            </span>
                            <span className="mt-1">
                                {caregiver.shopName
                                    ? caregiver.shopName
                                    : "NaN"}
                            </span>
                            <span className="mt-1">
                                {caregiver.caregiverId?.email}
                            </span>
                            <span className="mt-1">{caregiver.phone}</span>
                        </div>

                        <div className="mt-[60px] bg-second px-3 py-2 rounded-md">
                            <p
                                className="italic"
                                dangerouslySetInnerHTML={{
                                    __html: caregiver.introduce,
                                }}
                            ></p>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-[20px] bg-second px-3 py-2 rounded-md">
                        <h4 className=" font-roboto text-[20px] font-bold">
                            Status
                        </h4>
                        <select
                            value={caregiver.caregiverId?.status}
                            onChange={(e) => handleChangeStatus(e.target.value)}
                            className=" bg-transparent border focus:outline-none p-1 rounded-full mr-1"
                        >
                            <option className="text-black" value="pending">
                                Pending
                            </option>
                            <option className="text-black" value="active">
                                Active
                            </option>
                            <option className="text-black" value="inactive">
                                Inactive
                            </option>
                        </select>
                    </div>

                    <div className="mt-4 flex gap-[20px] bg-second px-3 py-2 rounded-md">
                        <span className=" font-roboto text-[20px] font-bold">
                            Payment: {caregiver.caregiverId?.payment}
                        </span>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="flex flex-col bg-second px-3 py-2 rounded-md">
                        <span className="mt-1 font-semibold">
                            Business Form: {caregiver.businessForm}
                        </span>
                        <span className="mt-1 font-semibold">
                            Address: {caregiver.address}
                        </span>
                        <div className="mt-1 font-semibold flex gap-[10px]">
                            <span>Service Area:</span>
                            <ul>
                                {caregiver.serviceArea?.map((s, index) => (
                                    <li
                                        className="before:content-['•'] before:mr-2"
                                        key={index + 1}
                                    >
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-[60px] bg-second px-3 py-2 rounded-md">
                        <h4 className=" font-roboto text-[25px] font-bold">
                            Reasons
                        </h4>
                        <p className="mt-2">{caregiver.reasons}</p>
                    </div>

                    <div className="mt-[60px] bg-second px-3 py-2 rounded-md">
                        <h4 className=" font-roboto text-[25px] font-bold">
                            Experiences
                        </h4>
                        <p className="mt-2">{caregiver.experience}</p>
                    </div>

                    <div className="mt-[60px] bg-second px-3 py-2 rounded-md">
                        <h4 className=" font-roboto text-[25px] font-bold">
                            Certificates
                        </h4>
                        <div className="flex flex-wrap justify-center items-center -mx-1.5">
                            {caregiver.certificates?.map((c, index) => (
                                <div
                                    key={index + 1}
                                    className="mt-3 w-1/2 px-1.5"
                                >
                                    <img
                                        src={c}
                                        alt=""
                                        className="w-full h-[250px] object-cover rounded-md"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaregiverDetails;
