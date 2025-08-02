// Sample agent logic for detect-flash-loan-agent
const { Finding, FindingSeverity, FindingType } = require("forta-agent");

function provideHandleTransaction() {
  return async function handleTransaction(txEvent) {
    const findings = [];

    // Example FlashLoan event (Aave V2 style)
    const flashLoanEvents = txEvent.filterLog(
      "event FlashLoan(address indexed target, address indexed initiator, address indexed asset, uint256 amount, uint256 premium, uint16 referralCode)"
    );

    flashLoanEvents.forEach((log) => {
      findings.push(Finding.fromObject({
        name: "Flash Loan Detected",
        description: `Flash loan of ${log.args.amount.toString()} from ${log.args.initiator}`,
        alertId: "FLASH-LOAN-1",
        severity: FindingSeverity.Medium,
        type: FindingType.Suspicious,
        metadata: {
          initiator: log.args.initiator,
          asset: log.args.asset,
          amount: log.args.amount.toString()
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
