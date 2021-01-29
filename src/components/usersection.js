import React, { useState, useEffect } from "react";

import { ENDPOINT_GOOGLE } from "../services/backend";
import Backend from "../services/backend";

import googleIcon from "../assets/images/google.svg";

import "./usersection.scss";

export default function UserSection() {
  const backend = new Backend();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  useEffect(() => {
    backend.isUserLoggedIn(
      (data) => {
        setIsLoggedIn(data);
      },
      (err) => {
        alert(`couldn't check log in. err: ${err}`);
      }
    );
  });

  useEffect(() => {
    if (isLoggedIn) {
      backend.getUserName(
        (data) => {
          setUserName(data);
        },
        (err) => {
          alert(`couldn't get user name. err: ${err}`);
        }
      );
      backend.getUserPhoto(
        (data) => {
          setUserPhoto(data);
        },
        (err) => {
          alert(`couldn't get user photo. err: ${err}`);
        }
      );
    }
  });
  const onLogoutClick = () => {
    backend.logout(
      (data) => {
        setIsLoggedIn(false);
        backend.removeToken();
        window.location.reload();
      },
      (err) => {
        alert(`couldn't log out. err: ${err}`);
      }
    );
  };
  return isLoggedIn ? (
    <React.Fragment>
      <img src={userPhoto} alt="User" className="user-image" />
      <span className="username">{userName}</span>
      <span onClick={() => onLogoutClick()} className="login-button">
        LOGOUT
      </span>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <span className="material-icons user-icon">account_circle</span>
      <a href={ENDPOINT_GOOGLE} className="login-button">
        <img src={googleIcon} alt="temp user icon" /> LOGIN
      </a>
    </React.Fragment>
  );
}
