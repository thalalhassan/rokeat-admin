import { useErrorContext } from "context/errorContext";
import Image from "next/image";
import React, { useState } from "react";
import { ImageUploadInterface } from "types/components.interface";

/**
 * Common theme ImageUpload
 * @param props
 * @returns
 */
const ImageUpload = (props: ImageUploadInterface) => {
  const {
    label,
    name,
    onChange,
    additionalClassName,
    required,
    value,
    ...defaultPropsData
  } = props;
  const [image, setImage] = useState<any>(null);
  const [createObjectURL, setCreateObjectURL] = useState<any>(null);

  const { errors } = useErrorContext();

  const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
    onChange({url: `https://picsum.photos/id/237/200`})
  };

  return (
    <div className={`${additionalClassName}`}>
      {label && <label>{label}</label>}
      {createObjectURL && (
        <Image
          src={createObjectURL}
          width={"100%"}
          height={"100%"}
          alt="ionic-ios-arrow"
        />
      )}
      <input
        name={name}
        required={required}
        type="file"
        onChange={handleChange}
        {...defaultPropsData}
        className={`focus ${errors?.[name] ? "errorfocus" : ""}`}
      />
      {errors?.[name] && (
        <span className="text-xs text-danger">{errors?.[name]}</span>
      )}
    </div>
  );
};

const defaultProps: ImageUploadInterface = {
  name: "input",
  onChange: () => {},
  additionalClassName: "",
};

ImageUpload.defaultProps = defaultProps;
export default ImageUpload;
