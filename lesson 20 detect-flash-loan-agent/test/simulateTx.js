const { handleTransaction } = require("../src/agent");
const ethers = require("ethers");

async function simulateFlashLoan() {
  const findings = await handleTransaction({
    transaction: { hash: "0xabc" },
    from: "0xInitiator",
    to: "0xLendingProtocol",
    filterEvent: () => [],
    filterLog: () => [
      {
        args: {
          target: "0xLendingProtocol",
          initiator: "0xAttacker",
          asset: "0xUSDC",
          amount: ethers.BigNumber.from("5000000000000"), // 5,000,000 USDC (6 decimals)
          premium: 0,
          referralCode: 0
        }
      }
    ]
  });

  console.log(findings);
}

simulateFlashLoan();
