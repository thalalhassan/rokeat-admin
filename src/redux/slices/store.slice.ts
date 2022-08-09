import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreInitialState } from "redux/initialData/store";
import {
  StoreInitialInterface,
  StoreSignupInterface,
} from "types/store.interface";

const updateSignupData = (
  state: StoreInitialInterface,
  action: PayloadAction<StoreSignupInterface>
) => {
  state.signupData = state.signupData
    ? { ...state.signupData, ...action.payload }
    : { ...action.payload };
  return state;
};

const storeSlice = createSlice({
  name: "store",
  initialState: StoreInitialState,
  reducers: {
    updateSignupData,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(authSlice.actions.clearAuthentication, () => initialState);
  // },
});

export default storeSlice;
export const { actions: storeActions, reducer: storeReducer } = storeSlice;
