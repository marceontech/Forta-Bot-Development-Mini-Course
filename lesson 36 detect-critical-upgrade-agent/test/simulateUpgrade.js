const { handleTransaction } = require("../src/agent");

async function simulateUpgrade() {
  const findings = await handleTransaction({
    transaction: { hash: "0xabc" },
    from: "0xAdmin",
    to: "0xProxyContract",
    filterEvent: () => [],
    filterLog: () => [
      {
        args: {
          implementation: "0xNewImplementationABCDEF123"
        }
      }
    ]
  });

  console.log(findings);
}

simulateUpgrade();
