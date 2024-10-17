import Footer from "../layout/Footer";
import { formatPrice } from "../utils/utils";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import HeaderPageCommon from "../components/HeaderPageCommon";
import Stripe from "./Stripe";

const PaymentProduct = () => {
    const {
        state: { price, orderId, products },
    } = useLocation();

    const [paymentMethod, setPaymentMethod] = useState("stripe");

    return (
        <div>
            <div className="relative">
                <HeaderPageCommon
                    showBookNow={false}
                    title={""}
                    desc={"Payment"}
                />
            </div>

            {/* <section className="absolute top-[400px] left-[100px] grid grid-cols-2 gap-[100px]  w-[80%]"> */}
            <section className="container grid grid-cols-2 gap-[100px] ">
                {/* <div className="flex justify-center flex-col items-center">
                    <img
                        src={service.images?.[0]}
                        alt=""
                        className="object-cover rounded-[50px] w-[400px] "
                    />
                    <div className="mt-10">
                        <span>{service.name}</span>
                        <span className="font-bold">
                            Time: {service.complete_time} minutes
                        </span>

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
                </div> */}
                {/* {paymentMethod === "cod" && (
                        <div className="w-full px-2 py-5 shadow-sm">
                            <button className="px-10 py-[6px] rounded-tl-3xl rounded-tr-3xl hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white">
                                Pay Now
                            </button>
                        </div>
                    )} */}
                <div>
                    <div className="pl-2 md:pl-0 md:mb-0">
                        {/* bg-white shadow */}
                        <div className=" p-5 flex flex-col gap-3">
                            <h2 className="font-bold font-pacifico text-[21px]">
                                Order Summary
                            </h2>

                            <div className="flex justify-between items-center font-semibold">
                                <span>Total Amount </span>
                                <span className="text-[28px] font-bold text-green-600">
                                    {formatPrice(price)}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-[20px]">
                            {/* <div
                                onClick={() => setPaymentMethod("stripe")}
                                className={`rounded-full cursor-pointer px-12 border-[2px] text-[17px] ${
                                    paymentMethod === "stripe"
                                        ? "bg-[#ed6436] text-white"
                                        : "border-[#ed6436] bg-white text-[#ed6436]"
                                } flex flex-col gap-[3px] justify-center items-center`}
                            >
                                <img
                                    src="http://localhost:3000/images/payment/stripe.png"
                                    alt=""
                                />
                                <span>Payment method: Stripe</span>
                            </div> */}

                            {/* <div
                            onClick={() => setPaymentMethod("cod")}
                            className={`rounded-full cursor-pointer px-12 border-[2px] text-[17px] ${
                                paymentMethod === "cod"
                                    ? "bg-[#ed6436] text-white"
                                    : "border-[#ed6436] bg-white text-[#ed6436]"
                            } flex flex-col gap-[3px] justify-center items-center`}
                        >
                            <img
                                src="http://localhost:3000/images/payment/cod.jpg"
                                alt=""
                            />
                            <span>COD</span>
                        </div> */}
                            <div
                                onClick={() => setPaymentMethod("stripe")}
                                className={`px-5 rounded-full cursor-pointer text-[17px] flex flex-col gap-[3px] justify-center items-center`}
                            >
                                <img
                                    src="http://localhost:3000/images/payment/stripe.png"
                                    alt=""
                                />
                                <div>
                                    <span className="font-semibold">
                                        Payment method:
                                    </span>
                                    <div className="flex gap-[10px] ml-[60px]">
                                        <input
                                            checked
                                            type="radio"
                                            name=""
                                            id=""
                                        />
                                        <label htmlFor="">Stripe</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {paymentMethod === "stripe" && (
                            <div>
                                <Stripe orderId={orderId} price={price} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default PaymentProduct;
