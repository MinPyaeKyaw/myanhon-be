-- DropIndex
DROP INDEX "Users_email_key";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "otpCode" DROP DEFAULT,
ALTER COLUMN "otpCode" SET DATA TYPE TEXT;
