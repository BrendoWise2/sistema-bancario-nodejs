-- AlterTable
ALTER TABLE "public"."transactions" ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
