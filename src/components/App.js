import { Route, Routes } from "react-router-dom";
import "../App.css";
import RecordDetails from "./RecordDetails/RecordDetails";
import Data from "./Data/Data"; // ✅ Use correct casing to match filename
import Form from "./Form/Form";
import Navbar from "./Navbar/Navbar";
import Option from "./Option/Option";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  loadAccount,
  loadAllData,
  loadMedical,
  loadNetwork,
  loadProvider,
  subscribeToEvents,
} from "../store/interactions";

import config from "../config.json";
import Alert from "./Alert/Alert";

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);
    const medical_config = config[chainId]?.medical;

    if (!medical_config) {
      console.error("❌ Medical contract address missing in config.json for chainId:", chainId);
      return;
    }

    const medical = loadMedical(provider, medical_config.address, dispatch);
    loadAllData(provider, medical, dispatch);
    subscribeToEvents(medical, dispatch);

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        loadAccount(provider, dispatch);
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []); // ✅ Only run once on mount

  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
        <Option />
        <Routes>
          <Route path="/records" element={<Data />} />
          <Route path="/records/:id" element={<RecordDetails />} />
          <Route path="/" exact element={<Form />} />
          <Route path="/data" element={<Data />} />
        </Routes>
        <Alert />
      </div>
    </div>
  );
}

export default App;
