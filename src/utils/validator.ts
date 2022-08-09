import { ErrorInterface } from "types/common.interface";
import { isEmpty } from "./helper";

const errorMessage = {
  REQUIRED: "This field is required",
};

export const isValid = (value: any, condition?: any) => {
  const errorData: ErrorInterface = {};
  if (Array.isArray(value)) {
    return { valid: isEmpty(errorData), errorData };
  }

  if (typeof value === "object") {
    Object.entries(value).forEach(([key, val]) => {
      if (isEmpty(val)) errorData[key] = errorMessage.REQUIRED;
    });
    return { valid: isEmpty(errorData), errorData };
  }

  return { valid: false, errorData };
};
