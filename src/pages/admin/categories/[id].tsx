import prisma from "../../../../lib/prisma";

const ProductDetail = (props: { category: any }) => {
  const { category } = props;

  return (
    <div className="text-center">
      Hello category Details
      {JSON.stringify(category)}
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
  const category = await prisma.categories.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
    },
  });
  return {
    props: {
      category,
    },
  };
};
