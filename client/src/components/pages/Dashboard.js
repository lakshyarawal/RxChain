import React from "react";
import "../../App.css";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { RX_ABI, RX_ADDRESS } from "../../wallet/Config";

export default function Dashboard() {
  const [account, setAccount] = useState(); // state variable to set account.

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);
      var contract = new web3.eth.Contract(
        RX_ABI,
        RX_ADDRESS,
        web3.eth.defaultAccount
      );

      async function Doc_Reg(doc_new, name, age, email, clinic_name) {
        const ans = await contract.methods
          .Doctor_Register(doc_new, name, age, email, clinic_name)
          .call();
        alert("The answer is: " + String(ans));
        console.log(typeof ans);
      }
      async function Pat_Reg(pat_new, name, age, email) {
        const ans = await contract.methods
          .Patient_Register(pat_new, name, age, email)
          .call();
        alert("The answer is: " + String(ans));
        console.log(typeof ans);
      }
      async function Pharm_Reg(pharm_new, name, age, email, store_address) {
        const ans = await contract.methods
          .Pharmacy_Register(pharm_new, name, age, email, store_address)
          .call();
        alert("The answer is: " + String(ans));
        console.log(typeof ans);
      }

      async function Pres_Reg(pat_ad, doc_ad, PresDate, medicines) {
        const ans = await contract.methods
          .Prescription_Register(pat_ad, doc_ad, PresDate, medicines)
          .call();
        alert("The answer is: " + String(ans));
        console.log(typeof ans);
      }

      async function Validate_pres(pat_ad, doc_ad) {
        const ans = await contract.methods
          .validate_prescription(pat_ad, doc_ad)
          .call();
        alert("The answer is: " + String(ans));
        console.log(typeof ans);
      }
    }
    load();
  }, []);

  const { currentUser } = useAuth();
  const { read } = useAuth();
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [balance, setBalance] = useState(null);

  let user_email = "";
  if (currentUser) {
    user_email = currentUser["email"];
    read(user_email)
      .then((res) => {
        res.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const curr_user = doc.data();
          if (curr_user) {
            setName(curr_user["name"]);
            setAddress(curr_user["address"]);
            setEmail(curr_user["email"]);
            setAge(curr_user["age"]);
            setBalance(curr_user["balance"]);
          }
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <>
      <h1 className="products">Welcome {name}!</h1>
      <p>NAME: {name}</p>
      <p>AGE: {age}</p>
      <p>ADDRESS: {address}</p>
      <p>EMAIL: {email}</p>
      <p>BALANCE: {balance}</p>
      <p>Account: {account}</p>
    </>
  );
}
