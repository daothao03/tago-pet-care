import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./../components/Search";
import { get_caregiver_orders } from "../../store/reducer/orderReducer";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { formatPrice } from "./../../utils/utils";
import Pagination from "./../components/Pagination";

const PetProductOrders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(10);

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { orders, totalOrder } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(
            get_caregiver_orders({
                parPage: parseInt(parPage),
                currentPage: parseInt(currentPage),
                searchValue,
                caregiverId: userInfo._id,
            })
        );
    }, [userInfo._id]);

    return (
        <div className="px-2 lg:px-7 pt-5">
            <h1 className="text-[#000000] font-semibold text-[2rem] mb-3">
                Orders
            </h1>

            <div className="w-full p-4 bg-primary rounded-md">
                <Search
                    setParPage={setParPage}
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                />

                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left text-[#d0d2d6]">
                        <thead className=" text-[#d0d2d6] uppercase border-b border-slate-700">
                            <tr>
                                <th scope="col" className="py-3 px-4">
                                    Order Id
                                </th>
                                <th scope="col" className="py-3 px-4">
                                    Price
                                </th>
                                <th scope="col" className="py-3 px-4">
                                    Payment Status
                                </th>
                                <th scope="col" className="py-3 px-4">
                                    Order Status
                                </th>
                                <th scope="col" className="py-3 px-4">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((d) => (
                                <tr key={d._id}>
                                    <td
                                        scope="row"
                                        className="py-1 px-4 font-medium whitespace-nowrap"
                                    >
                                        #{d.orderId}
                                    </td>
                                    <td
                                        scope="row"
                                        className="py-1 px-4 font-medium whitespace-nowrap"
                                    >
                                        {formatPrice(d.price)}
                                    </td>
                                    <td
                                        scope="row"
                                        className="py-1 px-4 font-medium whitespace-nowrap"
                                    >
                                        {d.payment_status}
                                    </td>
                                    <td
                                        scope="row"
                                        className="py-1 px-4 font-medium whitespace-nowrap"
                                    >
                                        {d.delivery_status}
                                    </td>
                                    <td
                                        scope="row"
                                        className="py-1 px-4 font-medium whitespace-nowrap"
                                    >
                                        <div className="flex justify-start items-center gap-4">
                                            <Link
                                                to={`/caregiver/order-detail/${d._id}`}
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

                {totalOrder <= parPage ? (
                    ""
                ) : (
                    <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={totalOrder}
                            parPage={parPage}
                            showItem={3}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PetProductOrders;
