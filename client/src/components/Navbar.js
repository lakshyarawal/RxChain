import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleLogout = () => {
    setClick(false);
    logout()
      .then((res) => {
        alert("Signed out Successfully!");
        history.push("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            RxChain
            <i class="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {!currentUser && (
              <li className="nav-item">
                <Link
                  to="/doctor"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Doctor
                </Link>
              </li>
            )}
            {!currentUser && (
              <li className="nav-item">
                <Link
                  to="/pharmacy"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Pharmacy
                </Link>
              </li>
            )}
            {!currentUser && (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link
                  to="/dashboard"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={() => handleLogout()}
                >
                  Logout
                </Link>
              </li>
            )}

            {!currentUser && (
              <li>
                <Link
                  to="/sign-up"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  User Register
                </Link>
              </li>
            )}
          </ul>

          {!currentUser && button && (
            <Button buttonStyle="btn--outline">User Register</Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
