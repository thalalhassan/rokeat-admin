import { useErrorContext } from "context/errorContext";
import React from "react";
import { RadioButtonInterface } from "types/components.interface";

/**
 * Common theme RadioButton
 * @param props
 * @returns
 */
const RadioButton = (props: RadioButtonInterface) => {
  const {
    label,
    name,
    onChange,
    additionalClassName,
    required,
    ...defaultPropsData
  } = props;

  const { errors } = useErrorContext();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    onChange(value, name, e);
  };

  return (
    <>
      <div className={`${additionalClassName} form-check`}>
        <input
          type="radio"
          name={name}
          className="form-check-input"
          onClick={handleChange}
          {...defaultPropsData}
        />
        <label className="form-check-label capitalize">{label}</label>
      </div>
      {errors?.[name] && (
        <span className="text-xs text-danger">{errors?.[name]}</span>
      )}
    </>
  );
};

const defaultProps: RadioButtonInterface = {
  name: "radio",
  required: false,
  onChange: () => {},
  additionalClassName: "",
  id: "radio",
};

RadioButton.defaultProps = defaultProps;
export default RadioButton;
