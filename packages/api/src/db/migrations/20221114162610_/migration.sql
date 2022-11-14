/*
  Warnings:

  - The `age_rating` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `age_rating` column on the `Show` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Show` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `Log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "type",
ADD COLUMN     "type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "age_rating",
ADD COLUMN     "age_rating" "AgeRating",
DROP COLUMN "status",
ADD COLUMN     "status" "Status" DEFAULT 'PLANNED';

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "age_rating",
ADD COLUMN     "age_rating" "AgeRating",
DROP COLUMN "status",
ADD COLUMN     "status" "Status" DEFAULT 'PLANNED';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
