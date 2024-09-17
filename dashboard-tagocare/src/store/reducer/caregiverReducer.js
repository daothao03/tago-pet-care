import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const caregiver_request = createAsyncThunk(
    "caregiver/caregiver_request",
    async (
        { currentPage, parPage, searchValue },
        { rejectWithValue, fulfillWithValue }
    ) => {
        try {
            const { data } = await api.get(
                `/get-caregiver-request?parPage=${parPage}&&currentPage=${currentPage}&&searchValue=${searchValue}`,
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

export const caregiver_info = createAsyncThunk(
    "caregiver/caregiver_info",
    async (careId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-caregiver-info/${careId}`, {
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

export const update_role_status = createAsyncThunk(
    "caregiver/update_role_status",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/update-role-status`, info, {
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const update_profile = createAsyncThunk(
    "caregiver/update_profile",
    async (formData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/update-profile`, formData, {
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

export const caregiverReducer = createSlice({
    name: "caregiver",
    initialState: {
        successMessage: "",
        errorMessage: "",
        errors: {
            name: "",
            email: "",
            phone: "",
            businessForm: "",
            address: "",
            serviceArea: "",
            introduce: "",
            experience: "",
            shopName: "",
            image: "",
            certificates: "",
        },
        loader: false,
        caregiver: "",
        caregivers: [],
        totalCaregiver: 0,
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(update_role_status.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
            })
            .addCase(update_role_status.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(caregiver_request.fulfilled, (state, { payload }) => {
                state.caregivers = payload.caregivers;
                state.totalCaregiver = payload.totalCaregiver;
            })
            .addCase(caregiver_info.fulfilled, (state, { payload }) => {
                state.caregiver = payload.caregiverProfile;
            })
            .addCase(update_profile.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
                state.errors = payload.errors || {};
            })
            .addCase(update_profile.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            });
    },
});

export const { messageClear } = caregiverReducer.actions;
export default caregiverReducer.reducer;
