import { FaArrowAltCircleLeft } from "react-icons/fa";
import { formatDate, formatPrice } from "../../utils/utils";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { get_orderService_detail } from "../../store/reducer/orderReducer";

const OrderServiceDetail = () => {
    const { orderServiceId } = useParams();
    console.log(orderServiceId);
    const dispatch = useDispatch();
    const { orderService } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(get_orderService_detail(orderServiceId));
    }, [orderServiceId]);

    const [status, setStatus] = useState("");

    useEffect(() => {
        setStatus(orderService?.delivery_status);
    }, [orderService]);

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
                                <h2>#{orderService._id}</h2>
                            </div>

                            <div className="flex flex-col gap-1">
                                <h2 className="pb-2 font-semibold">
                                    Customer : ...
                                </h2>
                            </div>
                            <div className="flex justify-start items-center gap-3">
                                <h2>Payment Status: </h2>
                                <span>{orderService.payment_status}</span>
                            </div>
                        </div>
                        <div></div>
                    </div>

                    <div className="overflow-x-auto mt-3">
                        <table className="min-w-full border border-gray-300 text-white text-center">
                            <thead className="bg-third ">
                                <tr className="border-b ">
                                    <th className="py-2 text-center px-4  border border-gray-300">
                                        Service
                                    </th>
                                    <th className="py-2 text-center px-4  border border-gray-300">
                                        Start Time
                                    </th>
                                    <th className="py-2 text-center px-4  border border-gray-300">
                                        End Time
                                    </th>
                                    <th className="py-2 text-center px-4  border border-gray-300">
                                        Image
                                    </th>
                                    <th className="py-2 text-center px-4  border border-gray-300">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    key={orderService.service?._id}
                                    className="border-b"
                                >
                                    <td className="py-4 px-4  border border-gray-300">
                                        {orderService.service?.name}
                                    </td>
                                    <td className="py-4 px-4  border border-gray-300">
                                        {orderService.startDate} -
                                        {orderService.startTime}
                                    </td>
                                    <td className="py-4 px-4  border border-gray-300">
                                        {orderService.endDate} -
                                        {orderService.endTime}
                                    </td>
                                    <td className="py-4 px-4  flex justify-center">
                                        <img
                                            className="w-[50px] h-[50px] object-cover"
                                            src={
                                                orderService.service?.images[0]
                                            }
                                            alt={orderService.service?.name}
                                        />
                                    </td>
                                    <td className="py-4 px-4  border border-gray-300">
                                        {orderService.service?.discount
                                            ? formatPrice(
                                                  orderService.service?.price *
                                                      (1 -
                                                          orderService.service
                                                              ?.discount /
                                                              100)
                                              )
                                            : formatPrice(
                                                  orderService.service?.price
                                              )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-4 text-white text-[20px] font-bold">
                        <span>Total : {formatPrice(orderService.price)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderServiceDetail;
