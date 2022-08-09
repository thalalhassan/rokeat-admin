export type UserSignupInterfaceKeys =
  | "storeUrl"
  | "name"
  | "password"
  | "email"
  | "mobile";

export interface UserSignupInterface {
  storeUrl?: string;
  storeName?: string;
  name?: string;
  password?: string;
  email?: string;
  mobile?: string;
  avatar?: string;
}

export interface UserInterface {
  storeName?: string;
  storeId?: string;
  id?: string;
  email?: string;
  createdAt?: string;
}

export interface UserInitialInterface {
  userData: UserInterface | null;
}
