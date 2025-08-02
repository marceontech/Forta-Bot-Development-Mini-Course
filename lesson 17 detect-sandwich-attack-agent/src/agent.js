// Sample agent logic for detect-sandwich-attack-agent
const { Finding, FindingSeverity, FindingType } = require("forta-agent");

function provideHandleBlock() {
  return async function handleBlock(blockEvent) {
    const findings = [];
    const txs = blockEvent.block.transactions || [];

    // Scan triplets of transactions for the sandwich pattern
    for (let i = 0; i < txs.length - 2; i++) {
      const txA = txs[i];
      const txB = txs[i + 1];
      const txC = txs[i + 2];

      // Simplified pattern: first and last tx from same address, middle is different
      if (txA.from === txC.from && txA.from !== txB.from) {
        findings.push(Finding.fromObject({
          name: "Possible Sandwich Attack",
          description: `Front-run by ${txA.from}, victim ${txB.from}, back-run in same block`,
          alertId: "SANDWICH-1",
          severity: FindingSeverity.Medium,
          type: FindingType.Exploit,
          metadata: {
            attacker: txA.from,
            victim: txB.from,
            block: blockEvent.blockNumber
          }
        }));
      }
    }

    return findings;
  }
}

module.exports = {
  provideHandleBlock,
  handleBlock: provideHandleBlock()
};
