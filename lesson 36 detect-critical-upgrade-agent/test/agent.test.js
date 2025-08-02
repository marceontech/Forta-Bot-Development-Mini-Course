// Sample test for detect-critical-upgrade-agent
const { handleTransaction } = require("../src/agent");

describe("detect-critical-upgrade-agent tests", () => {
  it("should detect a contract upgrade event", async () => {
    const findings = await handleTransaction({
      transaction: { hash: "0x123" },
      from: "0xAdmin",
      to: "0xProxyContract",
      filterEvent: () => [],
      filterLog: () => [
        {
          args: {
            implementation: "0xNewImplementation123456789"
          }
        }
      ]
    });

    if (findings.length === 0) throw new Error("Expected a contract upgrade finding");
  });

  it("should return no findings when no upgrade event exists", async () => {
    const findings = await handleTransaction({
      transaction: { hash: "0x456" },
      from: "0xAdmin",
      to: "0xProxyContract",
      filterEvent: () => [],
      filterLog: () => []
    });

    if (findings.length !== 0) throw new Error("Expected no findings");
  });
});
