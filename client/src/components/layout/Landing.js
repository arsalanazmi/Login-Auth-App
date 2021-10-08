import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../dashboard/Dashboard.js";

const Landing = () => {
  const auth = useSelector(state => state.auth);
  console.log(auth);

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      {auth.isAuthenticated ? (
        <Dashboard />
      ) : (
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b> Login/Auth </b> app with the{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> stack
            </h4>
            <p className="flow-text grey-text text-darken-1">
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
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
