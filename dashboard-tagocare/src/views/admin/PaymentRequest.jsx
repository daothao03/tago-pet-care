import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import moment from "moment";
import PropTypes from "prop-types";
import {
    confirm_payment_request,
    get_payment_request,
    messageClear,
} from "../../store/reducer/paymentReducer";
import { formatDate } from "../../utils/utils";
import toast from "react-hot-toast";

function handleOnWheel({ deltaY }) {
    console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
));

outerElementType.displayName = "OuterElementType";

const PaymentRequest = () => {
    const dispatch = useDispatch();
    const { loader, successMessage, errorMessage, pendingWithdraws } =
        useSelector((state) => state.payment);

    const [paymentId, setPaymentId] = useState("");

    useEffect(() => {
        dispatch(get_payment_request());
    }, []);

    const confirm_request = (id) => {
        setPaymentId(id);
        dispatch(confirm_payment_request(id));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage]);

    const Row = ({ index, style }) => {
        return (
            <div style={style} className="flex text-sm text-white font-medium">
                <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
                <div className="w-[25%] p-2 whitespace-nowrap">
                    ${pendingWithdraws[index]?.amount}
                </div>
                <div className="w-[25%] p-2 whitespace-nowrap">
                    <span className="py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm">
                        {pendingWithdraws[index]?.status}
                    </span>
                </div>
                <div className="w-[25%] p-2 whitespace-nowrap">
                    {/* {moment(pendingWithdraws[index]?.createdAt).format("LL")} */}
                    {formatDate(pendingWithdraws[index]?.createdAt)}
                </div>
                <div className="w-[25%] p-2 whitespace-nowrap">
                    <button
                        onClick={() =>
                            confirm_request(pendingWithdraws[index]?._id)
                        }
                        className="bg-green-800 shadow-lg hover:shadow-green-500/50 px-3 py-[2px cursor-pointer text-white rounded-sm text-sm]"
                    >
                        {loader && paymentId === pendingWithdraws[index]?._id
                            ? "loading.."
                            : "Confirm"}
                    </button>
                </div>
            </div>
        );
    };

    Row.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    };

    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full p-4 bg-primary rounded-md">
                <h2 className="text-xl font-medium pb-5 text-[#d0d2d6]">
                    Withdrawal Request
                </h2>
                <div className="w-full">
                    <div className="w-full overflow-x-auto">
                        {pendingWithdraws.length > 0 ? (
                            <>
                                <div className="flex bg-second uppercase text-xs font-bold min-w-[340px] rounded-md">
                                    <div className="w-[25%] p-2"> No </div>
                                    <div className="w-[25%] p-2"> Amount </div>
                                    <div className="w-[25%] p-2"> Status </div>
                                    <div className="w-[25%] p-2"> Date </div>
                                    <div className="w-[25%] p-2"> Action </div>
                                </div>
                                {
                                    <List
                                        style={{ minWidth: "340px" }}
                                        className="List"
                                        height={350}
                                        itemCount={pendingWithdraws.length}
                                        itemSize={35}
                                        outerElementType={outerElementType}
                                    >
                                        {Row}
                                    </List>
                                }
                            </>
                        ) : (
                            <span className="flex justify-center text-white text-[20px] font-bold">
                                No records
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentRequest;
