/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categroyId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommended` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actaulPrice` to the `Variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommended` to the `Variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellingPrice` to the `Variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "categroyId" TEXT NOT NULL,
ADD COLUMN     "couponIds" TEXT[],
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "recommended" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "Variants" ADD COLUMN     "actaulPrice" INTEGER NOT NULL,
ADD COLUMN     "recommended" BOOLEAN NOT NULL,
ADD COLUMN     "sellingPrice" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categroyId_fkey" FOREIGN KEY ("categroyId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
