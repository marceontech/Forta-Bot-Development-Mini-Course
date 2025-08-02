// Sample agent logic for detect-large-usdc-transfer-agent
const { Finding, FindingSeverity, FindingType } = require("forta-agent");
const ethers = require("ethers");

// 500,000 USDC in smallest unit (6 decimals)
const MINIMUM_VALUE = ethers.utils.parseUnits('500000', 6); 

function provideHandleTransaction(threshold) {
  return async function handleTransaction(txEvent) {
    const findings = [];

    // Listen for ERC-20 Transfer events
    const transferEvents = txEvent.filterLog(
      "event Transfer(address indexed from, address indexed to, uint256 value)"
    );

    transferEvents.forEach((log) => {
      const value = log.args.value;

      if (value.gte(threshold)) {
        findings.push(Finding.fromObject({
          name: "Large USDC Transfer",
          description: `Transfer of ${ethers.utils.formatUnits(value, 6)} USDC from ${log.args.from} to ${log.args.to}`,
          alertId: "USDC-LARGE-1",
          severity: FindingSeverity.Medium,
          type: FindingType.Suspicious,
          metadata: {
            from: log.args.from,
            to: log.args.to,
            value: ethers.utils.formatUnits(value, 6)
          }
        }));
      }
    });

    return findings;
  }
}

module.exports = {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(MINIMUM_VALUE)
};
