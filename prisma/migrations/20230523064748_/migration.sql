-- AlterTable
ALTER TABLE "Admins" ADD COLUMN     "hasLogin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationCode" VARCHAR(6) NOT NULL DEFAULT '000000';
