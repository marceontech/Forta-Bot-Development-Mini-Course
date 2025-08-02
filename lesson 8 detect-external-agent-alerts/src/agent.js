// Sample agent logic for detect-external-agent-alerts
const { Finding, FindingSeverity, FindingType } = require("forta-agent");

// We'll monitor this alertId from another bot
const MONITORED_ALERT_ID = "HIGH-ETH-1"; 

function provideHandleAlert(monitoredAlertId) {
  return async function handleAlert(alertEvent) {
    const findings = [];

    if (alertEvent.alert.alertId === monitoredAlertId) {
      findings.push(Finding.fromObject({
        name: "Follow-up Alert",
        description: `Received alert ${monitoredAlertId} from bot ${alertEvent.alert.source.bot.id}`,
        alertId: "EXTERNAL-ALERT-1",
        severity: FindingSeverity.Low,
        type: FindingType.Info,
        metadata: {
          sourceBot: alertEvent.alert.source.bot.id,
          originalAlertId: alertEvent.alert.alertId
        }
      }));
    }

    return findings;
  }
}

module.exports = {
  provideHandleAlert,
  handleAlert: provideHandleAlert(MONITORED_ALERT_ID)
};
