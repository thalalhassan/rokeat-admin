import Button from "components/Button";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "utils/trpc";

const Categories: NextPage = () => {
  const router = useRouter();
  const getAllCategoriesMutation = trpc.useMutation(["categories.getAll"]);

  useEffect(() => {
    getAllCategoriesMutation.mutate();
    console.log({ getAllCategoriesMutation });
  }, []);

  const { data, error, isLoading } = getAllCategoriesMutation;

  // ===== Element =======

  if (isLoading) return <div className="text-center">isLoading....</div>;
  if (error) return <div className="text-center">{`Opps error ${error}`}</div>;

  return (
    <div className="container">
      Categories
      <div className="">
        <div className="font-bold">
          <div className="category-container flex justify-between">
            <div className="image">Image</div>
            <div className="">Name</div>
            {/* <div className="">{category.price}</div> */}
          </div>
        </div>
        {data?.length ? (
          data.map((category: any) => (
            <div
              key={category.id}
              className="category-container flex justify-between"
            >
              <div className="image">{category.image}</div>
              <div className="">{category.name}</div>
              {/* <div className="">{category.price}</div> */}
            </div>
          ))
        ) : (
          <div className="">Add your first category</div>
        )}
        <div className="">
          <Button
            label="Add categories"
            onClick={() => {
              router.push("categories/add");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
