import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Search from "./../components/Search";
import { useEffect, useState } from "react";
import Pagination from "./../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { caregiver_active } from "../../store/reducer/caregiverReducer";

const Caregiver = () => {
    const dispatch = useDispatch();

    const { caregivers, totalCaregiver } = useSelector(
        (state) => state.caregiver
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);

    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            currentPage: parseInt(currentPage),
            searchValue,
        };
        dispatch(caregiver_active(obj));
    }, [parPage, currentPage, searchValue]);

    return (
        <div className="px-2 lg:px-7 pt-5">
            <h1 className="text-[20px] font-bold mb-3"> Caregivers</h1>

            {caregivers.length === 0 ? (
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
                            <thead className=" text-[#d0d2d6] uppercase border-b border-slate-700">
                                <tr>
                                    <th scope="col" className="py-3 px-4">
                                        No
                                    </th>
                                    <th scope="col" className="py-3 px-4">
                                        Name
                                    </th>
                                    <th scope="col" className="py-3 px-4">
                                        Email
                                    </th>
                                    <th scope="col" className="py-3 px-4">
                                        Payment Status
                                    </th>
                                    <th scope="col" className="py-3 px-4">
                                        Status
                                    </th>
                                    <th scope="col" className="py-3 px-4">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {caregivers.map((c) => (
                                    <tr
                                        key={c._id}
                                        className="border-b border-slate-700"
                                    >
                                        <td
                                            scope="row"
                                            className="py-2 px-4 font-medium whitespace-nowrap"
                                        >
                                            #{c._id}
                                        </td>
                                        <td
                                            scope="row"
                                            className="py-2 px-4 font-medium whitespace-nowrap"
                                        >
                                            {c.name}
                                        </td>
                                        <td
                                            scope="row"
                                            className="py-2 px-4 font-medium whitespace-nowrap"
                                        >
                                            {c.email}
                                        </td>
                                        <td
                                            scope="row"
                                            className="py-2 px-4 font-medium whitespace-nowrap"
                                        >
                                            <span>{c.payment}</span>
                                        </td>

                                        <td
                                            scope="row"
                                            className="py-2 px-4 font-medium whitespace-nowrap"
                                        >
                                            <span>{c.status}</span>
                                        </td>

                                        <td
                                            scope="row"
                                            className="py-2 px-4 font-medium whitespace-nowrap"
                                        >
                                            <div className="flex justify-start items-center gap-4">
                                                <Link
                                                    to={`/admin/caregiver/caregiver-details/${c._id}`}
                                                    className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                                                >
                                                    <FaEye />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                        <div className="w-full justify-end flex mt-4 bottom-4 right-4 ">
                            {totalCaregiver <= parPage ? (
                                ""
                            ) : (
                                <Pagination
                                    pageNumber={currentPage}
                                    setPageNumber={setCurrentPage}
                                    totalItem={totalCaregiver}
                                    parPage={parPage}
                                    showItem={3}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Caregiver;
