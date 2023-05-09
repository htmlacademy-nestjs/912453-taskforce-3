/*
  Warnings:

  - The primary key for the `responses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `responses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "responses" DROP CONSTRAINT "responses_pkey",
DROP COLUMN "id",
ADD COLUMN     "response_id" SERIAL NOT NULL,
ADD CONSTRAINT "responses_pkey" PRIMARY KEY ("response_id");
