import React, { useState } from "react";
import { ColorPickerInterface } from "types/components.interface";
import { HexColorPicker } from "react-colorful";

const ColorPicker = (props: ColorPickerInterface) => {
  const {
    label,
    onChange,
    name,
    defaultValue,
    additionalClassName,
    required,
    ...defaultPropsData
  } = props;

  const [color, setColor] = useState(defaultValue);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleChange = (value: string) => {
    onChange(name, value);
    setColor(value);
  };

  return (
    <div className="flex flex-row">
      {label && <label className="">{label}</label>}
      <input
        type="color"
        value={color}
        onClick={(e) => {
          e.preventDefault();
          setShowColorPicker(!showColorPicker);
        }}
      />
      {showColorPicker && (
        <HexColorPicker
          color={color}
          onChange={handleChange}
          {...defaultPropsData}
        />
      )}
    </div>
  );
};

const defaultProps: ColorPickerInterface = {
  name: "input",
  onChange: () => {},
  additionalClassName: "",
  defaultValue: "#aabbcc",
};

ColorPicker.defaultProps = defaultProps;
export default ColorPicker;
