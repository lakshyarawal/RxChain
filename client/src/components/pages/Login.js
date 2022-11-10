import React from "react";
import "../../App.css";
import { useState } from "react";
import { database, app } from "../../firebase";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const auth = getAuth(app);
  const history = useHistory();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("User Signed In: " + user.email);
        history.push("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        //const errorMessage = error.message;
        alert(errorCode);
      });
  };

  return (
    <>
      <h1 className="services">Login</h1>
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
      <button onClick={() => handleLogin()} type="submit" class="btn">
        Sign In
      </button>
    </>
  );
}
