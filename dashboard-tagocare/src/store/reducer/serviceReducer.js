import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_service = createAsyncThunk(
    "service/add_service",
    async (formData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/add-service`, formData, {
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

export const update_service = createAsyncThunk(
    "service/update_service",
    async (formData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/update-service`, formData, {
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

export const delete_service = createAsyncThunk(
    "service/delete_service",
    async (serviceId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/delete-service/${serviceId}`, {
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

export const get_service_id = createAsyncThunk(
    "service/get_service_id",
    async (serviceId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-service-id/${serviceId}`, {
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_services = createAsyncThunk(
    "service/get_services",
    async (
        { parPage, currentPage, searchValue },
        { rejectWithValue, fulfillWithValue }
    ) => {
        try {
            const { data } = await api.get(
                `/get-services?parPage=${parPage}&&currentPage=${currentPage}&&searchValue=${searchValue}`,
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

export const update_service_status = createAsyncThunk(
    "service/update_service_status",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put("/update-service-status", info, {
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const serviceReducer = createSlice({
    name: "service",
    initialState: {
        loader: false,
        successMessage: "",
        errorMessage: "",
        errors: {
            name: "",
            category: "",
            price: "",
            stock: "",
            discount: "",
            description: "",
            images: "",
        },
        service: "",
        services: [],
        totalService: 0,
        categoryByServiceId: "",
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_service.pending, (state) => {
                state.loader = true;
            })
            .addCase(add_service.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
                state.errors = payload.errors;
            })
            .addCase(add_service.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(update_service.pending, (state) => {
                state.loader = true;
            })
            .addCase(update_service.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
                state.errors = payload.errors;
            })
            .addCase(update_service.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(delete_service.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(get_services.fulfilled, (state, { payload }) => {
                state.services = payload.services;
                state.totalService = payload.totalService;
            })
            .addCase(update_service_status.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(get_service_id.fulfilled, (state, { payload }) => {
                state.service = payload.service;
                state.categoryByServiceId = payload.categoryByServiceId;
            });
    },
});

export const { messageClear } = serviceReducer.actions;
export default serviceReducer.reducer;
