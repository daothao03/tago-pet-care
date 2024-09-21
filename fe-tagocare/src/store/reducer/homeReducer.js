import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_categories = createAsyncThunk(
    "product/get_categories",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/home/get-categories");

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const price_range_product = createAsyncThunk(
    "product/price_range_product",
    async (type, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(
                `/home/price-range-product?type=${type}`
            );
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.message);
        }
    }
);

export const query_products = createAsyncThunk(
    "product/query_products",
    async (query, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(
                `/home/query-products?category=${query.category}&&lowPrice=${query.lowPrice}&&highPrice=${query.highPrice}&&currentPage=${query.currentPage}&&sortPrice=${query.sortPrice}`
            );
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.message);
        }
    }
);

export const query_services = createAsyncThunk(
    "services/query_services",
    async (query, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(
                `/home/query-services?category=${query.category}&&lowPrice=${query.lowPrice}&&highPrice=${query.highPrice}&&currentPage=${query.currentPage}&&sortPrice=${query.sortPrice}`
            );
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.message);
        }
    }
);

export const homeReducer = createSlice({
    name: "home",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        products: [],
        product: "",
        services: [],
        service: "",
        categories: [],
        priceRange: {
            low: 0,
            high: 0,
        },
        totalProduct: 0,
        totalService: 0,
        parPage: 3,
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_categories.fulfilled, (state, { payload }) => {
                state.categories = payload.categories;
            })
            .addCase(price_range_product.fulfilled, (state, { payload }) => {
                state.priceRange = payload.priceRange;
            })
            .addCase(query_products.fulfilled, (state, { payload }) => {
                state.totalProduct = payload.totalProduct;
                state.products = payload.getProducts;
                state.parPage = payload.parPage;
            })
            .addCase(query_services.fulfilled, (state, { payload }) => {
                state.totalService = payload.totalService;
                state.services = payload.getServices;
                state.parPage = payload.parPage;
            });
    },
});

export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;
