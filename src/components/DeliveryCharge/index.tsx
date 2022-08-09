import Input from "components/Input";
import React from "react";
import { DeliveryCharegeInterface } from "types/components.interface";
import { decamelize } from "utils/helper";

const DeliveryCharege = (props: DeliveryCharegeInterface) => {
  const { onChange, type } = props;

  const handleChange = (value: string, name: string) => {
    onChange(value, name);
  };

  if (type === "freeAbove" || type === "fixed") {
    return (
      <div className="flex flex-row">
        <div className="row my-3">
          <div className="col-4">
            <Input
              type="text"
              placeholder="price"
              name="price"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "dynamic") {
    return (
      <div className="flex flex-row">
        <div className="row my-3">
          {["km", "price", "pricePerKm"].map((v) => (
            <div className="col-4" key={v}>
              <Input
                type="text"
                placeholder={decamelize(v)}
                name={v}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <></>;
};

const defaultProps: DeliveryCharegeInterface = {
  onChange: () => {},
  type: "dynamic",
  additionalClassName: "",
  defaultValue: "#aabbcc",
};

DeliveryCharege.defaultProps = defaultProps;
export default DeliveryCharege;
