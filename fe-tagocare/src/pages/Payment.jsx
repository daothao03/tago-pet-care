import { useState } from "react";
// import { useLocation } from "react-router-dom";
import HeaderPageCommon from "../components/HeaderPageCommon";
import Stripe from "./Stripe";
import Footer from "../layout/Footer";
const Payment = () => {
    // const {
    //     state: { price, items, orderId },
    // } = useLocation();

    const [paymentMethod, setPaymentMethod] = useState("stripe");

    return (
        <div>
            <div className="relative">
                <HeaderPageCommon desc="Payment" showBookNow={false} />
            </div>

            <section className="absolute top-[400px] left-[100px] grid grid-cols-2  w-[80%]">
                <div>
                    <div className="flex gap-[20px]">
                        <div
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
                            <span>Stripe</span>
                        </div>

                        <div
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
                        </div>
                    </div>

                    {paymentMethod === "stripe" && (
                        <div>
                            <Stripe
                                // orderId={orderId}
                                // price={price}
                                orderId={1}
                                price={1}
                            />
                        </div>
                    )}
                    {paymentMethod === "cod" && (
                        <div className="w-full px-2 py-5 shadow-sm">
                            <button className="px-10 py-[6px] rounded-tl-3xl rounded-tr-3xl hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white">
                                Pay Now
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    <div className="pl-2 md:pl-0 md:mb-0">
                        <div className="bg-white shadow p-5 flex flex-col gap-3">
                            <h2 className="font-bold font-pacifico text-[21px]">
                                Order Summary
                            </h2>
                            <div className="flex justify-between items-center">
                                <span>
                                    <strong className="font-bold">{3}</strong>{" "}
                                    Items and Shipping Fee Included{" "}
                                </span>
                                <span>$30 </span>
                            </div>
                            <div className="flex justify-between items-center font-semibold">
                                <span>Total Amount </span>
                                <span className="text-[28px] text-green-600">
                                    $30
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};
export default Payment;
