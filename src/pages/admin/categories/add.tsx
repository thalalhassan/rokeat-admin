import Button from "components/Button";
import ImageUpload from "components/ImageUpload";
import Input from "components/Input";
import type { NextPage } from "next";
import { useState } from "react";
import { trpc } from "utils/trpc";

const CategoryCreate: NextPage = () => {
  const addCategoryMutation = trpc.useMutation(["categories.add"], {
    onError: (err: any) => {
      console.log("Something went wrong");
    },
  });

  const [categoryData, setCategoryData] = useState<any>({});

  const handleChange = (value: any, name: string) => {
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleAddCategory = () => {
    console.log(categoryData);
    addCategoryMutation.mutate(categoryData)
  };

  return (
    <div className="container mx-3 text-black">
      <h3 className="font-bold">Add Category</h3>
      <Input
        name="name"
        value={categoryData.name}
        label="Category name"
        required
        onChange={handleChange}
      />
      <Input
        type="textarea"
        value={categoryData.details}
        name="description"
        label="Category details"
        onChange={handleChange}
      />
      <ImageUpload
        name="image"
        label="Category image"
        onChange={handleChange}
      />
      <Button name="addCategory" label="Save" onClick={handleAddCategory} />
    </div>
  );
};

export default CategoryCreate;
