-- CreateTable
CREATE TABLE "ISS" (
    "id" TEXT NOT NULL,
    "corporateReason" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "ISS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IPTU" (
    "id" TEXT NOT NULL,
    "corporateReason" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "IPTU_pkey" PRIMARY KEY ("id")
);
