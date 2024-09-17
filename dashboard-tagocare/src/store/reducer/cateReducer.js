import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_category = createAsyncThunk(
    "category/add_category",
    async (formData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/add-category", formData, {
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

export const update_category = createAsyncThunk(
    "category/update_category",
    async (category, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put("update-category", category, {
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

export const update_category_status = createAsyncThunk(
    "category/update_category_status",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put("update-category-status", info, {
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_category = createAsyncThunk(
    "category/get_category",
    async (
        { parPage, currentPage, searchValue, typeCate },
        { rejectWithValue, fulfillWithValue }
    ) => {
        try {
            const { data } = await api.get(
                `/get-category?parPage=${parPage}&&currentPage=${currentPage}&&searchValue=${searchValue}&&typeCate=${typeCate}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_category_id = createAsyncThunk(
    "category/get_category_id",
    async (cateId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-category-id/${cateId}`, {
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

export const delete_category = createAsyncThunk(
    "category/delete_category",
    async (cateId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/delete-category/${cateId}`, {
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

export const categoryReducer = createSlice({
    name: "category",
    initialState: {
        successMessage: "",
        errorMessage: "",
        errors: { name: "", type: "", image: "" },
        loader: false,
        category: "",
        categories: [],
        totalCategory: 0,
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_category.pending, (state) => {
                state.loader = true;
            })
            .addCase(add_category.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
                state.errors = payload.errors || {};
            })
            .addCase(add_category.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(get_category.fulfilled, (state, { payload }) => {
                state.categories = payload.categories;
                state.totalCategory = payload.totalCategory;
            })
            .addCase(get_category_id.fulfilled, (state, { payload }) => {
                state.category = payload.category;
            })
            .addCase(update_category.pending, (state) => {
                state.loader = true;
            })
            .addCase(update_category.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(update_category.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(delete_category.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(update_category_status.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            });
    },
});

export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
