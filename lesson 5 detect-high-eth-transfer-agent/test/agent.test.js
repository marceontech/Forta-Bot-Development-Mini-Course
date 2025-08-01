// Sample test for detect-high-eth-transfer-agent

const { handleTransaction } = require("../src/agent");

describe("detect-large-usdc-transfer-agent tests", () => {
  it("should return no findings for empty tx", async () => {
    const findings = await handleTransaction({
      transaction: { value: "0" },
      from: "0x0",
      to: "0x0",
      filterEvent: () => [],
      filterLog: () => []
    });
    if(findings.length !== 0) throw new Error("Expected no findings");
  });
});

