const { handleTransaction } = require("../src/agent");

describe("lesson37-ci-cd-forta-bot tests", () => {
  it("should detect a non-zero ETH transaction", async () => {
    const findings = await handleTransaction({
      transaction: { value: "1", hash: "0x123" },
      from: "0xAlice",
      to: "0xBob",
      filterEvent: () => [],
      filterLog: () => []
    });

    if (findings.length === 0) throw new Error("Expected a finding");
  });

  it("should return no findings for zero-value tx", async () => {
    const findings = await handleTransaction({
      transaction: { value: "0", hash: "0x456" },
      from: "0xAlice",
      to: "0xBob",
      filterEvent: () => [],
      filterLog: () => []
    });

    if (findings.length !== 0) throw new Error("Expected no findings");
  });
});
