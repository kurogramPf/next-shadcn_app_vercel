import { PrismaClient } from "@prisma/client";

declare global {
  var cachePrisma: PrismaClient;
}

let prisma: PrismaClient;

// process.env.NODE_ENVでプロダクションであるかを判定できる
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachePrisma) {
    global.cachePrisma = new PrismaClient();
  }
  prisma = global.cachePrisma;
}

export const db = prisma;
