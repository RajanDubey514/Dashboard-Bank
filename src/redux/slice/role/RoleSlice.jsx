import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, getData, patchData, postData } from "../../../services/apiMethods";

// 🔹 GET Role (API CALL)
export const getUsersRole = createAsyncThunk(
  "role/getUsersRole",
  async (_, thunkAPI) => {
    try {
      const res = await getData("/role"); // GET API
      return res.data.data; // assume array of role
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to fetch role" }
      );
    }
  }
);

// 🔹 CREATE role (POST API)
export const createUserRole = createAsyncThunk(
  "role/createUserRole",
  async (userData, thunkAPI) => {
    try {
      const res = await postData("/role", userData); // POST API
      return res.data.data; // created role
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to create role" }
      );
    }
  }
);


// 🔹 Update role (PATCH API)
export const updateUserRole = createAsyncThunk(
  "role/updateUserRole",
  async ({id , payload}, thunkAPI) => {
    try {
      const res = await patchData(`/role/${id}`, payload); // PATCH API
      return res.data.data; // created role
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to Update role" }
      );
    }
  }
);

// 🔹 Delete role (PATCH API)
export const deleteUserRole = createAsyncThunk(
  "role/deleteUserRole",
  async (id , thunkAPI) => {
    try {
      const res = await deleteData(`/role/${id}`); // PATCH API
       return res.data;; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to Update role" }
      );
    }
  }
);

// 🔹 INITIAL STATE
const initialState = {
  roleList: [],
  loading: false,
  error: null,
};

// 🔹 SLICE
const RoleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 GET role
      .addCase(getUsersRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roleList = action.payload;
      })
      .addCase(getUsersRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 CREATE role
      .addCase(createUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roleList.push(action.payload); // add new role
      })
      .addCase(createUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        // 🔄 UPDATE role
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRole = action.payload;
        state.roleList = state.roleList.map((role) =>
            role.id === updatedRole.id ? updatedRole : role
        );
        })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

            // 🔄 DELETE role
        .addCase(deleteUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(deleteUserRole.fulfilled, (state, action) => {
        state.loading = false;

        const id = action.payload;

        // 🔥 remove from list
        state.roleList = state.roleList.filter(
            (role) => role._id !== id
        );
        })
        .addCase(deleteUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        });
        },
});

export const { clearError } = RoleSlice.actions;
export default RoleSlice.reducer;
