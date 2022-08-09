/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { z } from "zod";
import { createRouter } from "../createRouter";

export const categoriesRouter = createRouter()
  // create
  .query("hello", {
    resolve() {
      return "yay categories!";
    },
  })
  .mutation("add", {
    input: z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1),
      image: z.string().optional(),
      description: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const categories = await ctx.prisma.categories.create({
        data: {
          ...input,
        },
      });
      return categories;
    },
  })
  .mutation("getAll", {
    async resolve({ input, ctx }) {
      const { user } = ctx;
      const allProducts = await ctx.prisma.categories.findMany({});
      return allProducts;
    },
  });
