-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rolId" INTEGER,
ADD COLUMN     "grupa_varsta" INTEGER;

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rol.role_name_unique" ON "Rol"("role_name");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE SET NULL ON UPDATE CASCADE;
