import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
    "order/place_order",
    async (
        {
            price,
            products,
            shipping_fee,
            items,
            shippingInfo,
            userId,
            navigate,
        },
        { rejectWithValue, fulfillWithValue }
    ) => {
        try {
            const { data } = await api.post("/place-order", {
                price,
                products,
                shipping_fee,
                items,
                shippingInfo,
                userId,
                navigate,
            });

            navigate("/payment", {
                state: {
                    price: price + shipping_fee,
                    items,
                    orderId: data.orderId,
                },
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const place_order_service = createAsyncThunk(
    "order/place_order_service",
    async (
        {
            price,
            service,
            userId,
            petType,
            startTime,
            endTime,
            serviceType,
            address,
            navigate,
            startDate,
            endDate,
            days,
        },
        { rejectWithValue, fulfillWithValue }
    ) => {
        try {
            const { data } = await api.post("/place-order-service", {
                price,
                service,
                userId,
                petType,
                startTime,
                endTime,
                serviceType,
                address,
                startDate,
                endDate,
                days,
            });

            navigate("/payment", {
                state: {
                    price: data.price,
                    orderServiceId: data.orderServiceId,
                    service: data.service,
                },
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//Service
export const get_order_service_by_user = createAsyncThunk(
    "order/get_order_by_user",
    async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(
                `/get-order-by-user/${customerId}/${status}`
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
        myOrders: [],
        myOrdersService: [],
        errorMessage: "",
        successMessage: "",
        loader: false,
        myOrder: {},
        myBookingServices: [],
        myBookingService: {},
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(place_order.pending, (state) => {
                state.loader = true;
            })
            .addCase(place_order.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
                state.errors = payload.errors || {};
            })
            .addCase(place_order.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(place_order_service.pending, (state) => {
                state.loader = true;
            })
            .addCase(place_order_service.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.message;
                // state.errors = payload.errors || {};
            })
            .addCase(place_order_service.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(
                get_order_service_by_user.fulfilled,
                (state, { payload }) => {
                    state.myOrdersService = payload.myOrdersService;
                }
            );
    },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
