import React from "react";
import "../../App.css";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { RX_ABI, RX_ADDRESS } from "../../wallet/Config";

export default function Dashboard() {
  const [account, setAccount] = useState();
  const { currentUser } = useAuth();
  const { read } = useAuth();
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [_balance, setBalance] = useState(null);

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

      setBalance(100);
    }
    load();
  }, []);

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
            const web3 = new Web3(
              Web3.givenProvider || "http://localhost:8545"
            );
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
      <p>BALANCE: {_balance}</p>
      <p>Account: {account}</p>
    </>
  );
}
