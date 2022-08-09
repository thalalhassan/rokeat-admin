/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { z } from "zod";
import { createRouter } from "../createRouter";
import { Products } from "@prisma/client";
interface MyEvents {
  add: (data: Products) => void;
}
export const productsRouter = createRouter()
  // create
  .query("hello", {
    resolve() {
      return "yay products!";
    },
  })
  .mutation("add", {
    input: z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1),
      image: z.string(),
      recommended: z.boolean(),
      description: z.string(),
      category: z.string(),
      brand: z.string(),
      variants: z.any(),
    }),
    async resolve({ ctx, input }) {
      const products = await ctx.prisma.products.create({
        data: {
          ...input,
          images: ["test", "test"],
        },
      });
      return products;
    },
  })
  .mutation("getAll", {
   async resolve({ input, ctx }) {
      const { user } = ctx;
      const allProducts = await ctx.prisma.products.findMany({})
      return allProducts;
    },
  });
