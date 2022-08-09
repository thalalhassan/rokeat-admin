import { useErrorContext } from "context/errorContext";
import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import { SelectInterface } from "types/components.interface";

/**
 * Common theme Select
 * @param props
 * @returns
 */
const SelectComponent = (props: SelectInterface) => {
  const {
    label,
    name,
    options,
    onChange,
    additionalInputClassName,
    additionalClassName,
    ...defaultPropsData
  } = props;

  const { errors } = useErrorContext();

  const [selectedOption, setSelectedOption] = useState<SingleValue<string | number | ((prevState: string) => string)> | null>("");

  return (
    <div className={`${additionalClassName}`}>
      {label && <label>{label}</label>}
      <Select
        value={selectedOption}
        onChange={(selected) => {
          setSelectedOption(selected);
          onChange(selected);
        }}
        options={options}
        {...defaultPropsData}
      />
      {errors?.[name] && (
        <span className="text-xs text-danger">{errors?.[name]}</span>
      )}
    </div>
  );
};

const defaultProps: SelectInterface = {
  name: "select",
  options: [],
  onChange: () => {},
  additionalClassName: "",
  additionalInputClassName: "",
};

SelectComponent.defaultProps = defaultProps;
export default SelectComponent;
