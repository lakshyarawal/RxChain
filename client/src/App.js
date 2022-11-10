import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import SignUp from "./components/pages/SignUp";
import AuthContextProvider from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
