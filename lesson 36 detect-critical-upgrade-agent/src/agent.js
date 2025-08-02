// Sample agent logic for detect-critical-upgrade-agent
const { Finding, FindingSeverity, FindingType } = require("forta-agent");

function provideHandleTransaction() {
  return async function handleTransaction(txEvent) {
    const findings = [];

    // Detect Upgrade event (common in OpenZeppelin Transparent Proxy)
    const upgradeEvents = txEvent.filterLog(
      "event Upgraded(address indexed implementation)"
    );

    upgradeEvents.forEach((log) => {
      findings.push(Finding.fromObject({
        name: "Contract Upgrade Detected",
        description: `Contract upgraded to implementation ${log.args.implementation}`,
        alertId: "UPGRADE-1",
        severity: FindingSeverity.High,
        type: FindingType.Suspicious,
        metadata: {
          implementation: log.args.implementation,
          txHash: txEvent.transaction.hash
        }
      }));
    });

    return findings;
  }
}

module.exports = {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction()
};
