// Sample agent logic for detect-high-eth-transfer-agent

const { Finding, FindingSeverity, FindingType } = require("forta-agent");
const ethers = require("ethers");

const MINIMUM_VALUE = ethers.utils.parseUnits('500000', 6); // threshold value

function provideHandleTransaction(threshold) {
  return async function handleTransaction(txEvent) {
    const findings = [];

    // Detect large native ETH transfer
    const value = ethers.BigNumber.from(txEvent.transaction.value || "0");
    if (value.gte(threshold)) {
      findings.push(Finding.fromObject({
        name: "High ETH Transfer",
        description: `High ETH transfer of ${ethers.utils.formatEther(value)} ETH from ${txEvent.from} to ${txEvent.to}`,
        alertId: "HIGH-ETH-1",
        severity: FindingSeverity.Medium,
        type: FindingType.Suspicious,
        metadata: {
          from: txEvent.from,
          to: txEvent.to,
          value: ethers.utils.formatEther(value)
        }
      }));
    }
    return findings;
  }
}

module.exports = {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(MINIMUM_VALUE)
};
