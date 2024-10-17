import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { get_order_product_by_user } from "../../store/reducer/orderReducer";
import { formatPrice } from "../../utils/utils";

const MyOrderProduct = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { myOrdersProduct } = useSelector((state) => state.order);

    const [state, setState] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(
            get_order_product_by_user({
                customerId: userInfo.id,
                status: state,
            })
        );
    }, [userInfo]);

    const redirect = (order) => {
        navigate("/payment-product", {
            state: {
                price: order.price,
                orderId: order._id,
                products: order.products,
            },
        });
    };

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-600">
                    My Orders Products
                </h2>
                <select
                    className="outline-none px-3 py-1 border rounded-md text-slate-600"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="pt-4">
                <div className="relative overflow-x-auto rounded-md">
                    {myOrdersProduct.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Order Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Payment Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Service Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {myOrdersProduct.map((o, index) => (
                                    <tr
                                        key={o._id}
                                        className="bg-white border-b"
                                    >
                                        <td
                                            scope="row"
                                            className="px-6 py-4 font-medium whitespace-nowrap"
                                        >
                                            #{index + 1}
                                        </td>
                                        <td
                                            scope="row"
                                            className="px-6 py-4 font-medium whitespace-nowrap"
                                        >
                                            {formatPrice(o.price)}
                                        </td>
                                        <td
                                            scope="row"
                                            className="px-6 py-4 font-medium whitespace-nowrap"
                                        >
                                            {o.payment_status}
                                        </td>
                                        <td
                                            scope="row"
                                            className="px-6 py-4 font-medium whitespace-nowrap"
                                        >
                                            {o.delivery_status}
                                        </td>
                                        <td
                                            scope="row"
                                            className="px-6 py-4 font-medium whitespace-nowrap"
                                        >
                                            <Link
                                                to={`/dashboard/order/details/1`}
                                            >
                                                <span className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded">
                                                    View
                                                </span>
                                            </Link>

                                            {o.payment_status !== "paid" && (
                                                <span
                                                    onClick={() => redirect(o)}
                                                    className="bg-green-200 cursor-pointer text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded"
                                                >
                                                    Pay Now
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <span className="flex justify-center items-center font-bold text-[20px]">
                            {" "}
                            No records
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOrderProduct;
