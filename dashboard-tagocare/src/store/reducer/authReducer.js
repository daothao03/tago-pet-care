import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const login = createAsyncThunk(
    "auth/login",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/login", info, {
                withCredentials: true,
            });
            localStorage.setItem("accessToken", data.token);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/register", info, {
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_info_user = createAsyncThunk(
    "auth/get_info_user",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/get-information", {
                withCredentials: true,
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const log_out = createAsyncThunk(
    "auth/log_out",
    async ({ role }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/logout", {
                withCredentials: true,
            });
            localStorage.removeItem("accessToken");

            if (role.includes("admin")) {
                window.location.href = "/admin/login";
            } else {
                window.location.href = "/login";
            }

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// const returnRole = (token) => {
//     if (token) {
//         const decodeToken = jwtDecode(token);
//         const expireTime = new Date(decodeToken.exp * 1000);
//         if (new Date() > expireTime) {
//             localStorage.removeItem("accessToken");
//             return "";
//         } else {
//             return decodeToken.role;
//         }
//     } else {
//         return "";
//     }
// };

const returnRole = (token) => {
    if (token) {
        const decodeToken = jwtDecode(token);
        const expireTime = new Date(decodeToken.exp * 1000);
        if (new Date() > expireTime) {
            localStorage.removeItem("accessToken");
            return [];
        } else {
            return Array.isArray(decodeToken.role)
                ? decodeToken.role
                : [decodeToken.role];
        }
    } else {
        return [];
    }
};

export const authReducer = createSlice({
    name: "auth",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        userInfo: "",
        role: returnRole(localStorage.getItem("accessToken")),
        token: localStorage.getItem("accessToken"),
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loader = true;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.token = payload.token;
                state.role = returnRole(payload.token);
            })
            .addCase(register.pending, (state) => {
                state.loader = true;
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(get_info_user.fulfilled, (state, { payload }) => {
                state.userInfo = payload.userInfo;
            });
    },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
