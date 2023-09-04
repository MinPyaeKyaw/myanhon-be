/*
  Warnings:

  - You are about to drop the column `isEmailVerified` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "isEmailVerified",
DROP COLUMN "verificationCode",
ADD COLUMN     "otpCode" VARCHAR(6) NOT NULL DEFAULT '000000';

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");
