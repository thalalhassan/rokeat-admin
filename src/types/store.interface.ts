export type StoreSignupInterfaceKeys =
  | "storeUrl"
  | "name"
  | "password"
  | "email"
  | "mobile";

export interface StoreSignupInterface {
  storeUrl?: string;
  storeName?: string;
  name?: string;
  password?: string;
  email?: string;
  mobile?: string;
  avatar?: string;
}

export interface StoreInitialInterface {
  signupData: StoreSignupInterface | null;
}
