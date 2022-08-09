/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { z } from "zod";
import { createRouter } from "../createRouter";

export const storesRouter = createRouter()
  // create
  .query("hello", {
    resolve() {
      return "yay stores!";
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string().min(1),
      colors: z.any().optional(),
      logo: z.string().optional(),
      email: z.string().optional(),
      mobile: z.string().optional(),
      address: z.string().optional(),
      deliveryChargeType: z.string().optional(),
      deliveryChargeData: z.any().optional(),
      serviceableArea: z.string().optional(),
    }),
    async resolve({ ctx, input }: { ctx: any; input: any }) {
      if (!input) return {};
      console.log("🚀 ~ file: stores.ts ~ line 22 ~ resolve ~ input", input);

      const stores = await ctx.prisma.stores.update({
        where: { id: input.id },
        data: { ...input },
      });
      return stores;
    },
  })
  .mutation("getAll", {
    async resolve({ input, ctx }) {
      const { user } = ctx;
      const allStores = await ctx.prisma.stores.findMany({});
      return allStores;
    },
  });
