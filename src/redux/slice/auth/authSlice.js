import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../../../services/apiMethods";


// 🔹 LOGIN THUNK
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await postData("/users/login", payload);

      // 🔐 access token store
      const { token, user } = res.data.data;
      // console.log(res.data.data.token)

      localStorage.setItem("accessToken", token);

      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Login failed" }
      );
    }
  }
);

// 🔹 INITIAL STATE
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// 🔹 SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("accessToken");
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 LOGIN PENDING
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ LOGIN SUCCESS
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      // ❌ LOGIN FAIL
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;