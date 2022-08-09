import { StoreInitialInterface } from "types/store.interface";

const signupDataDefault = {
  storeUrl: "",
  storeName: "",
  name: "",
  password: "",
  email: "",
  mobile: "",
};

export const StoreInitialState: StoreInitialInterface = {
  signupData: signupDataDefault,
};
