import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    active_stripe_connect_account,
    messageClear,
} from "../store/reducer/caregiverReducer";
import { FadeLoader } from "react-spinners";
import { FaCheck } from "react-icons/fa";
import { BiError } from "react-icons/bi";

const Success = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loader, successMessage, errorMessage } = useSelector(
        (state) => state.caregiver
    );

    const queryParams = new URLSearchParams(window.location.search);
    const activeCode = queryParams.get("activeCode");

    useEffect(() => {
        dispatch(active_stripe_connect_account(activeCode));
    }, [activeCode]);

    const redirect = () => {
        dispatch(messageClear());
        navigate("/");
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
            {loader ? (
                <FadeLoader />
            ) : errorMessage ? (
                <>
                    <div>
                        <BiError className="text-[100px] text-red-700" />
                    </div>
                    <button
                        onClick={redirect}
                        className="px-5 py-2 bg-red-700 rounded-sm text-white"
                    >
                        Back to Dashboard
                    </button>
                </>
            ) : (
                successMessage && (
                    <>
                        <div className="border-[8px] rounded-full border-green-700 p-5">
                            <FaCheck className="text-[100px] text-green-700" />
                        </div>
                        <button
                            onClick={redirect}
                            className="px-5 py-2 bg-green-700 rounded-sm text-white"
                        >
                            Back to Dashboard
                        </button>
                    </>
                )
            )}
        </div>
    );
};

export default Success;
