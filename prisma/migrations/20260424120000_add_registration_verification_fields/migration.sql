-- AlterTable
ALTER TABLE "OfficeRequest" ADD COLUMN "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "verificationCodeHash" TEXT,
ADD COLUMN "verificationAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "verificationExpiresAt" TIMESTAMP(3);
