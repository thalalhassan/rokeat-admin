import prisma from "../../lib/prisma";
import * as trpc from "@trpc/server";
import jwt_decode from "jwt-decode";
// import { getSession } from "next-auth/client";

// const prisma = new PrismaClient({
//   log:
//     process.env.NODE_ENV === "development"
//       ? ["query", "error", "warn"]
//       : ["error"],
// });

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({ req, res }: { req: any; res: any }) => {
  //   const session = await getSession({ req });
  //   console.log("createContext for", session?.user?.name ?? "unknown user");

  // This is just an example of something you'd might want to do in your ctx fn
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const user = await jwt_decode(req.headers.authorization.split(" ")[1]);
      return user;
    }
    return null;
  }

  const user: any = (await getUserFromHeader()) || {};

  return {
    req,
    res,
    prisma,
    user,
    // session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
