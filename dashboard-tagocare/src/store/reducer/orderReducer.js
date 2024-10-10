import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_caregiver_orders = createAsyncThunk(
    "caregiver/get_caregiver_orders",
    async (
        { parPage, currentPage, searchValue, caregiverId },
        { rejectWithValue, fulfillWithValue }
    ) => {
        try {
            const { data } = await api.get(
                `/caregiver/get-caregiver-orders/${caregiverId}?currentPage=${currentPage}&&searchValue=${searchValue}&&parPage=${parPage}`,
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

export const get_orderProduct_detail = createAsyncThunk(
    "caregiver/get_orderProduct_detail",
    async (orderId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(
                `/caregiver/get-orderProduct-detail/${orderId}`,
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

export const get_caregiver_orders_service = createAsyncThunk(
    "caregiver/get_caregiver_orders_service",
    async (
        { parPage, currentPage, searchValue, caregiverId },
        { rejectWithValue, fulfillWithValue }
    ) => {
        try {
            const { data } = await api.get(
                `/caregiver/get-caregiver-orders-service/${caregiverId}?currentPage=${currentPage}&&searchValue=${searchValue}&&parPage=${parPage}`,
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

export const orderReducer = createSlice({
    name: "order",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        orders: [],
        order: {},
        totalOrder: 0,
        ordersService: [],
        orderService: {},
        totalOrderService: 0,
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_caregiver_orders.fulfilled, (state, { payload }) => {
                state.totalOrder = payload.totalOrder;
                state.orders = payload.orders;
            })
            .addCase(
                get_orderProduct_detail.fulfilled,
                (state, { payload }) => {
                    state.order = payload.order;
                }
            )
            .addCase(
                get_caregiver_orders_service.fulfilled,
                (state, { payload }) => {
                    state.ordersService = payload.orders;
                    state.totalOrderService = payload.totalOrderService;
                }
            );

        // .addCase(
        //     seller_order_status_update.rejected,
        //     (state, { payload }) => {
        //         state.errorMessage = payload.message;
        //     }
        // )
        // .addCase(
        //     seller_order_status_update.fulfilled,
        //     (state, { payload }) => {
        //         state.successMessage = payload.message;
        //     }
        // );
    },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
