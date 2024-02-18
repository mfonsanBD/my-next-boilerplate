/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "StreetVendorActivityType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StreetVendorActivityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreetVendor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "complement" TEXT,
    "number" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "activityTypeId" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StreetVendor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StreetVendor_cpf_key" ON "StreetVendor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "StreetVendor_email_key" ON "StreetVendor"("email");

-- AddForeignKey
ALTER TABLE "StreetVendor" ADD CONSTRAINT "StreetVendor_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "StreetVendorActivityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
