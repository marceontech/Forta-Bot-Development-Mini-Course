const { handleTransaction } = require("../src/agent");
const ethers = require("ethers");

async function simulateTx() {
  const findings = await handleTransaction({
    transaction: { value: "0", hash: "0xabc" },
    from: "0x0000000000000000000000000000000000000000",
    to: "0x0000000000000000000000000000000000000000",
    filterEvent: () => [],
    filterLog: () => [
      {
        args: {
          from: "0xSender",
          to: "0xReceiver",
          value: ethers.utils.parseUnits("600000", 6) // 600,000 USDC
        }
      }
    ]
  });

  console.log(findings);
}

simulateTx();
