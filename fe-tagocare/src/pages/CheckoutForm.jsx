import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import PropTypes from "prop-types";

const CheckoutForm = ({ orderId }) => {
    localStorage.setItem("orderId", orderId);
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const paymentElementOptions = {
        layout: "tabs",
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5174/order/confirm",
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An Unexpected error occured");
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={submit} id="payment-form">
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement
                id="payment-element"
                options={paymentElementOptions}
            />

            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="flex text-[13px] mt-8 text-white cursor-pointer items-center gap-2 font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436]"
            >
                <span id="button-text">
                    {isLoading ? <div>Loading...</div> : "Pay Now"}
                </span>
            </button>

            {message && <div>{message}</div>}
        </form>
    );
};

CheckoutForm.propTypes = {
    orderId: PropTypes.string.isRequired,
};

export default CheckoutForm;
