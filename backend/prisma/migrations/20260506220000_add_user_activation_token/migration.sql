-- Add nullable activation-token columns to User. Used by the
-- link-based first-login flow that replaced the OTP flow.
ALTER TABLE "User" ADD COLUMN "activationTokenHash" TEXT;
ALTER TABLE "User" ADD COLUMN "activationTokenExpiresAt" TIMESTAMP(3);
