import React from "react";
import PropTypes from "prop-types";

import { ENDPOINT_GOOGLE, ENDPOINT_GOOGLE_LOGOUT } from "../services/backend";
import Backend from "../services/backend";

import googleIcon from "../assets/images/google.svg";
import "./sidemenu.scss";

export default function Sidemenu(props) {
  const isUserLoggedIn = (new Backend()).isUserLoggedIn();
  return (
    <div className="side-menu" onClick={() => props.hideSideMenu()}>
      <div className="side-menu-back" onClick={(e) => e.stopPropagation()}>
        <a href="/" className="path-link">
          <span className="material-icons">home</span>HOME
        </a>
        <a href="/" className="path-link">
          <span className="material-icons">list</span>MY ITEMS
        </a>
        <a href="/" className="path-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
          </svg>
          ABOUT
        </a>
        <div className="user">
          <span className="material-icons user-icon">account_circle</span>
          {isUserLoggedIn ? (
            <a href={ENDPOINT_GOOGLE_LOGOUT} className="login-button">
              LOGOUT
            </a>
          ) : (
            <a href={ENDPOINT_GOOGLE} className="login-button">
              <img src={googleIcon} alt="temp user icon" /> LOGIN
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

Sidemenu.propTypes = {
  hideSideMenu: PropTypes.func.isRequired,
};
