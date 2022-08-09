import { MouseEventHandler } from "react";

export interface ButtonLinkInterface {
  label?: string;
  href: string;
  src?: string;
  additionalClassName: string;
}
export interface ButtonInterface {
  onClick: MouseEventHandler<HTMLButtonElement>;
  type: "button" | "submit" | "reset";
  label?: string;
  name: string;
  id?: string;
  additionalClassName: string;
}

export interface InputInterface {
  onChange: Function;
  type: "text" | "number" | "textarea" | "checkbox" | "password";
  label?: string;
  name: string;
  required?: boolean;
  noPlaceholder?: boolean;
  placeholder: string;
  value?: string | number;
  additionalClassName: string;
  additionalInputClassName: string;
}

export interface SelectInterface {
  onChange: Function;
  label?: string;
  name: string;
  required?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  options?: any[];
  additionalClassName: string;
  additionalInputClassName: string;
}

export interface ImageUploadInterface {
  onChange: Function;
  label?: string;
  name: string;
  required?: boolean;
  defaultValue?: string | number;
  value?: string;
  additionalClassName: string;
}

export interface ColorPickerInterface {
  onChange: Function;
  label?: string;
  name: string;
  required?: boolean;
  defaultValue: string;
  value?: string;
  additionalClassName: string;
}

export interface CheckboxInterface {
  onChange: Function;
  label?: string;
  name: string;
  checked?: boolean;
  required?: boolean;
  defaultValue?: string | number;
  additionalClassName: string;
}
export interface RadioButtonInterface {
  onChange: Function;
  label?: string;
  name: string;
  checked?: boolean;
  required?: boolean;
  defaultChecked?: boolean;
  value?: string;
  additionalClassName: string;
  id: string;
}

export interface DeliveryCharegeInterface {
  onChange: Function;
  label?: string;
  type: string;
  defaultValue?: string;
  value?: string;
  additionalClassName: string;
}

export interface VariantInterface {
  onAdd: Function;
}
