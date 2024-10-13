import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import PropTypes from "prop-types";

const stripePromise = loadStripe(
    "pk_test_51Q8NjKFNCE4AaJd48u6WphiPp1GqEtbI29b3pPAKoTOs0pESG7hFTLhznQdBTOok3lztfoCxDqFiu00P8gzzrLnM00BeJqcrSq"
);

const Stripe = ({ price, orderId }) => {
    const [clientSecret, setClientSecret] = useState("");

    const apperance = {
        theme: "stripe",
    };

    const options = {
        apperance,
        clientSecret,
    };

    const create_payment = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/payment/create-payment",
                { price },
                { withCredentials: true }
            );

            setClientSecret(data.clientSecret);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div className="mt-4 flex justify-center">
            {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm orderId={orderId} />
                </Elements>
            ) : (
                <button
                    onClick={create_payment}
                    className="flex text-[13px] text-white cursor-pointer items-center gap-2 font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436]"
                >
                    Start Payment
                </button>
            )}
        </div>
    );
};

Stripe.propTypes = {
    price: PropTypes.number.isRequired,
    orderId: PropTypes.string.isRequired,
};

export default Stripe;
