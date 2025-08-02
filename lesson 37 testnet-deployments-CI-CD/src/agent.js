const { Finding, FindingSeverity, FindingType } = require("forta-agent");

function provideHandleTransaction() {
  return async function handleTransaction(txEvent) {
    const findings = [];

    // Simple logic: detect any transaction with non-zero value
    const value = txEvent.transaction.value || "0";
    if (value !== "0") {
      findings.push(Finding.fromObject({
        name: "Non-zero ETH Transaction",
        description: `Transaction from ${txEvent.from} to ${txEvent.to} with value ${value}`,
        alertId: "CI-CD-1",
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata: {
          from: txEvent.from,
          to: txEvent.to,
          value: value
        }
      }));
    }

    return findings;
  }
}

module.exports = {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction()
};
