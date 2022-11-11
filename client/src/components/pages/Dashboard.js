import React from "react";
import "../../App.css";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Dashboard() {
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
    </>
  );
}
