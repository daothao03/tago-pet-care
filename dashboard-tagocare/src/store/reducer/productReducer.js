import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_product = createAsyncThunk(
    "product/add_product",
    async (formData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/add-product`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const update_product = createAsyncThunk(
    "product/update_product",
    async (formData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/update-product`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const delete_product = createAsyncThunk(
    "product/delete_product",
    async (productId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/delete-product/${productId}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_product_id = createAsyncThunk(
    "product/get_product_id",
    async (productId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-product-id/${productId}`, {
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_product = createAsyncThunk(
    "product/get_product",
    async (
        { parPage, currentPage, searchValue },
        { rejectWithValue, fulfillWithValue }
    ) => {
        try {
            const { data } = await api.get(
                `/get-products?parPage=${parPage}&&currentPage=${currentPage}&&searchValue=${searchValue}`,
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

export const update_product_status = createAsyncThunk(
    "product/update_product_status",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put("/update-product-status", info, {
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const productReducer = createSlice({
    name: "product",
    initialState: {
        loader: false,
        successMessage: "",
        errorMessage: "",
        errors: {
            name: "",
            category: "",
            brand: "",
            price: "",
            stock: "",
            discount: "",
            short_description: "",
            long_description: "",
            images: "",
        },
        product: "",
        products: [],
        totalProduct: 0,
        categoryByProductId: "",
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_product.pending, (state) => {
                state.loader = true;
            })
            .addCase(add_product.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
                state.errors = payload.errors;
            })
            .addCase(add_product.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(update_product.pending, (state) => {
                state.loader = true;
            })
            .addCase(update_product.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
                state.errors = payload.errors;
            })
            .addCase(update_product.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(delete_product.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(get_product.fulfilled, (state, { payload }) => {
                state.products = payload.products;
                state.totalProduct = payload.totalProduct;
            })
            .addCase(update_product_status.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(get_product_id.fulfilled, (state, { payload }) => {
                state.product = payload.product;
                state.categoryByProductId = payload.categoryByProductId;
            });
    },
});

export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
