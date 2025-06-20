import React, { useEffect, useState } from 'react';

export default function ConnectWallet() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    } else {
      alert('Please install MetaMask');
    }
  };

  return (
    <button onClick={connectWallet} style={{ padding: '10px 20px', fontSize: '16px' }}>
      {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect Wallet'}
    </button>
  );
}
