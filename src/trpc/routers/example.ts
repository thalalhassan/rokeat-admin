/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { z } from "zod";
import { createRouter } from "../createRouter";
import { Context } from "../context";
import { EventEmitter } from "events";
import { Subscription } from "@trpc/server";
import { Products } from "@prisma/client";

interface MyEvents {
  add: (data: Products) => void;
  isTypingUpdate: () => void;
}
declare interface MyEventEmitter {
  on<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
  once<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
  emit<U extends keyof MyEvents>(
    event: U,
    ...args: Parameters<MyEvents[U]>
  ): boolean;
}
class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter();

// who is currently typing, key is `name`
const currentlyTyping: Record<string, { lastTyped: Date }> =
  Object.create(null);

// every 1s, clear old "isTyping"
const interval = setInterval(() => {
  let updated = false;
  const now = Date.now();
  for (const [key, value] of Object.entries(currentlyTyping)) {
    if (now - value.lastTyped.getTime() > 3e3) {
      delete currentlyTyping[key];
      updated = true;
    }
  }
  if (updated) {
    ee.emit("isTypingUpdate");
  }
}, 3e3);
process.on("SIGTERM", () => clearInterval(interval));

const getNameOrThrow = (ctx: Context) => {
  //   const name = ctx.session?.user?.name;
  //   if (!name) {
  //     throw new TRPCError({ code: "FORBIDDEN" });
  //   }
  return "hello";
};
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
      brand: z.string().min(1),
    }),
    async resolve({ ctx, input }) {
      const name = getNameOrThrow(ctx);
      const products = await ctx.prisma.products.create({
        data: {
          ...input,
          images: ["test", 'test'],
        },
      });
      ee.emit("add", products);
      delete currentlyTyping[name];
      ee.emit("isTypingUpdate");
      return products;
    },
  })
  .mutation("isTyping", {
    input: z.object({
      typing: z.boolean(),
    }),
    resolve({ input, ctx }) {
      const name = getNameOrThrow(ctx);
      if (!input.typing) {
        delete currentlyTyping[name];
      } else {
        currentlyTyping[name] = {
          lastTyped: new Date(),
        };
      }
      ee.emit("isTypingUpdate");
    },
  })
  .query("infinite", {
    input: z.object({
      cursor: z.string().nullish(),
      take: z.number().min(1).max(50).nullish(),
    }),
    async resolve({ input, ctx }) {
      const take = input.take ?? 10;
      const cursor = input.cursor;
      // `cursor` is of type `Date | undefined`
      // `take` is of type `number | undefined`
      const page = await ctx.prisma.products.findMany({
        orderBy: {
          createdAt: "desc",
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        take: take + 1,
        skip: 0,
      });
      const items = page.reverse();
      let prevCursor: null | typeof cursor = null;
      if (items.length > take) {
        const prev = items.shift();
        prevCursor = prev!.id;
      }
      return {
        items,
        prevCursor,
      };
    },
  })
  .subscription("onAdd", {
    resolve() {
      return new Subscription<Products>((emit) => {
        const onAdd = (data: Products) => emit.data(data);
        ee.on("add", onAdd);
        return () => {
          ee.off("add", onAdd);
        };
      });
    },
  })
  .subscription("whoIsTyping", {
    resolve() {
      let prev: string[] | null = null;
      return new Subscription<string[]>((emit) => {
        const onIsTypingUpdate = () => {
          const newData = Object.keys(currentlyTyping);

          if (!prev || prev.toString() !== newData.toString()) {
            emit.data(newData);
          }
          prev = newData;
        };
        ee.on("isTypingUpdate", onIsTypingUpdate);
        return () => {
          ee.off("isTypingUpdate", onIsTypingUpdate);
        };
      });
    },
  });
