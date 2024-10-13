import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { BiError } from "react-icons/bi";

const load = async () => {
    return await loadStripe(
        "pk_test_51Q8NjKFNCE4AaJd48u6WphiPp1GqEtbI29b3pPAKoTOs0pESG7hFTLhznQdBTOok3lztfoCxDqFiu00P8gzzrLnM00BeJqcrSq"
    );
};

const ConfirmOrder = () => {
    const [loader, setLoader] = useState(true);
    const [stripe, setStripe] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!stripe) {
            return;
        }
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        if (!clientSecret) {
            return;
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("succeeded");
                    break;
                case "processing":
                    setMessage("processing");
                    break;
                case "requires_payment_method":
                    setMessage("failed");
                    break;
                default:
                    setMessage("failed");
            }
        });
    }, [stripe]);

    const get_load = async () => {
        const tempStripe = await load();

        setStripe(tempStripe);
    };

    useEffect(() => {
        get_load();
    }, []);

    const update_payment = async () => {
        const orderId = localStorage.getItem("orderId");
        if (orderId) {
            try {
                console.log("call api");
                await axios.get(
                    `http://localhost:5000/api/order/confirm/${orderId}`
                );
                console.log("end call api");
                localStorage.removeItem("orderId");
                setLoader(false);
            } catch (error) {
                console.log(error.message.data);
            }
        }
    };

    useEffect(() => {
        if (message === "succeeded") {
            console.log("start update");
            update_payment();
            console.log("end update");
        }
    }, [message]);

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
            {message === "failed" || message === "processing" ? (
                <>
                    <div>
                        <BiError className="text-[100px] text-red-700" />
                    </div>
                    <Link
                        className="px-5 py-2 bg-green-500 rounded-sm text-white"
                        to="/dashboard/my-orders"
                    >
                        Back to Dashboard
                    </Link>
                </>
            ) : message === "succeeded" ? (
                loader ? (
                    <FadeLoader />
                ) : (
                    <>
                        <div className="border-[8px] rounded-full border-green-700 p-5">
                            <FaCheck className="text-[100px] text-green-700" />
                        </div>
                        <Link
                            className="px-5 py-2 bg-green-500 rounded-sm text-white"
                            to="/dashboard/my-orders"
                        >
                            Back to Dashboard
                        </Link>
                    </>
                )
            ) : (
                <FadeLoader />
            )}
        </div>
    );
};

export default ConfirmOrder;
