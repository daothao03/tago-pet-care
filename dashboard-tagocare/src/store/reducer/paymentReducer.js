import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_caregiver_payment_details = createAsyncThunk(
    "payment/get_caregiver_payment_details",
    async (caregiverId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(
                `/payment/caregiver-payment-details/${caregiverId}`,
                {
                    withCredentials: true,
                }
            );
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const caregiver_request_withdraw = createAsyncThunk(
    "payment/caregiver_request_withdraw",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(
                `/payment/caregiver-request-withdraw`,
                info,
                {
                    withCredentials: true,
                }
            );
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_payment_request = createAsyncThunk(
    "payment/get_payment_request",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/payment/request`, {
                withCredentials: true,
            });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const confirm_payment_request = createAsyncThunk(
    "payment/confirm_payment_request",
    async (paymentId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(
                `/payment/request-confirm`,
                { paymentId },
                { withCredentials: true }
            );
            return fulfillWithValue(data);
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data);
        }
    }
);

export const paymentReducer = createSlice({
    name: "payment",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        pendingWithdraws: [],
        successWithdraws: [],
        totalAmount: 0,
        withdrawAmount: 0,
        pendingAmount: 0,
        availableAmount: 0,
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                get_caregiver_payment_details.fulfilled,
                (state, { payload }) => {
                    state.pendingWithdraws = payload.pendingWithdraws;
                    state.successWithdraws = payload.successWithdraws;
                    state.totalAmount = payload.totalAmount;
                    state.withdrawAmount = payload.withdrawAmount;
                    state.availableAmount = payload.availableAmount;
                    state.pendingAmount = payload.pendingAmount;
                }
            )
            .addCase(caregiver_request_withdraw.pending, (state) => {
                state.loader = true;
            })
            .addCase(
                caregiver_request_withdraw.rejected,
                (state, { payload }) => {
                    state.loader = false;
                    state.errorMessage = payload.message;
                }
            )
            .addCase(
                caregiver_request_withdraw.fulfilled,
                (state, { payload }) => {
                    state.loader = false;
                    state.successMessage = payload.message;
                    state.pendingWithdraws = [
                        ...state.pendingWithdraws,
                        payload.withdrawal,
                    ];
                    state.availableAmount =
                        state.availableAmount - payload.withdrawal.amount;
                    state.pendingAmount = payload.withdrawal.amount;
                }
            )
            .addCase(get_payment_request.fulfilled, (state, { payload }) => {
                state.pendingWithdraws = payload.withdrawalRequest;
            })
            .addCase(confirm_payment_request.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(confirm_payment_request.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.message;
            })
            .addCase(
                confirm_payment_request.fulfilled,
                (state, { payload }) => {
                    const temp = state.pendingWithdraws.filter(
                        (r) => r._id !== payload.payment._id
                    );
                    state.loader = false;
                    state.successMessage = payload.message;
                    state.pendingWithdraws = temp;
                }
            );
    },
});

export const { messageClear } = paymentReducer.actions;
export default paymentReducer.reducer;
