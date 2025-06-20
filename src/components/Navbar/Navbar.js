import React from "react";
import "./navbar.css";
import healthReport from "../../assets/health-report.png";
import { loadAccount } from "../../store/interactions";
import { useDispatch, useSelector } from "react-redux";
import blockies from "ethereum-blockies-png";
import config from "../../config.json";

const Navbar = () => {
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.connection);
  const account = useSelector((state) => state.provider.account);
  const balance = useSelector((state) => state.provider.balance);
  const chainId = useSelector((state) => state.provider.chainId);

  const connectHandler = async () => {
    try {
      await loadAccount(provider, dispatch);
    } catch (error) {
      console.error("Failed to connect wallet:", error.message);
      alert("Could not connect wallet. Please try again.");
    }
  };

  const networkHandler = async (e) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: e.target.value,
          },
        ],
      });
    } catch (error) {
      console.error("Network switch failed:", error.message);
      alert("Could not switch network. Please add the network in MetaMask manually.");
    }
  };

  return (
    <div className="Navbar">
      <div className="nav__name">
        <img src={healthReport} alt="Logo" width="40" height="40" />
        <h2>Subham Medical Record</h2>
      </div>

      <div className="nav__networkSelector">
        <select
          name="network"
          id="network"
          onChange={networkHandler}
          value={config[chainId] ? `0x${chainId.toString(16)}` : "0"}
        >
          <option value="0" disabled>
            Select Network
          </option>
          <option value="0x7A69">Localhost</option>
          <option value="0x5">Goerli</option>
          <option value="0x13881">Mumbai</option>
        </select>
      </div>

      <div className="nav__balance">
        <p className="nav__myBalance">
          <small>My Balance:</small>{" "}
          {balance ? Number(balance).toFixed(4) : "0.0000"} ETH
        </p>

        {account ? (
          <a className="nav__myAccount" href="#">
            {account.slice(0, 5) + "...." + account.slice(-4)}
            <img
              src={blockies.createDataURL({ seed: account.toLowerCase() })}
              alt="Identicon"
              className="identicon"
              style={{ marginLeft: "0.5rem", borderRadius: "50%", width: "30px", height: "30px" }}
            />
          </a>
        ) : (
          <button className="nav__balance-box" onClick={connectHandler}>
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
