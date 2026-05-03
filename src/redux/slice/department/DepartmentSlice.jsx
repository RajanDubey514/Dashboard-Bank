import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, getData, patchData, postData } from "../../../services/apiMethods";

// 🔹 GET department (API CALL)
export const getUsersDepartment = createAsyncThunk(
  "department/getUsersDepartment",
  async (_, thunkAPI) => {
    try {
      const res = await getData("/department"); // GET API
      return res.data.data; // assume array of department
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to fetch department" }
      );
    }
  }
);

// 🔹 CREATE department (POST API)
export const createUserDepartment = createAsyncThunk(
  "department/createUserDepartment",
  async (userData, thunkAPI) => {
    try {
      const res = await postData("/department", userData); // POST API
      return res.data; // created department
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to create department" }
      );
    }
  }
);


// 🔹 Update department (PATCH API)
export const updateUserDepartment = createAsyncThunk(
  "department/updateUserDepartment",
  async ({id , payload}, thunkAPI) => {
    try {
      const res = await patchData(`/department/${id}`, payload); // PATCH API
      return res.data.data; // created department
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to Update department" }
      );
    }
  }
);

// 🔹 Delete department (PATCH API)
export const deleteUserDepartment = createAsyncThunk(
  "department/deleteUserDepartment",
  async (id , thunkAPI) => {
    try {
      const res = await deleteData(`/department/${id}`); // PATCH API
       return res.data;; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to Update department" }
      );
    }
  }
);

// 🔹 INITIAL STATE
const initialState = {
  departmentList: [],
  loading: false,
  error: null,
};

// 🔹 SLICE
const DepartmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 GET department
      .addCase(getUsersDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentList = action.payload;
      })
      .addCase(getUsersDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 CREATE department
      .addCase(createUserDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentList.push(action.payload); // add new department
      })
      .addCase(createUserDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        // 🔄 UPDATE department
      .addCase(updateUserDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDepartment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRole = action.payload;
        state.departmentList = state.departmentList.map((department) =>
            department.id === updatedRole.id ? updatedRole : department
        );
        })
      .addCase(updateUserDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

            // 🔄 DELETE department
        .addCase(deleteUserDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(deleteUserDepartment.fulfilled, (state, action) => {
        state.loading = false;

        const id = action.payload;

        // 🔥 remove from list
        state.departmentList = state.departmentList.filter(
            (department) => department._id !== id
        );
        })
        .addCase(deleteUserDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        });
        },
});

export const { clearError } = DepartmentSlice.actions;
export default DepartmentSlice.reducer;
