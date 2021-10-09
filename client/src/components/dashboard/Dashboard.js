import React from "react";
import { logoutUser } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onLogoutClick = e => {
    dispatch(logoutUser());
  };

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align white-text text-darken-1">
          <h4>
            <b>Hey there,</b>{" "}
            {auth.user.userData.firstName + " " + auth.user.userData.lastName}
            <p className="flow-text grey-text text-lighten-1">
              You are logged into a full-stack{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
            </p>
          </h4>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}
            onClick={onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;