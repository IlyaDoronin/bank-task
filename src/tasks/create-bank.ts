import type { Client } from "@/types/client";

type CreateBankResult = {
  bankName: string;
  clients: Client[];
  addClient: (client: Client) => boolean;
  removeClient: (client: Client) => boolean;
};

export const createBank = (bankName: string, clients?: Client[] = []): CreateBankResult => {};
