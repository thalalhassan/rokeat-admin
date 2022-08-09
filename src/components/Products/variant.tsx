import Button from "components/Button";
import ImageUpload from "components/ImageUpload";
import Input from "components/Input";
import Select from "components/Select";
import { useState } from "react";
import { VariantInterface } from "types/components.interface";

const ProductVariant = (props: VariantInterface) => {
  const { onAdd } = props;

  const [variantData, setVariantData] = useState<any>({});

  const handleSave = () => {
    onAdd(variantData);
    setVariantData({})
  };

  const handleChange = (value: any, name: string) => {
    setVariantData({ ...variantData, [name]: value });
  };

  return (
    <div className="text-black">
      <h3 className="font-bold">Add variant</h3>
      <Input
        name="name"
        label="Variant name"
        required
        onChange={handleChange}
      />
      <Input name="price" label="Price" required onChange={handleChange} />
      <ImageUpload name="image" label="Variant image" onChange={handleChange} />
      <Button label="save" onClick={handleSave} />
    </div>
  );
};

export default ProductVariant;
