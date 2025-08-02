// Sample test for detect-sandwich-attack-agent
const { handleBlock } = require("../src/agent");

describe("detect-sandwich-attack-agent tests", () => {
  it("should detect a sandwich pattern in a block", async () => {
    const findings = await handleBlock({
      blockNumber: 12345,
      block: {
        transactions: [
          { from: "0xAttacker", to: "0xDEX" },   // Front-run
          { from: "0xVictim", to: "0xDEX" },     // Victim
          { from: "0xAttacker", to: "0xDEX" }    // Back-run
        ]
      }
    });

    if (findings.length === 0) throw new Error("Expected a sandwich attack finding");
  });

  it("should return no findings for non-sandwich patterns", async () => {
    const findings = await handleBlock({
      blockNumber: 12346,
      block: {
        transactions: [
          { from: "0xAlice", to: "0xDEX" },
          { from: "0xBob", to: "0xDEX" },
          { from: "0xCharlie", to: "0xDEX" }
        ]
      }
    });

    if (findings.length !== 0) throw new Error("Expected no findings");
  });
});
