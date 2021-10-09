import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align white-text text-darken-1">
          <h4>
            <b> Login/Auth </b> app with the{" "}
            <span style={{ fontFamily: "monospace" }}>MERN</span> stack
          </h4>
          <p className="flow-text grey-text text-lighten-1">
            A Full-Stack App with user authentication via JWTs
          </p>
          <br />

          <div className="col s6">
            <Link
              to="/register"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Register
            </Link>
          </div>
          <div className="col s6">
            <Link
              to="/login"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large btn-flat waves-effect #f5f5f5 grey lighten-2 black-text"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
