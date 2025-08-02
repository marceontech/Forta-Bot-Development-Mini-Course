// Sample test for detect-flash-loan-agent
const { handleTransaction } = require("../src/agent");
const ethers = require("ethers");

describe("detect-flash-loan-agent tests", () => {
  it("should detect a flash loan event", async () => {
    const findings = await handleTransaction({
      transaction: { hash: "0x123" },
      from: "0xAttacker",
      to: "0xProtocol",
      filterEvent: () => [],
      filterLog: () => [
        {
          args: {
            target: "0xProtocol",
            initiator: "0xAttacker",
            asset: "0xUSDC",
            amount: ethers.BigNumber.from("500000000"), // 500M smallest units
            premium: 0,
            referralCode: 0
          }
        }
      ]
    });

    if (findings.length === 0) throw new Error("Expected a flash loan finding");
  });
});
