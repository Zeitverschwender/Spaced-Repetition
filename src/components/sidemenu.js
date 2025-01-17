import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import "./sidemenu.scss";
import UserSection from "./usersection";

const navLinks = [
  ["home", <span className="material-icons">home</span>, "HOME"],
  ["", <span className="material-icons">list</span>, "MY ITEMS"],
  ["intervals", <span className="material-icons">update</span>, "MY INTERVALS"],
  [
    "About",
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
    </svg>,
    "ABOUT",
  ],
];
export default function Sidemenu(props) {
  return (
    <div
      className="side-menu"
      onClick={() => props.hideSideMenu()}
      style={props.style}
    >
      <div className="side-menu-back" onClick={(e) => e.stopPropagation()}>
        {navLinks.map(([path, img, text]) => (
          <NavLink
            exact
            to={"/" + path}
            className="path-link"
            activeClassName="path-link-active"
            onClick={() => props.hideSideMenu()}
            key={path}
          >
            {img}
            {text}
          </NavLink>
        ))}
        <div className="user">
          <UserSection></UserSection>
        </div>
      </div>
    </div>
  );
}

Sidemenu.propTypes = {
  hideSideMenu: PropTypes.func.isRequired,
  style: PropTypes.object,
};
