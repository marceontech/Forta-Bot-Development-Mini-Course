const { handleTransaction } = require("../src/agent");
const ethers = require("ethers");

async function simulateTx() {
  const findings = await handleTransaction({
    transaction: {
      value: ethers.utils.parseEther('2000').toString(),
      hash: '0x123'
    },
    from: '0xAttackerAddress',
    to: '0xVictimAddress',
    filterEvent: () => [],
    filterLog: () => []
  });

  console.log(findings);
}

simulateTx();
