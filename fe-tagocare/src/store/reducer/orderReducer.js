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

export const orderReducer = createSlice({
    name: "order",
    initialState: {
        myOrders: [],
        errorMessage: "",
        successMessage: "",
        loader: false,
        myOrder: {},
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
            });
    },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
