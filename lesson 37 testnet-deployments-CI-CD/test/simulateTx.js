const { handleTransaction } = require("../src/agent");

async function simulateTx() {
  const findings = await handleTransaction({
    transaction: { value: "12345", hash: "0xSimulated" },
    from: "0xAlice",
    to: "0xBob",
    filterEvent: () => [],
    filterLog: () => []
  });

  console.log(findings);
}

simulateTx();
