const { handleTransaction } = require("../src/agent");

describe("High ETH Transfer Agent", () => {
  it("should detect high ETH transfer", async () => {
    const txEvent = {
      traces: [
        {
          action: {
            value: (1001 * 1e18).toString()
          }
        }
      ]
    };

    const findings = await handleTransaction(txEvent);
    console.log(findings);
  });
});
