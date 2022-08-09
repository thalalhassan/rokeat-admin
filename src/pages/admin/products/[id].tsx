import prisma from "../../../../lib/prisma";

const ProductDetail = (props: { product: any }) => {
  const { product } = props;

  return (
    <div className="text-center">
      Hello product Details
      {JSON.stringify(product)}
    </div>
  );
};

export default ProductDetail;

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const product = await prisma.products.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
    },
  });
  return {
    props: {
      product,
    },
  };
};
