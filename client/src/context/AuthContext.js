import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext({
  currentUser: null,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  store: () => Promise,
  read: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("The user is", currentUser);
  }, [currentUser]);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function store(name, email, address, age) {
    return addDoc(collection(db, "Patient"), {
      name: name,
      email: email,
      address: address,
      age: age,
      balance: 0,
    });
  }

  function read(email) {
    const q = query(collection(db, "Patient"), where("email", "==", email));
    return getDocs(q);
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    store,
    read,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
