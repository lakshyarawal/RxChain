import "../../App.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import { RX_ABI, RX_ADDRESS } from "../../wallet/Config";

export default function Pharmacy() {
  const addRef = useRef(null);
  const patAddRef = useRef(null);
  const docAddRef = useRef(null);
  const nameRef = useRef(null);
  const storeRef = useRef(null);
  const emailRef = useRef(null);
  const [account, setAccount] = useState(null);
  const [presAns, setPresAns] = useState(null);
  const [contract, setContract] = useState();

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);
      // Instantiate smart contract using ABI and address.
      const contract = new web3.eth.Contract(RX_ABI, RX_ADDRESS, account);
      // set contract list to state variable.
      setContract(contract);
    }
    load();
  }, []);

  const handlePharmacy = async () => {
    if (contract) {
      const ans = await contract.methods
        .Pharmacy_Register(
          addRef.current.value,
          nameRef.current.value,
          emailRef.current.value,
          storeRef.current.value
        )
        .call();
      alert("The answer is: " + String(ans));
      console.log("Pharmacy Added");
      //console.log(typeof ans);
    } else {
      console.log("contract Not found");
    }
  };
  const logRx = () => {
    console.log(presAns);
  };

  const validateRx = async () => {
    if (contract) {
      console.log(patAddRef.current.value);
      console.log(docAddRef.current.value);
      setPresAns(
        await contract.methods
          .validate_prescription(
            patAddRef.current.value,
            docAddRef.current.value
          )
          .call()
      );
      console.log("Prescription Validated");
      //console.log(typeof ans);
    } else {
      console.log("contract Not found");
    }
  };

  return (
    <>
      <h1 className="services">Pharmacy Register!</h1>
      <div id="frm1">
        <div className="email">
          <label className="form__label" for="address">
            Metamask Address:{" "}
          </label>
          <input
            type="string"
            ref={addRef}
            id="address"
            className="form__input"
            placeholder="Address"
            required
          />
        </div>
        <div className="email">
          <label className="form__label" for="_name">
            Name:{" "}
          </label>
          <input
            type="string"
            ref={nameRef}
            id="_name"
            className="form__input"
            placeholder="Pharmacy Name"
            required
          />
        </div>
        <div className="email">
          <label className="form__label" for="email">
            Email:{" "}
          </label>
          <input
            type="email"
            ref={emailRef}
            id="email"
            className="form__input"
            placeholder="Email"
            required
          />
        </div>
        <div className="email">
          <label className="form__label" for="store">
            Physical Address:{" "}
          </label>
          <input
            type="string"
            ref={storeRef}
            id="store"
            className="form__input"
            placeholder="Store Address"
            required
          />
        </div>
      </div>
      <button onClick={handlePharmacy} type="submit" class="btn">
        Register Pharmacy
      </button>

      <h2>Validate Pres</h2>
      <div id="frm5">
        <div className="email">
          <label className="form__label" for="pat_address">
            Patient Metamask Address:{" "}
          </label>
          <input
            type="string"
            ref={patAddRef}
            id="pat_address"
            className="form__input"
            placeholder="Patient Address"
            required
          />
        </div>
        <div className="email">
          <label className="form__label" for="doc_address">
            Doctor Metamask Address:{" "}
          </label>
          <input
            type="string"
            ref={docAddRef}
            id="doc_address"
            className="form__input"
            placeholder="Doctor Address"
            required
          />
        </div>
        <button onClick={validateRx} type="submit" class="btn">
          Validate Prescription
        </button>
        <button onClick={logRx} type="submit" class="btn">
          Log Prescription
        </button>
      </div>
    </>
  );
}
