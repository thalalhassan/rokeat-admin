/**
 * This file contains the root router of your tRPC-backend
 */
import { Subscription, TRPCError } from "@trpc/server";
import { clearInterval } from "timers";
import { createRouter } from "../createRouter";
import { productsRouter } from "./products";
import { storesRouter } from "./stores";
import { authRouter } from "./auth";
import { categoriesRouter } from "./categories";
//  import superjson from 'superjson';

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  //    .transformer(superjson)
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  .query("health", {
    resolve() {
      return "Am still alive :) !";
    },
  })
  .merge("auth.", authRouter)
  .middleware(async ({ ctx, next }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .merge("stores.", storesRouter)
  .merge("products.", productsRouter)
  .merge("categories.", categoriesRouter)
  .subscription("randomNumber", {
    resolve() {
      return new Subscription<number>((emit) => {
        const int = setInterval(() => {
          emit.data(Math.random());
        }, 500);
        return () => {
          clearInterval(int);
        };
      });
    },
  });

export type AppRouter = typeof appRouter;
