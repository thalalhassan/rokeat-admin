import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commonInitialState } from "redux/initialData/common";
import { CommonInitialInterface } from "types/common.interface";

const setError = (
  state: CommonInitialInterface,
  action: PayloadAction<{ [key: string]: string | null }>
) => {
  state.errors = { ...state.errors, ...action.payload };
  return state;
};

const commonSlice = createSlice({
  name: "common",
  initialState: commonInitialState,
  reducers: {
    setError,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(authSlice.actions.clearAuthentication, () => initialState);
  // },
});

export default commonSlice;
export const { actions: commonActions, reducer: commonReducer } = commonSlice;
