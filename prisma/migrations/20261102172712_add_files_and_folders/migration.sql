-- CreateTable
CREATE TABLE "folders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "originalname" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "folderid" INTEGER,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "folders_userid_idx" ON "folders"("userid");

-- CreateIndex
CREATE INDEX "files_userid_idx" ON "files"("userid");

-- CreateIndex
CREATE INDEX "files_folderid_idx" ON "files"("folderid");

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_folderid_fkey" FOREIGN KEY ("folderid") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
