A blockchain-based decentralized application (DApp) for securely storing and managing patient medical records using Ethereum smart contracts. Built with **React**, **Hardhat**, **Ethers.js**, and **MetaMask**.

---

## 🚀 Tech Stack

- 🔗 **Smart Contracts** – Solidity + Hardhat
- ⚛️ **Frontend** – React.js
- 🦊 **Wallet** – MetaMask (for blockchain interaction)
- 🔧 **Blockchain Network** – Hardhat Local Node (`localhost:8545`)

---

## 📦 Project Structure

```bash
├── contracts/              # Solidity smart contract(s)
│   └── MedicalRecord.sol
├── scripts/                # Hardhat deployment scripts
│   └── deploy.js
├── src/                    # React frontend
│   ├── components/
│   │   ├── Form/
│   │   ├── Data/
│   │   ├── Navbar/
│   │   └── Option/
│   ├── store/              # Redux store + interactions
│   └── config.json         # ChainId-specific deployed contract addresses
├── .env                    # PRIVATE_KEY and RPC_URLs (optional)
├── hardhat.config.js
├── package.json
└── README.md
````

---

## ✅ Features

* 🩺 Add patient medical records
* 🔍 View records securely on-chain
* ✅ MetaMask wallet integration
* 🔐 Transaction confirmation with gas
* 📦 Events + real-time UI updates

---

## 🛠️ Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (v16+)
* [MetaMask](https://metamask.io/) browser extension
* [Git](https://git-scm.com/)
* [Hardhat](https://hardhat.org/)

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/MedicalRecordStorage.git
cd MedicalRecordStorage
```

### 2. Install Dependencies

```bash
npm install
```

---

## ⛓️ Running the Hardhat Local Blockchain

### 1. Start Local Node

```bash
npx hardhat node
```

This creates 20 pre-funded fake accounts with 10,000 ETH each on `localhost:8545`.

---

## 🔐 Configure MetaMask

1. Add a new **custom network**:

   * **Network Name**: Hardhat Localhost
   * **New RPC URL**: `http://127.0.0.1:8545`
   * **Chain ID**: `31337`
   * **Currency Symbol**: `ETH`

2. Import one of the Hardhat accounts:

   * Use private keys shown in terminal after running `npx hardhat node`.

---

## 📤 Deploy Smart Contract

### In a separate terminal tab:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

> ✅ The terminal will show the deployed address. Update `src/config.json` with:

```json
{
  "31337": {
    "medical": {
      "address": "0xYourDeployedContractAddress"
    }
  }
}
```

---

## 💻 Run the React Frontend

```bash
npm start
```

> By default, it runs at: `http://localhost:3000`

---

## 🧪 Using the App

1. Open `http://localhost:3000`
2. Connect MetaMask wallet
3. Fill the patient form
4. Submit and approve the transaction
5. View stored records in "Data" tab

---

## 🧩 Available Scripts

| Script                                                  | Purpose                       |
| ------------------------------------------------------- | ----------------------------- |
| `npx hardhat node`                                      | Start local test blockchain   |
| `npx hardhat compile`                                   | Compile smart contracts       |
| `npx hardhat run scripts/deploy.js --network localhost` | Deploy contract to local node |
| `npm start`                                             | Start the React frontend      |

---

## ⚠️ Common Issues & Fixes

### MetaMask shows 0 ETH?

* Make sure you're on **Hardhat Localhost (31337)**
* Import account using a private key shown by `npx hardhat node`

### `Pending...` but no data?

* Ensure `await tx.wait()` is used
* Check if contract address in `config.json` is updated
* Contract ABI must match compiled version

---

## 📄 Smart Contract Overview

```solidity
pragma solidity ^0.8.0;

contract MedicalRecord {
    struct Record {
        string patientName;
        uint age;
        string disease;
    }

    mapping(uint => Record) public records;

    function storeMedicalRecord(uint id, string memory name, uint age, string memory disease) public {
        records[id] = Record(name, age, disease);
    }

    function getRecord(uint id) public view returns (string memory, uint, string memory) {
        Record memory r = records[id];
        return (r.patientName, r.age, r.disease);
    }
}
```

---

## 🤝 Contributing

Pull requests welcome! For major changes, please open an issue first to discuss.

---

## 📜 License

MIT License © 2025 Your Name

---

## 🙌 Acknowledgements

* Hardhat for local blockchain simulation
* MetaMask for Web3 wallet
* Ethers.js for smart contract integration

---

```

---

SHELL
```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
