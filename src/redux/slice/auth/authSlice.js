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


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await postData("/users/logout");
      localStorage.removeItem("accessToken");
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Logout failed" }
      );
    }
  }
);


export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (payload, thunkAPI) => {
    try {
      const res = await postData("/users/forgot-password", payload);

      return res.data; // 👈 IMPORTANT
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to send reset link" }
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({uid , payload}, thunkAPI) => {
    try {
      const res = await postData(`/users/reset-password/${uid}`, payload);
      return res.data; // 👈 IMPORTANT
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data 
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
   forgotSuccess: false, // 👈 add this
   resetSuccess : false
};

// 🔹 SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    forceLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
    },

    clearError: (state) => {
      state.error = null;
    },

    setAuthFromToken: (state) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        state.isAuthenticated = true;
      }
    }
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
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
    
      // logout User
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

        // forget password
      .addCase(forgetPassword.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(forgetPassword.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
           state.forgotSuccess = true;
          
        })

        .addCase(forgetPassword.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })



          // Reset password
      .addCase(resetPassword.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(resetPassword.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
           state.resetSuccess = true;
        })

        .addCase(resetPassword.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  },
});

export const { forceLogout, clearError , setAuthFromToken  } = authSlice.actions;
export default authSlice.reducer;