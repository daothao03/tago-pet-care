import { Link } from "react-router-dom";

const OrderDetails = () => {
    return (
        <div className="bg-white p-5">
            <h2 className="text-slate-600 font-semibold">
                #1 , <span className="pl-1">30/8/2024</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                    <h2 className="text-slate-600 font-semibold font-sans">
                        Deliver To : Thao
                    </h2>
                    <p>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-2 rounded">
                            Home
                        </span>
                        <span className="text-slate-600 text-sm">
                            Dai Hung, Khoai Chau, Hung Yen
                        </span>
                    </p>
                    <p className="text-slate-600 text-md font-semibold">
                        Email To daothao.gau2003@gmail.com
                    </p>
                </div>

                <div className="text-slate-600">
                    <h2 className="font-mono">Price : $30 Include Shipping</h2>
                    <p className="font-mono">
                        Payment Status :
                        <span
                        // className={`py-[1px] text-xs px-3 ${
                        //     myOrder.payment_status === "paid"
                        //         ? "bg-green-300 text-green-800"
                        //         : "bg-red-300 text-red-800"
                        // } rounded-md`}
                        >
                            pending
                        </span>
                    </p>

                    <p className="font-mono">
                        Order Status :
                        <span
                        // className={`py-[1px] text-xs px-3 ${
                        //     myOrder.delivery_status === "paid"
                        //         ? "bg-green-300 text-green-800"
                        //         : "bg-red-300 text-red-800"
                        // } rounded-md`}
                        >
                            pending
                        </span>
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-slate-600 text-lg pb-2 font-sans font-bold">
                    Order Products
                </h2>
                <div className="flex gap-5 flex-col">
                    <div>
                        <div className="flex gap-5 justify-between items-center text-slate-600">
                            <div className="flex gap-2 items-center">
                                <img
                                    className="w-[85px] h-[85px] object-contain"
                                    src={"p.images[0]"}
                                    alt=""
                                />
                                <div className="flex text-sm flex-col justify-start items-start">
                                    <Link className="line-clamp-1">name</Link>
                                    <p>
                                        <span>Brand : brand</span>
                                    </p>
                                    <p>
                                        <span>Quantity : quantity</span>
                                    </p>
                                </div>
                            </div>

                            <div className="pl-4 flex flex-col">
                                <h2 className="text-md text-green-800">$30</h2>
                                <p className="line-through">$25</p>
                                <p>-5%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
