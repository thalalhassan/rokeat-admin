-- AlterTable
ALTER TABLE "Stores" ADD COLUMN     "address" TEXT,
ADD COLUMN     "deliveryChargeData" JSONB,
ADD COLUMN     "deliveryChargeType" TEXT,
ADD COLUMN     "serviceableArea" TEXT;
