import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-fixed">
      <nav className="z-depth-2">
        <div className="nav-wrapper #263238 blue-grey darken-4">
          <Link
            to="/"
            style={{
              fontFamily: "monospace"
            }}
            className="col s5 brand-logo center white-text"
          >
            <i className="material-icons">code</i>
            MERN
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
