import React from "react";
import "../../App.css";
import { useAuth } from "../../context/AuthContext";

export default function Products() {
  const { currentUser } = useAuth();
  return (
    <>
      <h1 className="products">Welcome!</h1>
      <p>{JSON.stringify(currentUser, null, 2)}</p>
    </>
  );
}
