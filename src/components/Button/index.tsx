import Link from "next/link";
import { ButtonInterface } from "types/components.interface";

/**
 * Common theme Button
 * @param props
 * @returns
 */
const Button = (props: ButtonInterface) => {
  const { label, additionalClassName, ...defaultPropsData } = props;

  return (
    <button
      {...defaultPropsData}
      className={`${additionalClassName} w-full mt-2 text-white bg-btn-primary py-2 px-4 rounded capitalize`}
    >
      {label}
    </button>
  );
};

const defaultProps: ButtonInterface = {
  type: "button",
  label: "Button",
  name: "button",
  additionalClassName: "",
  onClick: () => {},
};

Button.defaultProps = defaultProps;
export default Button;
