import Web3 from "web3";
import { RX_ABI, RX_ADDRESS } from "./Config";
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

export const load = async () => {
  await loadWeb3();
  const addressAccount = await loadAccount();
  const { RxContract: todoContract, tasks } = await loadContract(
    addressAccount
  );

  return { addressAccount, todoContract, tasks };
};

const loadContract = async (addressAccount) => {
  const RxContract = new web3.eth.Contract(RX_ABI, RX_ADDRESS);
  const tasks = "";

  return { RxContract: RxContract, tasks };
};

const loadAccount = async () => {
  const addressAccount = await web3.eth.getCoinbase();
  return addressAccount;
};

const loadWeb3 = async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed
      web3.eth.sendTransaction({
        /* ... */
      });
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
    web3.eth.sendTransaction({
      /* ... */
    });
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};
