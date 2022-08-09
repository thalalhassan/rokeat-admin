import { NextPage } from "next";
import DefaultLayout from "./Default";
import AdminLayout from "./Admin";

export type PageWithLayoutType = NextPage & {
  layout: "LA" | "LD";
};

export const LAYOUTS = {
  LD: DefaultLayout,
  LA: AdminLayout,
};
