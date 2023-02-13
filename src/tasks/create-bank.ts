import type { Client } from "@/types/client";

type CreateBankResult = {
  bankName: string;
  clients: Client[];
  addClient: (client: Client) => boolean;
  removeClient: (name: Client) => boolean;
};

export const createBank = (bankName: string, clients?: Client[] = []): CreateBankResult => {};
