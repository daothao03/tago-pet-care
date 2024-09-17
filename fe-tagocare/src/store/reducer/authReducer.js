import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const user_register = createAsyncThunk(
    "auth/user_register",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/user-register", info, {
                withCredentials: true,
            });

            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const user_login = createAsyncThunk(
    "auth/user_login",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/user-login", info);
            localStorage.setItem("customerToken", data.token);

            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const decodeToken = (token) => {
    if (token) {
        const userInfo = jwtDecode(token);
        return userInfo;
    } else {
        return "";
    }
};

export const authReducer = createSlice({
    name: "auth",
    initialState: {
        successMessage: "",
        errorMessage: "",
        userInfo: decodeToken(localStorage.getItem("customerToken")),
        loader: false,
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
        user_reset: (state) => {
            state.userInfo = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(user_register.pending, (state) => {
                state.loader = true;
            })
            .addCase(user_register.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(user_register.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.loader = false;
            })

            .addCase(user_login.pending, (state) => {
                state.loader = true;
            })
            .addCase(user_login.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(user_login.fulfilled, (state, { payload }) => {
                const userInfo = decodeToken(payload.token);
                state.successMessage = payload.message;
                state.loader = false;
                state.userInfo = userInfo;
            });
    },
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
