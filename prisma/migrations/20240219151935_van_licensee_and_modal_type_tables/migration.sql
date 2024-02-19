-- CreateTable
CREATE TABLE "VanLicenseeModalType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VanLicenseeModalType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VanLicensee" (
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
    "modalTypeId" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VanLicensee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VanLicensee_cpf_key" ON "VanLicensee"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "VanLicensee_email_key" ON "VanLicensee"("email");

-- AddForeignKey
ALTER TABLE "VanLicensee" ADD CONSTRAINT "VanLicensee_modalTypeId_fkey" FOREIGN KEY ("modalTypeId") REFERENCES "VanLicenseeModalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
