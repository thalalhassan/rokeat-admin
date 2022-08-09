import Button from "components/Button";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "utils/trpc";

const Products: NextPage = () => {
  const router = useRouter();
  const getAllProductsMutation = trpc.useMutation(["products.getAll"]);

  useEffect(() => {
    getAllProductsMutation.mutate();
    console.log({ getAllProductsMutation });
  }, []);

  const { data, error, isLoading } = getAllProductsMutation;

  // ===== Element =======

  if (isLoading) return <div className="text-center">isLoading....</div>;
  if (error) return <div className="text-center">{`Opps error ${error}`}</div>;

  return (
    <div className="container">
      Products
      <div className="">
        <div className="font-bold">
          <div className="product-container flex justify-between">
            <div className="image">Image</div>
            <div className="">Name</div>
            {/* <div className="">{product.price}</div> */}
          </div>
        </div>
        {data?.length ? (
          data.map((product) => (
            <div
              key={product.id}
              className="product-container flex justify-between"
            >
              <div className="image">{product.images}</div>
              <div className="">{product.name}</div>
              {/* <div className="">{product.price}</div> */}
            </div>
          ))
        ) : (
          <div className="">Add your first product</div>
        )}
        <div className="">
          <Button
            label="Add products"
            onClick={() => {
              router.push("products/add");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
