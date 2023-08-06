-- DropForeignKey
ALTER TABLE "BuildName" DROP CONSTRAINT "BuildName_User_id_fkey";

-- DropForeignKey
ALTER TABLE "BuildStep" DROP CONSTRAINT "BuildStep_buildName_id_fkey";

-- AddForeignKey
ALTER TABLE "BuildName" ADD CONSTRAINT "BuildName_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildStep" ADD CONSTRAINT "BuildStep_buildName_id_fkey" FOREIGN KEY ("buildName_id") REFERENCES "BuildName"("id") ON DELETE CASCADE ON UPDATE CASCADE;
