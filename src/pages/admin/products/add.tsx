import Button from "components/Button";
import Checkbox from "components/Checkbox";
import ImageUpload from "components/ImageUpload";
import ProductVariant from "components/Products/variant";
import Input from "components/Input";
import Select from "components/Select";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "utils/trpc";

const ProductCreate: NextPage = () => {
  const addProductMutation = trpc.useMutation(["products.add"], {
    onError: (err: any) => {
      console.log("Something went wrong");
    },
  });

  const [variantsModal, setVariantsModal] = useState(false);
  const [productData, setProductData] = useState<any>({
    variants: [],
  });

  const handleChange = (value: any, name: string) => {
    setProductData({ ...productData, [name]: value });
  };

  const handleAddVaraints = (variant: any) => {
    setVariantsModal(false);
    setProductData({
      ...productData,
      variants: [...productData.variants, variant],
    });
  };

  const handleAddProduct = () => {
    console.log(productData);

    // addProductMutation.mutate(productData)
  };

  return (
    <div className="container mx-3 text-black">
      <h3 className="font-bold">Add Product</h3>
      <Input
        name="name"
        value={productData.name}
        label="Product name"
        required
        onChange={handleChange}
      />
      <Select
        options={[
          { value: "veg", label: "Veg" },
          { value: "nonVeg", label: "Non Veg" },
        ]}
        name="category"
        value={productData.category}
        label="Product category"
        onChange={handleChange}
        required
      />
      <Checkbox name="recommendedProduct" label="Recommended product" />
      <Input
        type="textarea"
        value={productData.details}
        name="details"
        label="Product details"
        onChange={handleChange}
      />
      <ImageUpload name="image" label="Product image" onChange={handleChange} />
      <h3>Variants</h3>
      <Button
        name="variants"
        label="Add Variants"
        onClick={() => {
          setVariantsModal(!variantsModal);
        }}
      />
      {productData.variants.map((variant: any) => (
        <div key={variant.name}>{variant.name}</div>
      ))}
     
      {variantsModal && <ProductVariant onAdd={handleAddVaraints} />}
      <Button
        name="addProduct"
        label="Save"
        onClick={handleAddProduct}
      />
    </div>
  );
};

export default ProductCreate;
