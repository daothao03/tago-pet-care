import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import ModalConfirm from "../components/ModalConfirm";
import toast from "react-hot-toast";
import {
    delete_service,
    get_services,
    messageClear,
    update_service_status,
} from "../../store/reducer/serviceReducer";
import { formatPrice } from "../../utils/utils";

const Services = () => {
    const dispatch = useDispatch();
    const { services, successMessage, totalService } = useSelector(
        (state) => state.service
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChangeStatus = (id, newStatus) => {
        const obj = {
            status: newStatus,
            id,
        };
        dispatch(update_service_status(obj));
    };

    const [deleteServiceId, setDeleteServiceId] = useState(null);

    const handleDelete = () => {
        if (deleteServiceId) {
            dispatch(delete_service(deleteServiceId));
            setIsModalOpen(false);
            setDeleteServiceId(null);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setDeleteServiceId(null);
    };

    useEffect(() => {
        dispatch(
            get_services({
                parPage: parseInt(parPage),
                currentPage: parseInt(currentPage),
                searchValue,
            })
        );
    }, [parPage, currentPage, searchValue]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            dispatch(
                get_services({
                    parPage: parseInt(parPage),
                    currentPage: parseInt(currentPage),
                    searchValue: "",
                })
            );
        }
    }, [successMessage, parPage, currentPage]);

    return (
        <section className="px-2 lg:px-7 pt-5  ">
            <div className=" bg-primary p-5 rounded-md text-white gap-[50px]">
                <div className=" flex gap-[10px] justify-end">
                    <div className="">
                        <Link
                            to={`/add-service`}
                            className="px-1 py-1 bg-[#895737] rounded-md font-bold flex cursor-pointer items-center gap-1"
                        >
                            <IoMdAdd className="text-[25px] " />
                        </Link>
                    </div>
                </div>

                {[1].length === 0 ? (
                    <div className="w-full p-4 bg-primary rounded-md">
                        <span className="flex items-center justify-center text-[20px] font-bold text-white">
                            No records
                        </span>
                    </div>
                ) : (
                    <div className="w-full p-4 bg-primary rounded-md">
                        <Search
                            setParPage={setParPage}
                            setSearchValue={setSearchValue}
                            searchValue={searchValue}
                        />

                        <div className="relative overflow-x-auto">
                            <table className="w-full  text-left text-[#d0d2d6]">
                                <thead className=" text-[#d0d2d6] uppercase border-b border-slate-700 text-center">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3 px-4 w-[5%]"
                                        >
                                            No
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3 px-4 w-[10%]"
                                        >
                                            Image
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3 px-4 w-[20%]"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3 px-4 w-[15%]"
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3 px-4 w-[15%]"
                                        >
                                            Discount
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3 px-4 w-[15%]"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3 px-4 w-[20%]"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {services.map((s, index) => (
                                        <tr
                                            key={s._id}
                                            className="border-b border-slate-700 text-center"
                                        >
                                            <td
                                                scope="row"
                                                className="py-2 px-4 font-medium whitespace-nowrap "
                                            >
                                                #{index + 1}
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-2 px-4 font-medium whitespace-nowrap "
                                            >
                                                <img
                                                    src={s.images?.[0]}
                                                    alt=""
                                                    className="w-[70px] h-[70px] object-cover"
                                                />
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-2 px-4 font-medium whitespace-nowrap "
                                            >
                                                {s.name}
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-2 px-4 font-medium whitespace-nowrap "
                                            >
                                                {formatPrice(s.price)}
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-2 px-4 font-medium whitespace-nowrap text-center"
                                            >
                                                {s.discount}%
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-3 px-1 "
                                            >
                                                <select
                                                    value={s.status}
                                                    onChange={(e) =>
                                                        handleChangeStatus(
                                                            s._id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="bg-transparent border focus:outline-none p-1 rounded-full mr-1"
                                                >
                                                    <option
                                                        className="text-black"
                                                        value="active"
                                                    >
                                                        Active
                                                    </option>
                                                    <option
                                                        className="text-black"
                                                        value="inactive"
                                                    >
                                                        Inactive
                                                    </option>
                                                </select>
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-2 px-4 font-medium whitespace-nowrap w-[20%]"
                                            >
                                                <div className="flex justify-center items-center gap-4">
                                                    <Link
                                                        to={`/update-service/${s._id}`}
                                                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                                                    >
                                                        <FaRegEdit />
                                                    </Link>
                                                    <Link
                                                        onClick={() => {
                                                            setIsModalOpen(
                                                                true
                                                            );
                                                            setDeleteServiceId(
                                                                s._id
                                                            );
                                                        }}
                                                        className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                                                    >
                                                        <AiFillDelete />
                                                    </Link>
                                                </div>
                                                {isModalOpen &&
                                                    deleteServiceId ===
                                                        s._id && (
                                                        <ModalConfirm
                                                            message="Are you sure you want to delete?"
                                                            onConfirm={
                                                                handleDelete
                                                            }
                                                            onCancel={
                                                                handleCancel
                                                            }
                                                        />
                                                    )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                            <div className="w-full justify-end flex mt-4 bottom-4 right-4 ">
                                {totalService <= parPage ? (
                                    ""
                                ) : (
                                    <Pagination
                                        pageNumber={currentPage}
                                        setPageNumber={setCurrentPage}
                                        totalItem={totalService}
                                        parPage={parPage}
                                        showItem={3}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;
