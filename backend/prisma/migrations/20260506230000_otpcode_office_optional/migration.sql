-- Make OtpCode.officeId optional. Platform admins (admin / super_admin)
-- don't belong to any office, so requiring an officeId on every OTP
-- broke login flows for admins after offices were wiped.
ALTER TABLE "OtpCode" ALTER COLUMN "officeId" DROP NOT NULL;
