import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInitialState } from "redux/initialData/user";
import {
  UserInitialInterface,
  UserInterface
} from "types/user.interface";

const setUserData = (
  state: UserInitialInterface,
  action: PayloadAction<UserInterface | null>
) => {
  state.userData = state.userData
    ? { ...state.userData, ...action.payload }
    : { ...action.payload };
  return state;
};

const userSlice = createSlice({
  name: "user",
  initialState: UserInitialState,
  reducers: {
    setUserData,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(authSlice.actions.clearAuthentication, () => initialState);
  // },
});

export default userSlice;
export const { actions: userActions, reducer: userReducer } = userSlice;
