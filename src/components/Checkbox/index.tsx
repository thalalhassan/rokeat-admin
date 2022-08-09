import { useErrorContext } from "context/errorContext";
import React from "react";
import { CheckboxInterface } from "types/components.interface";

/**
 * Common theme Checkbox
 * @param props
 * @returns
 */
const Checkbox = (props: CheckboxInterface) => {
  const {
    label,
    name,
    checked,
    onChange,
    additionalClassName,
    required,
    ...defaultPropsData
  } = props;

  const { errors } = useErrorContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(value, name, e);
  };

  return (
    <div className={`${additionalClassName}`}>
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          name={name}
          className="custom-control-input"
          checked={checked}
          onChange={handleChange}
          {...defaultPropsData}
        />
        <label className="custom-control-label">{label}</label>
      </div>
      {errors?.[name] && (
        <span className="text-xs text-danger">{errors?.[name]}</span>
      )}
    </div>
  );
};

const defaultProps: CheckboxInterface = {
  name: "checkbox",
  required: false,
  onChange: () => {},
  additionalClassName: "",
};

Checkbox.defaultProps = defaultProps;
export default Checkbox;
