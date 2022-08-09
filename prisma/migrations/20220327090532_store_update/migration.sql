/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customUrl]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobile]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stores" ADD COLUMN     "customUrl" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "logo" DROP NOT NULL,
ALTER COLUMN "colors" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stores_ownerId_key" ON "Stores"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Stores_name_key" ON "Stores"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Stores_url_key" ON "Stores"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Stores_customUrl_key" ON "Stores"("customUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Stores_email_key" ON "Stores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Stores_mobile_key" ON "Stores"("mobile");

-- AddForeignKey
ALTER TABLE "Stores" ADD CONSTRAINT "Stores_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variants" ADD CONSTRAINT "Variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
