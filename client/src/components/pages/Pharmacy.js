import React from "react";
import "../../App.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Pharmacy() {
  const [address, setAddress] = useState(null);
  const [_name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [store, setStore] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "address") {
      setAddress(value);
    }
    if (id === "_name") {
      setName(_name);
    }
    if (id === "email") {
      setEmail(email);
    }
    if (id === "store") {
      setStore(store);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleLogin = () => {
    login(address, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        alert("Signed in Successfully!");
        history.push("/dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });
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
            value={address}
            onChange={(e) => handleInputChange(e)}
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
            value={_name}
            onChange={(e) => handleInputChange(e)}
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
            value={email}
            onChange={(e) => handleInputChange(e)}
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
            value={store}
            onChange={(e) => handleInputChange(e)}
            id="email"
            className="form__input"
            placeholder="Store Address"
            required
          />
        </div>
      </div>
      <button onClick={() => handleLogin()} type="submit" class="btn">
        Register
      </button>

      <h2>Validate Pres</h2>
      <div id="frm5" onSubmit="Validate_pres()">
        <b>Patient Address</b>:{" "}
        <input type="string" name="add" id="Pat_add"></input>
        <b>Doctor Address</b>:{" "}
        <input type="string" name="name" id="Doc_ad"></input>
        <input type="button" onclick="Validate_pres()" value="Validate"></input>
      </div>
    </>
  );
}
