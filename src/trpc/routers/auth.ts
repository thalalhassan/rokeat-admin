import { z } from "zod";
import { createRouter } from "../createRouter";
import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";

import CryptoJS from "crypto-js";

export const authRouter = createRouter()
  // create
  .query("hello", {
    resolve() {
      return "yay auth!";
    },
  })
  .mutation("signup", {
    input: z.object({
      name: z.string().min(1),
      email: z.string().min(1),
      mobile: z.string().min(10),
      avatar: z.string(),
      password: z.string().min(8),
      storeName: z.string(),
      storeUrl: z.string(),
    }),
    async resolve({ ctx, input }) {
      const privateKey = process.env.NEXT_PUBLIC_HASH_KEY || "";
      const hashedPassword = CryptoJS.AES.encrypt(
        input.password,
        privateKey
      ).toString();

      const { storeName, storeUrl, ...userInput } = input;

      const users = await ctx.prisma.users.create({
        data: {
          ...userInput,
          password: hashedPassword,
          store: {
            create: {
              name: storeName,
              url: storeUrl,
            },
          },
        },
        include: {
          store: true,
        },
      });

      const payload = {
        id: users.id,
        storeId: users.store?.id,
        storeName: users.store?.name,
        email: users.email,
        createdAt: users.createdAt,
      };
      /* Sign token */
      const token = jwt.sign(
        payload,
        process.env.NEXT_PUBLIC_JWT_KEY || "default#53",
        {
          expiresIn: 31556926, // 1 year in seconds
        }
      );
      return {
        token: "Bearer " + token,
      };
    },
  })
  .mutation("signin", {
    input: z.object({
      email: z.string().min(1),
      password: z.string().min(1),
    }),
    async resolve({ ctx, input }) {
      const users = await ctx.prisma.users.findFirst({
        where: { email: input.email },
        include: {
          store: true,
        },
      });

      if (!users) {
        return {
          success: false,
          message: "Wrong credentials",
        };
      }

      const privateKey = process.env.NEXT_PUBLIC_HASH_KEY || "";
      const bytes = CryptoJS.AES.decrypt(users.password, privateKey);
      const passwordTest = bytes.toString(CryptoJS.enc.Utf8);

      if (passwordTest !== input.password) {
        return {
          success: false,
          message: "Wrong credentials",
        };
      }

      const payload = {
        id: users.id,
        storeId: users.store?.id,
        storeName: users.store?.name,
        email: users.email,
        createdAt: users.mobile,
      };
      /* Sign token */
      const token = jwt.sign(
        payload,
        process.env.NEXT_PUBLIC_JWT_KEY || "default#53",
        {
          expiresIn: 31556926, // 1 year in seconds
        }
      );
      return {
        success: true,
        message: "Success",
        token: "Bearer " + token,
      };
    },
  });
