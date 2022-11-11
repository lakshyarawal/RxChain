import React from "react";
import "../../App.css";
import { useState } from "react";
import { app, db } from "../../firebase";
import { Link, useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";

export default function SignUp() {
  const [firstName, setFirstName] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [password, setPassword] = useState(null);

  const auth = getAuth(app);
  const history = useHistory();
  const { register, store } = useAuth();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "address") {
      setAddress(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "age") {
      setAge(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    register(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        store(firstName, email, address, age);
        alert("Created a new Account");
        history.push("/dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className="form">
        <div className="form-body">
          <div className="username">
            <label className="form__label" for="firstName">
              First Name{" "}
            </label>
            <input
              className="form__input"
              type="text"
              value={firstName}
              onChange={(e) => handleInputChange(e)}
              id="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="lastname">
            <label className="form__label" for="adress">
              Address{" "}
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => handleInputChange(e)}
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
              value={email}
              onChange={(e) => handleInputChange(e)}
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
              value={age}
              onChange={(e) => handleInputChange(e)}
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
              value={password}
              onChange={(e) => handleInputChange(e)}
              id="password"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div class="footer">
          <button onClick={() => handleSubmit()} type="submit" class="btn">
            Register
          </button>
        </div>
      </div>
    </>
  );
}
