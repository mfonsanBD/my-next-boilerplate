-- AlterTable
ALTER TABLE "ConstructionManager" ALTER COLUMN "number" DROP NOT NULL,
ALTER COLUMN "complement" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EmbargoedWorks" ALTER COLUMN "number" DROP NOT NULL,
ALTER COLUMN "complement" DROP NOT NULL;
