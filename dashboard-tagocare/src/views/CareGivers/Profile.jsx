import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    caregiver_info,
    create_stripe_connect_account,
} from "../../store/reducer/caregiverReducer";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbPasswordUser } from "react-icons/tb";

const Profile = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { caregiver } = useSelector((state) => state.caregiver);

    useEffect(() => {
        if (userInfo && userInfo._id) {
            dispatch(caregiver_info(userInfo._id));
        }
    }, [userInfo.id]);

    return (
        <section className="px-2 lg:px-7 pt-5  ">
            <div className="grid grid-cols-6 bg-primary p-5 rounded-md text-white gap-[50px]">
                <div className="col-span-2 mt-[50px]">
                    <div className="flex justify-center ">
                        <img
                            src={caregiver.caregiverId?.image}
                            alt=""
                            className="w-[250px] h-[250px] object-cover rounded-full"
                        />
                    </div>
                    <div className=" mt-4">
                        <div className="flex flex-col items-center">
                            <span className="text-[20px] font-bold">
                                {caregiver.caregiverId?.name}
                            </span>
                        </div>
                        {/* <div className="flex flex-col items-center">
                            <span className="text-[20px] font-bold">
                                {caregiver.caregiverId?.name}
                            </span>
                            <span className="mt-1">
                                {caregiver.caregiverId?.shopName
                                    ? caregiver.caregiverId?.shopName
                                    : "NaN"}
                            </span>
                            <span className="mt-1">
                                {caregiver.caregiverId?.email}
                            </span>
                            <span className="mt-1">{caregiver.phone}</span>
                        </div> */}

                        <div className="mt-5 px-3 py-2 rounded-md gap-[30px] bg-second">
                            <div className="flex flex-col">
                                <span className="mt-1">
                                    Shop Name:
                                    {caregiver.shopName
                                        ? caregiver.shopName
                                        : "NaN"}
                                </span>
                                <span className="mt-1">
                                    Email: {caregiver.caregiverId?.email}
                                </span>
                                <span className="mt-1">
                                    Phone: {caregiver.phone}
                                </span>
                            </div>
                        </div>

                        <div className="mt-5 px-3 py-2 rounded-md gap-[30px] bg-second">
                            <div className="flex flex-col ">
                                <span className="mt-1 font-semibold">
                                    Business Form: {caregiver.businessForm}
                                </span>
                                <span className="mt-1 font-semibold">
                                    Address: {caregiver.address}
                                </span>
                                <div className="mt-1 font-semibold flex gap-[10px]">
                                    <span>Service Area:</span>
                                    <ul>
                                        {caregiver.serviceArea?.map(
                                            (s, index) => (
                                                <li
                                                    className="before:content-['•'] before:mr-2"
                                                    key={index + 1}
                                                >
                                                    {s}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 px-3 py-2 rounded-md gap-[30px] bg-second">
                            <span className="mt-1 font-semibold">
                                Number of Employee: {caregiver.numberEmployee}
                            </span>
                        </div>

                        <div className="mt-5 bg-second px-3 py-2 rounded-md flex flex-col">
                            <span className=" font-roboto  font-bold">
                                Status: {caregiver.caregiverId?.status}
                            </span>

                            <span className=" font-roboto font-bold">
                                Payment Account:
                                <span>
                                    {userInfo.payment === "active" ? (
                                        <span className="bg-red-500 text-white text-[1.2rem] cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                                            {userInfo.payment}
                                        </span>
                                    ) : (
                                        <span
                                            onClick={() =>
                                                dispatch(
                                                    create_stripe_connect_account()
                                                )
                                            }
                                            className="bg-blue-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded"
                                        >
                                            Click Active
                                        </span>
                                    )}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="col-span-1 flex items-start gap-[10px] justify-end ">
                        <div className="">
                            <Link
                                to={`/edit-profile`}
                                className="px-1 py-1 bg-[#895737] rounded-md flex cursor-pointer"
                            >
                                <FaUserEdit className="text-[30px] " />
                            </Link>
                        </div>
                        <div>
                            <Link
                                to={`/edit-password`}
                                className="px-1 py-1 bg-[#895737] rounded-md flex cursor-pointer"
                            >
                                <TbPasswordUser className="text-[30px] " />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-[30px] bg-second px-3 py-2 rounded-md">
                        <p
                            className="italic "
                            dangerouslySetInnerHTML={{
                                __html: caregiver.introduce,
                            }}
                        ></p>
                    </div>

                    <div className="mt-5 bg-second px-3 py-2 rounded-md">
                        <h4 className=" font-roboto text-[25px] font-bold">
                            Experiences
                        </h4>
                        <p
                            className="mt-2"
                            dangerouslySetInnerHTML={{
                                __html: caregiver.experience,
                            }}
                        ></p>
                    </div>

                    <div className="mt-[60px] bg-second px-3 py-2 rounded-md">
                        <h4 className=" font-roboto text-[25px] font-bold ">
                            Certificates
                        </h4>
                        <div className="flex flex-wrap justify-around items-center -mx-1.5">
                            {caregiver.certificates?.map((c, index) => (
                                <div
                                    key={index + 1}
                                    className="mt-3 flex-1/2  px-1.5"
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

export default Profile;
