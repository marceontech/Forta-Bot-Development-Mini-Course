const { handleBlock } = require("../src/agent");

async function simulateBlock() {
  const blockEvent = {
    blockNumber: 98765,
    block: {
      transactions: [
        { from: "0xAttacker", to: "0xDEX" },   // Front-run
        { from: "0xVictim", to: "0xDEX" },     // Victim
        { from: "0xAttacker", to: "0xDEX" }    // Back-run
      ]
    }
  };

  const findings = await handleBlock(blockEvent);
  console.log(findings);
}

simulateBlock();
