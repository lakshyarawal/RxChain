import React from "react";
import "../../App.css";
import { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import { RX_ABI, RX_ADDRESS } from "../../wallet/Config";

export default function Doctor() {
  const addRef = useRef(null);
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const emailRef = useRef(null);
  const clinicRef = useRef(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState();

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);
      // Instantiate smart contract using ABI and address.
      const contract = new web3.eth.Contract(RX_ABI, RX_ADDRESS);
      // set contact list to state variable.
      setContract(contract);
      // Then we get total number of contacts for iteration
    }
    load();
  }, []);

  const handleDoctor = async () => {
    if (contract) {
      const ans = await contract.methods
        .Doctor_Register(
          addRef.current.value,
          nameRef.current.value,
          ageRef.current.value,
          emailRef.current.value,
          clinicRef.current.value
        )
        .call();
      //alert("The answer is: " + String(ans));
      console.log("Doctor Added");
      //console.log(typeof ans);
    } else {
      console.log("contract Not found");
    }
  };

  /*const handlePrescription = async () => {
    const ans = await contract.methods
      .Prescription_Register(pat_ad, doc_ad, PresDate, medicines)
      .call();
    alert("The answer is: " + String(ans));
    console.log(typeof ans);
  };
*/
  return (
    <>
      <h1 className="services">Doctor Register!</h1>
      <div id="frm1">
        <div className="email">
          <label className="form__label" for="address">
            Metamask Address:
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
            placeholder="Doctor Name"
            required
          />
        </div>
        <div className="email">
          <label className="form__label" for="_age">
            Age:{" "}
          </label>
          <input
            type="number"
            ref={ageRef}
            id="_age"
            className="form__input"
            placeholder="Age"
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
          <label className="form__label" for="clinic">
            Clinic Name:{" "}
          </label>
          <input
            type="string"
            ref={clinicRef}
            id="clinic"
            className="form__input"
            placeholder="Clinic"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn" onClick={handleDoctor}>
        Register Doctor
      </button>
    </>
  );
}
