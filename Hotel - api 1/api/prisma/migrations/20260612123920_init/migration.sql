/*
  Warnings:

  - A unique constraint covering the columns `[numeroQuarto]` on the table `Quarto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Quarto_numeroQuarto_key` ON `Quarto`(`numeroQuarto`);
