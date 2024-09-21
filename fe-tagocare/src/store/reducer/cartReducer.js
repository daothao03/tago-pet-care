import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_to_cart = createAsyncThunk(
    "cart/add_to_cart",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/add-to-cart", info);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_cart = createAsyncThunk(
    "cart/get_cart",
    async (userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-cart/${userId}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const delete_cart_item = createAsyncThunk(
    "cart/delete_cart_item",
    async (productId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/delete-cart-item/${productId}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const inc_quantity_cart = createAsyncThunk(
    "cart/inc_quantity_cart",
    async (cart_id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/inc-quantity-cart/${cart_id}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const quantity_card_des = createAsyncThunk(
    "cart/quantity_card_des",
    async (cart_id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/des-quantity-cart/${cart_id}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const cartReducer = createSlice({
    name: "cart",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        carts: [],
        calculatePrice: 0,
        item_stock: 0,
        shipping_fee: 0,
        outOfStockProduct: [],
        item_outStock: 0,
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_to_cart.pending, (state) => {
                state.loader = true;
            })
            .addCase(add_to_cart.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
                state.errors = payload.errors || {};
            })
            .addCase(add_to_cart.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(delete_cart_item.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(inc_quantity_cart.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(quantity_card_des.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(get_cart.fulfilled, (state, { payload }) => {
                state.carts = payload.carts;
                state.calculatePrice = payload.price;
                state.item_stock = payload.item_stock;
                state.item_outStock = payload.item_outStock;
                state.shipping_fee = payload.shipping_fee;
                state.outOfStockProduct = payload.outOfStockProduct;
            });
    },
});

export const { messageClear } = cartReducer.actions;
export default cartReducer.reducer;
