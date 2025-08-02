// Sample test for detect-external-agent-alerts
const { handleAlert } = require("../src/agent");

describe("detect-external-agent-alerts tests", () => {
  it("should return a finding when receiving the monitored alert", async () => {
    const findings = await handleAlert({
      alert: {
        alertId: "HIGH-ETH-1",
        source: { bot: { id: "0xTestBot" } }
      }
    });

    if (findings.length === 0) throw new Error("Expected a finding");
  });

  it("should return no findings for a different alert", async () => {
    const findings = await handleAlert({
      alert: {
        alertId: "SOME-OTHER-ALERT",
        source: { bot: { id: "0xAnotherBot" } }
      }
    });

    if (findings.length !== 0) throw new Error("Expected no findings");
  });
});

