import { createClient } from "@/tasks/create-client";

type TestCase = {
  name: string;
  input: [string, number?];
  response: { name: string; balance: number };
};

describe("Test createClient function", () => {
  const testCases: TestCase[] = [
    {
      name: "Test createClient function with normal data",
      input: ["Иван", 550],
      response: { name: "Иван", balance: 550 },
    },
    {
      name: "Test createClient function without balance",
      input: ["Иван"],
      response: { name: "Иван", balance: 0 },
    },
    {
      name: "Test createClient function with zero balane",
      input: ["Иван", 0],
      response: { name: "Иван", balance: 0 },
    },
    {
      name: "Test createClient function with negative balance",
      input: ["Иван", -1000],
      response: { name: "Иван", balance: 0 },
    },
  ];

  test.each(testCases)("$name", ({ input: [name, balance], response }) => {
    expect(createClient(name, balance)).toEqual(response);
  });

  test("Test createClient function with empty name", () => {
    expect(() => createClient("", 120)).toThrow();
  });
});
