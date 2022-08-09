/*
  Warnings:

  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "Stores" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "colors" JSONB NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("id")
);
