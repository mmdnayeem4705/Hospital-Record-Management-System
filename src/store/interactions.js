import { ethers } from "ethers";
import MEDICAL_ABI from "../abis/MedicalRecords.json";

export const loadProvider = (dispatch) => {
  const connection = new ethers.providers.Web3Provider(window.ethereum);
  dispatch({ type: "PROVIDER_LOADED", connection });
  return connection;
};

export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork();
  dispatch({ type: "NETWORK_LOADED", chainId });
  return chainId;
};

export const loadAccount = async (provider, dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = ethers.utils.getAddress(accounts[0]);
  dispatch({ type: "ACCOUNT_LOADED", account });
  let balance = await provider.getBalance(account);
  balance = ethers.utils.formatEther(balance);
  dispatch({ type: "ETHER_BALANCE_LOADED", balance });
  return account;
};

export const loadMedical = (provider, address, dispatch) => {
  const medical = new ethers.Contract(address, MEDICAL_ABI, provider);
  dispatch({ type: "MEDICAL_LOADED", medical });
  return medical;
};

export const loadAllData = async (provider, medical, dispatch) => {
  const block = await provider.getBlockNumber();

  const medicalStream = await medical.queryFilter(
    "MedicalRecords__AddRecord",
    0,
    block
  );
  const medicalRecords = medicalStream.map((event) => event.args);
  dispatch({ type: "ALL_MEDICAL_RECORDS", medicalRecords });

  const deleteStream = await medical.queryFilter(
    "MedicalRecords__DeleteRecord",
    0,
    block
  );
  const deleteRecords = deleteStream.map((event) => event.args);
  dispatch({ type: "ALL_DELETED_RECORDS", deleteRecords });
};

export const fetchAllRecords = async (medical, dispatch) => {
  try {
    const total = await medical.getRecordId();
    let records = [];
    for (let i = 1; i <= total; i++) {
      const isDeleted = await medical.getDeleted(i);
      if (!isDeleted) {
        const record = await medical.getRecord(i);
        records.push({
          id: i,
          timestamp: record[0].toString(),
          name: record[1],
          age: record[2].toString(),
          gender: record[3],
          bloodType: record[4],
          allergies: record[5],
          diagnosis: record[6],
          treatment: record[7],
        });
      }
    }
    dispatch({ type: "RECORDS_LOADED", records });
  } catch (error) {
    console.error("Failed to fetch records", error);
  }
};

export const submitRecord = async (
  name,
  age,
  gender,
  bloodType,
  allergies,
  diagnosis,
  treatment,
  provider,
  medical,
  dispatch
) => {
  let transaction;
  dispatch({ type: "NEW_RECORD_LOADED" });
  try {
    const signer = await provider.getSigner();
    transaction = await medical
      .connect(signer)
      .addRecord(name, age, gender, bloodType, allergies, diagnosis, treatment);
    await transaction.wait();
    dispatch({ type: "NEW_RECORD_SUCCESS" });
  } catch (error) {
    console.error("Record submission failed", error);
    dispatch({ type: "NEW_RECORD_FAIL" });
  }
};

export const deleteData = async (medical, recordId, dispatch, provider) => {
  let transaction;
  dispatch({ type: "DELETE_REQUEST_INNITIALIZED" });
  try {
    const signer = await provider.getSigner();
    transaction = await medical.connect(signer).deleteRecord(recordId);
    await transaction.wait();
    dispatch({ type: "DELETE_REQUEST_SUCCESS" });
  } catch (error) {
    console.error("Delete request failed", error);
    dispatch({ type: "DELETE_REQUEST_FAILED" });
  }
};

export const subscribeToEvents = async (medical, dispatch) => {
  medical.on(
    "MedicalRecords__AddRecord",
    (
      recordId,
      timestamp,
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      event
    ) => {
      const medicalOrder = event.args;
      dispatch({ type: "NEW_RECORD_SUCCESS", medicalOrder, event });
    }
  );

  medical.on(
    "MedicalRecords__DeleteRecord",
    (
      recordId,
      timestamp,
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      event
    ) => {
      const deleteOrder = event.args;
      dispatch({ type: "DELETE_REQUEST_SUCCESS", deleteOrder, event });
    }
  );
};
