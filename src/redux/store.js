import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth/authSlice";
import RoleSlice from "./slice/role/RoleSlice"
import DepartmentSlice from "./slice/department/DepartmentSlice"
import AccountStatusSlice from "./slice/accountStatus/AccountStatusSlice"
import UserAccountSlice from "./slice/userAccount/UserAccountSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    roleUse : RoleSlice,
    departmentUse : DepartmentSlice,
    accountStatusUse : AccountStatusSlice,
    UserAccountUse : UserAccountSlice
  },
});