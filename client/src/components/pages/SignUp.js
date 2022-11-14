import React from "react";
import "../../App.css";
import { useState, useRef, useEffect } from "react";
import { app, db } from "../../firebase";
import { Link, useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import Web3 from "web3";
import { RX_ABI, RX_ADDRESS } from "../../wallet/Config";

export default function SignUp() {
  const auth = getAuth(app);
  const history = useHistory();
  const { register, store } = useAuth();
  const addRef = useRef(null);
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState();

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);
      // Instantiate smart contract using ABI and address.
      const contract = new web3.eth.Contract(RX_ABI, RX_ADDRESS);
      // set contract list to state variable.
      setContract(contract);
    }
    load();
  }, []);

  const handlePatient = async () => {
    if (contract) {
      const ans = await contract.methods
        .Patient_Register(
          addRef.current.value,
          nameRef.current.value,
          ageRef.current.value,
          emailRef.current.value
        )
        .call();
      alert("The answer is: " + String(ans));
      console.log(typeof ans);
      console.log("Patient Added");
      //console.log(typeof ans);
    } else {
      console.log("contract Not found");
    }
    register(emailRef.current.value, passwordRef.current.value)
      .then((res) => {
        const user = res.user;
        console.log(user);
        store(
          nameRef.current.value,
          emailRef.current.value,
          addRef.current.value,
          ageRef.current.value
        );
        alert("Created a new Account");
        history.push("/dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <h2>Patient Register</h2>
      <div className="form">
        <div className="form-body">
          <div className="username">
            <label className="form__label" for="firstName">
              Name{" "}
            </label>
            <input
              className="form__input"
              type="text"
              ref={nameRef}
              id="firstName"
              placeholder="Name"
            />
          </div>
          <div className="lastname">
            <label className="form__label" for="adress">
              Address{" "}
            </label>
            <input
              type="text"
              ref={addRef}
              name=""
              id="address"
              className="form__input"
              placeholder="Address"
            />
          </div>
          <div className="email">
            <label className="form__label" for="email">
              User Email{" "}
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
            <label className="form__label" for="age">
              User Age{" "}
            </label>
            <input
              type="number"
              ref={ageRef}
              id="age"
              className="form__input"
              placeholder="Age"
              required
            />
          </div>
          <div className="password">
            <label className="form__label" for="password">
              Password{" "}
            </label>
            <input
              className="form__input"
              type="password"
              ref={passwordRef}
              id="password"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div class="footer">
          <button onClick={handlePatient} type="submit" class="btn">
            Register
          </button>
        </div>
      </div>
    </>
  );
}
