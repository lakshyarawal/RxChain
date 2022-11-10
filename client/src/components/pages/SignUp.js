import React from "react";
import "../../App.css";
import { useState } from "react";
import { database, app } from "../../firebase";
import { ref, push, child, update } from "firebase/database";
import { Link, useHistory } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useAuth } from "../../context/AuthContext";

export default function SignUp() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const auth = getAuth(app);
  const history = useHistory();
  const { register } = useAuth();

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
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleSubmit = () => {
    register(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        alert("Created a new Account");
        history.push("/dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });

    let obj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    const newPostKey = push(child(ref(database), "posts")).key;
    const updates = {};
    updates["/" + newPostKey] = obj;
    return update(ref(database), updates);
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

          <button onClick={() => handleLogout()} type="submit" class="btn">
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
