-- CreateEnum
CREATE TYPE "ConstructionManagerType" AS ENUM ('MEIOAMBIENTE', 'URBANISMO');

-- CreateTable
CREATE TABLE "ConstructionManager" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "ConstructionManagerType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConstructionManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmbargoedWorks" (
    "id" TEXT NOT NULL,
    "constructionManagerId" TEXT NOT NULL,
    "embargoNumber" TEXT NOT NULL,
    "embargoFile" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "EmbargoedWorks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConstructionManager_document_key" ON "ConstructionManager"("document");

-- AddForeignKey
ALTER TABLE "EmbargoedWorks" ADD CONSTRAINT "EmbargoedWorks_constructionManagerId_fkey" FOREIGN KEY ("constructionManagerId") REFERENCES "ConstructionManager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
