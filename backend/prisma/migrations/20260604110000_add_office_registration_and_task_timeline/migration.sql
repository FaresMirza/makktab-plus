ALTER TABLE "Office"
ADD COLUMN "city" TEXT,
ADD COLUMN "registrationNumber" TEXT;

ALTER TABLE "OfficeRequest"
ADD COLUMN "registrationNumber" TEXT NOT NULL DEFAULT '';

ALTER TABLE "Task"
ADD COLUMN "startAt" TIMESTAMP(3),
ADD COLUMN "endAt" TIMESTAMP(3);

UPDATE "OfficeRequest"
SET "registrationNumber" = COALESCE(NULLIF("registrationNumber", ''), 'UNSPECIFIED');

ALTER TABLE "OfficeRequest"
ALTER COLUMN "registrationNumber" DROP DEFAULT;
