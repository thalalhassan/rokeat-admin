/* eslint-disable react/prop-types */
import React from "react";
import ErrorContextProvider from "./errorContext";

export const RootContext: React.FC = ({ children }) => (
  <ErrorContextProvider>{children}</ErrorContextProvider>
);
