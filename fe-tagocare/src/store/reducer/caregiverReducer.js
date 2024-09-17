import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const caregiver_request = createAsyncThunk(
    "caregiver/caregiver_request",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/caregiver-request", info, {
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_caregiver_info = createAsyncThunk(
    "caregiver/get_caregiver_info",
    async (userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/caregiver-info/${userId}`, {
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const caregiverReducer = createSlice({
    name: "caregiver",
    initialState: {
        successMessage: "",
        errorMessage: "",
        errors: {
            phone: "",
            businessForm: "",
            address: "",
            serviceArea: "",
            reasons: "",
            experience: "",
            images: "",
        },
        loader: false,
        caregiver: "",
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(caregiver_request.pending, (state) => {
                state.loader = true;
            })
            .addCase(caregiver_request.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
                state.errors = payload.errors || {};
            })
            .addCase(caregiver_request.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(get_caregiver_info.fulfilled, (state, { payload }) => {
                state.caregiver = payload.caregiverProfile;
            });
    },
});

export const { messageClear } = caregiverReducer.actions;
export default caregiverReducer.reducer;
