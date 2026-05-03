import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, getData, patchData, postData } from "../../../services/apiMethods";

// 🔹 GET department (API CALL)
export const getUsersData = createAsyncThunk(
  "userAccount/getUsersData",
  async (_, thunkAPI) => {
    try {
      const res = await getData("/all/users"); // GET API
      return res.data.data; // assume array of department
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to fetch user" }
      );
    }
  }
);

// 🔹 CREATE department (POST API)
export const createUserAccount = createAsyncThunk(
  "userAccount/createUserAccount",
  async (userData, thunkAPI) => {
    try {
      const res = await postData("/users/register", userData); // POST API
      return res.data; // created department
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to create Account" }
      );
    }
  }
);


// 🔹 Update department (PATCH API)
export const updateUserAccount = createAsyncThunk(
  "userAccount/updateUserAccount",
  async ({id , payload}, thunkAPI) => {
    try {
      const res = await patchData(`/all/users/${id}`, payload); // POST API
      return res.data; // created department
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to create Account" }
      );
    }
  }
);


// // 🔹 Delete department (PATCH API)
// export const deleteUserDepartment = createAsyncThunk(
//   "userAccount/deleteUserDepartment",
//   async (id , thunkAPI) => {
//     try {
//       const res = await deleteData(`/department/${id}`); // PATCH API
//        return res.data;; 
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err?.response?.data || { message: "Failed to Update department" }
//       );
//     }
//   }
// );

// 🔹 INITIAL STATE
const initialState = {
  userAccountList: [],
  loading: false,
  error: null,
};

// 🔹 SLICE
const UserAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 GET department
      .addCase(getUsersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.loading = false;
        state.userAccountList = action.payload;
      })
      .addCase(getUsersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 CREATE department
      .addCase(createUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.userAccountList.push(action.payload); // add new department
      })
      .addCase(createUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     // 🔄 UPDATE department
      .addCase(updateUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRole = action.payload;
        state.userAccountList = state.userAccountList.map((department) =>
            department.id === updatedRole.id ? updatedRole : department
        );
        })
      .addCase(updateUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    //         // 🔄 DELETE department
    //     .addCase(deleteUserDepartment.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //     })
    //     .addCase(deleteUserDepartment.fulfilled, (state, action) => {
    //     state.loading = false;

    //     const id = action.payload;

    //     // 🔥 remove from list
    //     state.userAccountList = state.userAccountList.filter(
    //         (department) => department._id !== id
    //     );
    //     })
    //     .addCase(deleteUserDepartment.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //     });
        },
});

export const { clearError } = UserAccountSlice.actions;
export default UserAccountSlice.reducer;
