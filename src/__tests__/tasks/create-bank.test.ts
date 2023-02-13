import { createBank } from "@/tasks/create-bank";

import { CLIENTS } from "@/__dummies__/clients.dummy";
import { CLIENTS_ADDED, CLIENTS_REMOVED } from "@/__stubs__/clients.stub";

import type { Client } from "@/types/client";

type TestCase = {
  name: string;
  input: [string, Client[]?];
  response: {
    bankName: string;
    clients: Client[];
    addClient: (client: Client) => boolean;
    removeClient: (name: Client) => boolean;
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
        removeClient: (name) => true,
      },
    },
    {
      name: "Test createBank function without clients",
      input: ["Белагропромбанк"],
      response: {
        bankName: "Белагропромбанк",
        clients: [],
        addClient: (client) => true,
        removeClient: (name) => true,
      },
    },
    {
      name: "Test createBank function with empty client",
      input: ["Белагропромбанк", []],
      response: {
        bankName: "Белагропромбанк",
        clients: [],
        addClient: (client) => true,
        removeClient: (name) => true,
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

  test("Test createBank function with emptyBankName", () => {
    expect(() => createBank("")).toThrow();
  });
});

describe("Test subfunction addClient", () => {
  test("Add new client", () => {
    const { clients, addClient } = createBank("Сбербанк", CLIENTS);

    addClient({ name: "Николай-1672571471111", balance: 0 });
    expect(clients).toEqual(CLIENTS_ADDED);
  });

  test("Add several of the same new client", () => {
    const { clients, addClient } = createBank("Сбербанк", CLIENTS);

    expect(addClient({ name: "Николай-1672571471111", balance: 0 })).toBe(true);
    expect(() => addClient({ name: "Николай-1672571471111", balance: 0 })).toThrow();
    expect(clients).toEqual(CLIENTS_ADDED);
  });
});

describe("Test subfunction removeClient", () => {
  test("Remove existing client", () => {
    const { clients, removeClient } = createBank("Сбербанк", CLIENTS);

    expect(removeClient("Иван-1672571471111")).toBe(true);
    expect(clients).toEqual(CLIENTS_REMOVED);
  });

  test("Remove non existing client", () => {
    const { clients, removeClient } = createBank("Сбербанк", CLIENTS);

    expect(() => removeClient("Вадим-1672571471111")).toThrow();
    expect(clients).toEqual(CLIENTS);
  });
});
