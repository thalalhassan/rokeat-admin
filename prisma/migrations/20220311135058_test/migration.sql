/*
  Warnings:

  - You are about to drop the `Shops` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'user';

-- DropTable
DROP TABLE "Shops";

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "images" TEXT[],
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);
