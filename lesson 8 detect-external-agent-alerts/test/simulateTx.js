const { handleAlert } = require("../src/agent");

async function simulateAlert() {
  const findings = await handleAlert({
    alert: {
      alertId: "HIGH-ETH-1",
      source: { bot: { id: "0xBotIDExample" } }
    }
  });

  console.log(findings);
}

simulateAlert();
