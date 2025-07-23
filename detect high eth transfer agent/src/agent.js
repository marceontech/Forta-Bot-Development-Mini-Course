const { Finding, FindingSeverity, FindingType } = require("forta-agent");

function handleTransaction(txEvent) {
  const findings = [];

  const largeTransfers = txEvent.traces.filter(trace =>
    trace.action.value && parseInt(trace.action.value) > 1000 * 1e18
  );

  if (largeTransfers.length > 0) {
    findings.push(Finding.fromObject({
      name: "High ETH Transfer",
      description: "Transaction contains a high ETH transfer",
      alertId: "HIGH-ETH-TRANSFER",
      severity: FindingSeverity.Medium,
      type: FindingType.Suspicious,
      metadata: {
        count: largeTransfers.length.toString()
      }
    }));
  }

  return findings;
}

module.exports = {
  handleTransaction,
};
