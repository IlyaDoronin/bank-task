import { createBank } from "@/tasks/create-bank";

import { CLIENTS } from "@/__dummies__/clients.dummy";

import type { Client } from "@/types/client";

type TestCase = {
  name: string;
  input: [string, Client[]?];
  response: {
    bankName: string;
    clients: Client[];
    addClient: (client: Client) => boolean;
    removeClient: (client: Client) => boolean;
  };
};

describe("Test createBank function", () => {
  const testCases: TestCase[] = [
    {
      name: "Test createBank function with correct input data",
      input: ["Сбербанк", CLIENTS],
      response: {
        bankName: "Сбербанк",
        clients: CLIENTS,
        addClient: (client) => true,
        removeClient: (client) => true,
      },
    },
    {
      name: "Test createBank function without clients",
      input: ["Белагропромбанк"],
      response: {
        bankName: "Белагропромбанк",
        clients: [],
        addClient: (client) => true,
        removeClient: (client) => true,
      },
    },
    {
      name: "Test createBank function with empty client",
      input: ["Белагропромбанк", []],
      response: {
        bankName: "Белагропромбанк",
        clients: [],
        addClient: (client) => true,
        removeClient: (client) => true,
      },
    },
  ];

  test.each(testCases)("$name", ({ input: [name, initClients], response }) => {
    const { bankName, clients, addClient, removeClient } = createBank(name, initClients);

    expect(bankName).toBe(response.bankName);
    expect(clients).toEqual(response.clients);
    expect(typeof addClient).toBe("function");
    expect(typeof removeClient).toBe("function");
  });
});
