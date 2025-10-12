/*
  Warnings:

  - You are about to drop the column `alturaFlancoT` on the `Pneus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pneus" DROP COLUMN "alturaFlancoT",
ADD COLUMN     "estepe" TEXT;
