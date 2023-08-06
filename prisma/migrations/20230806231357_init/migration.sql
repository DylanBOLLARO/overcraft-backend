-- DropForeignKey
ALTER TABLE "BuildName" DROP CONSTRAINT "BuildName_User_id_fkey";

-- AddForeignKey
ALTER TABLE "BuildName" ADD CONSTRAINT "BuildName_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
