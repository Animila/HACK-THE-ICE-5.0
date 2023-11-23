/*
  Warnings:

  - Changed the type of `default_day` on the `SubCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "default_day",
ADD COLUMN     "default_day" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "ChangeItem" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChangeItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChangeItem" ADD CONSTRAINT "ChangeItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
