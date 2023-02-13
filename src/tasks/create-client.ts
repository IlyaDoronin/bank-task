import type { Client } from "@/types/client";

export const createClient = (name: string, balance?: number): Client => {
  if (!name) {
    throw new Error("Name can't be empty");
  }

  if (typeof balance !== "number" || balance < 0) {
    balance = 0;
  }

  return { name, balance };
};
