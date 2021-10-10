import axios from "axios";
import history from "../history";
// import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, LOGOUT_USER } from "./types";
import Swal from "sweetalert2";

// Register User
export const registerUser = userData => () => {
  console.log("Register", userData);
  axios
    .post("/api/users/register", userData)
    .then(res => {
      console.log("Front End response", res);
      {
        res.data.message
          ? Swal.fire({
              icon: "error",
              title: res.data.message
            })
          : history.push("/login"); // re-direct to login on successful register
      }
    })
    .catch(err => console.log("error", err));
};

// Login - get user token
export const loginUser = userData => dispatch => {
  console.log("Login", userData);
  axios
    .post("/api/users/login", userData)
    .then(res => {
      console.log(res);
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      // setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push("/dashboard");
    })
    .catch(err => console.log(err));
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.clear();
  // Remove auth header for future requests
  // setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(signOutUser());
  history.push("/login");
};

// Set logged out user
export const signOutUser = () => {
  return {
    type: LOGOUT_USER
  };
};
