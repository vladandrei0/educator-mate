-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Categorieontema" (
    "temaId" INTEGER NOT NULL,
    "categorieId" INTEGER NOT NULL,

    PRIMARY KEY ("temaId","categorieId")
);

-- CreateTable
CREATE TABLE "CategorieTema" (
"id" SERIAL,
    "nume" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clasa" (
"id" SERIAL,
    "nume" TEXT NOT NULL,
    "oras" TEXT NOT NULL,
    "grupa" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Copil" (
"id" SERIAL,
    "nume" TEXT NOT NULL,
    "varsta" INTEGER NOT NULL,
    "clasaId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Domenii" (
"id" SERIAL,
    "nume" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filterterms" (
"id" SERIAL,
    "filter" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fisa" (
"id" SERIAL,
    "nume" TEXT NOT NULL,
    "clean_name" TEXT NOT NULL,
    "temeId" INTEGER,
    "lectieId" INTEGER,
    "domeniiId" INTEGER,
    "instructiuni" TEXT,
    "instructiuni_clean" TEXT,
    "materiale" TEXT,
    "poza" TEXT,
    "pdf" TEXT,
    "fisaId" INTEGER,
    "shares" INTEGER,
    "downloads" INTEGER,
    "likes" INTEGER,
    "tip_colorat" BOOLEAN NOT NULL DEFAULT false,
    "tip_decupat" BOOLEAN NOT NULL DEFAULT false,
    "tip_lipit" BOOLEAN NOT NULL DEFAULT false,
    "tip_scris" BOOLEAN NOT NULL DEFAULT false,
    "tip_puzzle" BOOLEAN NOT NULL DEFAULT false,
    "tip_poezie" BOOLEAN NOT NULL DEFAULT false,
    "tip_proiect" BOOLEAN NOT NULL DEFAULT false,
    "tip_poveste" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "grupa_mica" BOOLEAN NOT NULL DEFAULT false,
    "grupa_mij" BOOLEAN NOT NULL DEFAULT false,
    "grupa_mare" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fise_user" (
    "liked" BOOLEAN NOT NULL DEFAULT false,
    "no_shares" INTEGER NOT NULL DEFAULT 0,
    "no_dw" INTEGER NOT NULL DEFAULT 0,
    "no_views" INTEGER NOT NULL DEFAULT 0,
    "fisaId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("userId","fisaId")
);

-- CreateTable
CREATE TABLE "Lectie" (
"id" SERIAL,
    "nume" TEXT NOT NULL,
    "domeniiId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Searchterms" (
"id" SERIAL,
    "search" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teme" (
"id" SERIAL,
    "nume" TEXT NOT NULL,
    "clean" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descriere" TEXT,
    "poza" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teme_user" (
    "temaId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "liked" BOOLEAN NOT NULL DEFAULT false,
    "no_shares" INTEGER NOT NULL DEFAULT 0,
    "no_dw" INTEGER NOT NULL DEFAULT 0,
    "no_views" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("temaId","userId")
);

-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "fbuid" TEXT,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "address" TEXT,
    "last_visit" TIMESTAMP(3) NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL,
    "clasaId" INTEGER,
    "username" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Domenii.nume_unique" ON "Domenii"("nume");

-- CreateIndex
CREATE UNIQUE INDEX "Lectie.nume_unique" ON "Lectie"("nume");

-- CreateIndex
CREATE UNIQUE INDEX "Teme.nume_unique" ON "Teme"("nume");

-- CreateIndex
CREATE UNIQUE INDEX "User.fbuid_unique" ON "User"("fbuid");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Categorieontema" ADD FOREIGN KEY("categorieId")REFERENCES "CategorieTema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categorieontema" ADD FOREIGN KEY("temaId")REFERENCES "Teme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Copil" ADD FOREIGN KEY("clasaId")REFERENCES "Clasa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fisa" ADD FOREIGN KEY("domeniiId")REFERENCES "Domenii"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fisa" ADD FOREIGN KEY("fisaId")REFERENCES "Fisa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fisa" ADD FOREIGN KEY("lectieId")REFERENCES "Lectie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fisa" ADD FOREIGN KEY("temeId")REFERENCES "Teme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fise_user" ADD FOREIGN KEY("fisaId")REFERENCES "Fisa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fise_user" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lectie" ADD FOREIGN KEY("domeniiId")REFERENCES "Domenii"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teme_user" ADD FOREIGN KEY("temaId")REFERENCES "Teme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teme_user" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY("clasaId")REFERENCES "Clasa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
