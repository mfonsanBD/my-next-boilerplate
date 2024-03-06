-- CreateTable
CREATE TABLE "WorksInProgress" (
    "id" TEXT NOT NULL,
    "constructionManagerId" TEXT NOT NULL,
    "infractionNoticeNumber" TEXT NOT NULL,
    "infractionNoticeFile" TEXT NOT NULL,
    "intimationNumber" TEXT NOT NULL,
    "intimationFile" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "WorksInProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorksInProgress" ADD CONSTRAINT "WorksInProgress_constructionManagerId_fkey" FOREIGN KEY ("constructionManagerId") REFERENCES "ConstructionManager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
