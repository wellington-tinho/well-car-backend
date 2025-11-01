import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import prisma from "../src/lib/prisma.ts";

async function main() {

  console.log('Cleaning database...');
  await prisma.carRanking.deleteMany();
  await prisma.carro.deleteMany();
  await prisma.rankingSystem.deleteMany();

  const filePath = path.join(process.cwd(), './prisma/data-seed.json');
  console.log(filePath)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const carData of data) {
    await prisma.carro.create({
      data: carData,
    });
  }

  console.log('Database has been seeded successfully.');

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });