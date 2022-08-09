import { useErrorContext } from "context/errorContext";
import React from "react";
import { useDispatch } from "react-redux";
import { useCommonReducer } from "redux/hooks/useReducers";
import { commonActions } from "redux/slices/common.slice";
import { InputInterface } from "types/components.interface";

/**
 * Common theme input
 * @param props
 * @returns
 */
const Input = (props: InputInterface) => {
  const {
    type,
    label,
    name,
    placeholder,
    onChange,
    additionalInputClassName,
    additionalClassName,
    required,
    noPlaceholder,
    ...defaultPropsData
  } = props;

  const dispatch = useDispatch();

  const { errors, setErrors } = useErrorContext();

  // const { errors } = useCommonReducer();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(value, name, e);
    // return dispatch(commonActions.setError({ [name]: null }));
  };

  const placeholderString = !placeholder ? `Enter your ${name}` : placeholder;

  return (
    <div className={`${additionalClassName}`}>
      {label && <label>{label}</label>}
      <input
        name={name}
        required={required}
        type={type}
        placeholder={noPlaceholder ? "" : placeholderString}
        onChange={handleChange}
        {...defaultPropsData}
        className={`${additionalInputClassName} focus form-control ${
          errors?.[name] ? "errorfocus" : ""
        }`}
      />
      {errors?.[name] && (
        <span className="text-xs text-danger">{errors?.[name]}</span>
      )}
    </div>
  );
};

const defaultProps: InputInterface = {
  type: "text",
  name: "input",
  placeholder: "",
  required: false,
  onChange: () => {},
  additionalClassName: "",
  additionalInputClassName: "",
  noPlaceholder: false,
};

Input.defaultProps = defaultProps;
export default Input;
