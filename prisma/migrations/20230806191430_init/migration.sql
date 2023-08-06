-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(55) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildName" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "desc" VARCHAR(150),
    "playrace" INTEGER NOT NULL,
    "versusrace" INTEGER NOT NULL,
    "User_id" INTEGER NOT NULL,

    CONSTRAINT "BuildName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildStep" (
    "id" SERIAL NOT NULL,
    "desc" VARCHAR(150) NOT NULL,
    "population" INTEGER NOT NULL,
    "timer" INTEGER NOT NULL,
    "buildName_id" INTEGER NOT NULL,

    CONSTRAINT "BuildStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "BuildName" ADD CONSTRAINT "BuildName_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildStep" ADD CONSTRAINT "BuildStep_buildName_id_fkey" FOREIGN KEY ("buildName_id") REFERENCES "BuildName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
