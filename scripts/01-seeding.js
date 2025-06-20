// scripts/01-seeding.js
const { ethers } = require("hardhat");
const config = require("../src/config.json");

const wait = (seconds) => {
  const milliseconds = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function main() {
  const { chainId } = await ethers.provider.getNetwork();
  console.log(`Using chainId ${chainId}`);

  const accounts = await ethers.getSigners();
  const user = accounts[0];

  const medical = await ethers.getContractAt(
    "MedicalRecord",
    config[chainId].medical.address
  );
  console.log(`MedicalRecord smart contract fetched at ${medical.address}`);

  const records = [
    ["Aman Gupta", 44, "Male", "B positive", "Allergic rhinitis", "Hypertension", "Medications"],
    ["Michael Miller", 34, "Male", "A negative", "Pollen allergy", "Type 2 diabetes", "Psychotherapy"],
    ["David Wright", 45, "Male", "B positive", "Insect sting allergy", "Asthma", "Surgery"],
    ["Ethan Clark", 23, "Male", "O negative", "Drug allergy", "Bronchitis", "Radiation therapy"],
    ["Ryan Millerta", 34, "Male", "AB positive", "Latex allergy", "Pneumonia", "Physical therapy"],
    ["Olivia Robinson", 77, "Female", "A negative", "Animal dander allergy", "Appendicitis", "Occupational therapy"],
    ["Emma Gupta", 23, "Female", "B positive", "Dust allergy", "Osteoporosis", "Speech therapy"],
    ["Mia Clark", 29, "Female", "B negative", "Chemical allergy", "Arthritis", "Alternative therapy"],
    ["Sofia Wright", 83, "Female", "O positive", "Sun allergy", "Heart disease", "Behavioral therapy"],
    ["Victoria Robinson", 93, "Female", "O negative", "Food allergy", "Heart failure", "Surgery"]
  ];

  for (const record of records) {
    const tx = await medical.connect(user).addRecord(...record);
    await tx.wait();
    const id = await medical.getRecordId();
    console.log(`Record added with ID: ${id}`);
  }

  // Delete sample records
  const deleteIds = [2, 5];
  for (const id of deleteIds) {
    const tx = await medical.connect(user).deleteRecord(id);
    await tx.wait();
    console.log(`Record with ID ${id} deleted.`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
