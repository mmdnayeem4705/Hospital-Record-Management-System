const hre = require("hardhat");

async function main() {
  console.log("Deploying smart contract...");

  const Contract = await hre.ethers.getContractFactory("MedicalRecord"); // ← Use your actual contract name
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log(`✅ Contract deployed at: ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
