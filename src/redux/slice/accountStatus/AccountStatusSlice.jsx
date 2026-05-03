import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, getData, patchData, postData } from "../../../services/apiMethods";

// 🔹 GET department (API CALL)
export const getUsersAccountStatus = createAsyncThunk(
  "account_status/getUsersAccountStatus",
  async (_, thunkAPI) => {
    try {
      const res = await getData("/account_status"); // GET API
      return res.data.data; // assume array of department
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to fetch status" }
      );
    }
  }
);

// 🔹 CREATE department (POST API)
export const createUserAccountStatus = createAsyncThunk(
  "account_status/createUserAccountStatus",
  async (userData, thunkAPI) => {
    try {
      const res = await postData("/account_status", userData); // POST API
      return res.data; // created department
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to create status" }
      );
    }
  }
);


// 🔹 Update department (PATCH API)
export const updateUserAccountstatus = createAsyncThunk(
  "account_status/updateUserAccountstatus",
  async ({id , payload}, thunkAPI) => {
    try {
      const res = await patchData(`/account_status/${id}`, payload); // PATCH API
      return res.data.data; // created department
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to Update status" }
      );
    }
  }
);

// 🔹 Delete department (PATCH API)
export const deleteUserAccountStatus = createAsyncThunk(
  "account_status/deleteUserAccountStatus",
  async (id , thunkAPI) => {
    try {
      const res = await deleteData(`/account_status/${id}`); // PATCH API
       return res.data;; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to Update status" }
      );
    }
  }
);

// 🔹 INITIAL STATE
const initialState = {
  accStatusList: [],
  loading: false,
  error: null,
};

// 🔹 SLICE
const AccountStatusSlice = createSlice({
  name: "account_status",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 GET department
      .addCase(getUsersAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersAccountStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.accStatusList = action.payload;
      })
      .addCase(getUsersAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 CREATE department
      .addCase(createUserAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserAccountStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.accStatusList.push(action.payload); // add new department
      })
      .addCase(createUserAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        // 🔄 UPDATE department
      .addCase(updateUserAccountstatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAccountstatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRole = action.payload;
        state.accStatusList = state.accStatusList.map((department) =>
            department.id === updatedRole.id ? updatedRole : department
        );
        })
      .addCase(updateUserAccountstatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

            // 🔄 DELETE department
        .addCase(deleteUserAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(deleteUserAccountStatus.fulfilled, (state, action) => {
        state.loading = false;

        const id = action.payload;

        // 🔥 remove from list
        state.accStatusList = state.accStatusList.filter(
            (department) => department._id !== id
        );
        })
        .addCase(deleteUserAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        });
        },
});

export const { clearError } = AccountStatusSlice.actions;
export default AccountStatusSlice.reducer;
