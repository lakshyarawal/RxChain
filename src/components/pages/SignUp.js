import React from "react";
import "../../App.css";
import { useState, setState } from "react";
import { database } from "../../firebase";
import { ref, push, child, update } from "firebase/database";

export default function SignUp() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = () => {
    let obj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    const newPostKey = push(child(ref(database), "posts")).key;
    const updates = {};
    updates["/" + newPostKey] = obj;
    return update(ref(database), updates);
  };

  return (
    <>
      <h1 className="sign-up">Register for RxChain</h1>
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
            <label className="form__label" for="lastName">
              Last Name{" "}
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => handleInputChange(e)}
              name=""
              id="lastName"
              className="form__input"
              placeholder="LastName"
            />
          </div>
          <div className="email">
            <label className="form__label" for="email">
              Email{" "}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e)}
              id="email"
              className="form__input"
              placeholder="Email"
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
            />
          </div>
          <div className="confirm-password">
            <label className="form__label" for="confirmPassword">
              Confirm Password{" "}
            </label>
            <input
              className="form__input"
              type="password"
              value={confirmPassword}
              onChange={(e) => handleInputChange(e)}
              id="confirmPassword"
              placeholder="Confirm Password"
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
