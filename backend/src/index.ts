import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

async function checkConnection() {
  // Verifica si la base de datos está conectada
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (e) {
    console.error("Database connection failed", e);
  }
}

checkConnection()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}... aunque docker  lo se`);
});
