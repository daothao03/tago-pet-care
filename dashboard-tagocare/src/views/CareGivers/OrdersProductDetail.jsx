import { useEffect, useState } from "react";
import { formatPrice } from "../../utils/utils";
import { get_orderProduct_detail } from "../../store/reducer/orderReducer";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const OrdersProductDetail = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { order } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(get_orderProduct_detail(orderId));
    }, [orderId]);

    const [status, setStatus] = useState("");

    useEffect(() => {
        setStatus(order?.delivery_status);
    }, [order]);

    // const status_update = (e) => {
    //     dispatch(
    //         seller_order_status_update({
    //             orderId,
    //             info: { status: e.target.value },
    //         })
    //     );
    //     setStatus(e.target.value);
    // };

    // useEffect(() => {
    //     if (successMessage) {
    //         toast.success(successMessage);
    //         dispatch(messageClear());
    //     }
    //     if (errorMessage) {
    //         toast.error(errorMessage);
    //         dispatch(messageClear());
    //     }
    // }, [successMessage, errorMessage]);

    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full p-4 bg-primary rounded-md">
                <div className="flex justify-between items-center p-4">
                    <Link
                        to={"/caregiver/pet-product-orders"}
                        className="text-black flex gap-3 items-center font-bold hover:translate-x-2 no-print"
                    >
                        <FaArrowAltCircleLeft /> Back
                    </Link>
                    <div>
                        <select
                            // onChange={status_update}
                            value={status}
                            name=""
                            id=""
                            className="px-4 py-2 focus:border-indigo-500 outline-none bg-third border border-slate-700 rounded-md text-[#d0d2d6]"
                        >
                            <option value="pending">pending</option>
                            <option value="processing">processing</option>
                            <option value="placed">placed</option>
                            <option value="cancelled">cancelled</option>
                        </select>
                    </div>
                </div>

                <div className="p-4 text-[#d0d2d6]">
                    <div className="grid grid-cols-2 gap-[30px]">
                        <div>
                            <div className="flex gap-2 ">
                                <h2>#{order._id}</h2>
                                <span>{order.date}</span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <h2 className="pb-2 font-semibold">
                                    Deliver To : {order.shippingInfo?.name}-{" "}
                                    {order.shippingInfo?.address}
                                </h2>
                            </div>
                            <div className="flex justify-start items-center gap-3">
                                <h2>Payment Status: </h2>
                                <span>{order.payment_status}</span>
                            </div>
                        </div>
                        <div></div>
                    </div>

                    <div className="overflow-x-auto mt-3">
                        <table className="min-w-full border border-gray-300 text-white text-center">
                            <thead className="bg-third ">
                                <tr className="border-b ">
                                    <th className="py-2 text-center px-4  border border-gray-300">
                                        Product
                                    </th>
                                    <th className="py-2 text-center px-4  border border-gray-300">
                                        Quantity
                                    </th>
                                    <th className="py-2 text-center px-4  border border-gray-300">
                                        Image
                                    </th>
                                    <th className="py-2 text-center px-4  border border-gray-300">
                                        Price
                                    </th>
                                    <th className="py-2 text-center px-4  border border-gray-300">
                                        Total Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.products?.map((p) => (
                                    <tr key={p._id} className="border-b">
                                        <td className="py-4 px-4  border border-gray-300">
                                            {p.name}
                                        </td>
                                        <td className="py-4 px-4  border border-gray-300">
                                            {p.quantity}
                                        </td>
                                        <td className="py-4 px-4  flex justify-center">
                                            <img
                                                className="w-[50px] h-[50px] object-cover"
                                                src={p.images[0]}
                                                alt={p.name}
                                            />
                                        </td>
                                        <td className="py-4 px-4  border border-gray-300">
                                            {p.discount
                                                ? formatPrice(
                                                      p.price *
                                                          (1 - p.discount / 100)
                                                  )
                                                : formatPrice(p.price)}
                                        </td>
                                        <td className="py-4 px-4  border border-gray-300">
                                            {formatPrice(
                                                p.price *
                                                    (1 -
                                                        (p.discount || 0) /
                                                            100) *
                                                    p.quantity
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-4 text-white text-[20px] font-bold">
                        <span>Total : {formatPrice(order.price)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersProductDetail;
