import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, getData, patchData, postData, uploadFile } from "../../../services/apiMethods";

// 🔹 GET department (API CALL)
export const getUserInfo = createAsyncThunk(
  "profile/getUserInfo",
  async (_, thunkAPI) => {
    try {
      const res = await getData("/all/me"); // GET API
      // console.log(res.data.data)
      return res.data.data; // assume array of department
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to user info" }
      );
    }
  }
);

// 🔹 CREATE department (POST API)
export const updatePersonalInfo = createAsyncThunk(
  "profile/updatePersonalInfo",
  async (userData, thunkAPI) => {
    try {
      const res = await patchData("/all/me", userData); // POST API
      return res.data.data; // created department
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to update info" }
      );
    }
  }
);


// 🔹 Update department (PATCH API)
export const updateUserInfoImage = createAsyncThunk(
  "user/updateAvatar",
  async (file, thunkAPI) => {
    try {
      const res = await uploadFile(`/all/me/avatar/`, file, "avatar");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: "Failed to update avatar" }
      );
    }
  }
);



// 🔹 INITIAL STATE
const initialState = {
  profileDataList: [],
  loading: false,
  error: null,
};

// 🔹 SLICE
const PersonalInfoSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 GET department
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.profileDataList = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        },
});

export const { clearError } = PersonalInfoSlice.actions;
export default PersonalInfoSlice.reducer;
