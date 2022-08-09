/* eslint-disable react/prop-types */
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ErrorInterface } from "types/common.interface";


interface ErrorContextInterface {
  errors: ErrorInterface;
  setErrors: Dispatch<SetStateAction<ErrorInterface>>;
}

const ErrorContext = createContext<ErrorContextInterface>({
  errors: {},
  setErrors: () => {},
});

const ErrorContextProvider: FC = ({ children }) => {
  const [errors, setErrors] = useState<ErrorInterface>({});

//   const setErrors = (errorData: ErrorInterface) => {
//     setErrorsLocal({
//       ...errors,
//       ...errorData,
//     });
//   };

  return (
    <ErrorContext.Provider value={{ errors, setErrors }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;

export const useErrorContext = () => useContext(ErrorContext);
