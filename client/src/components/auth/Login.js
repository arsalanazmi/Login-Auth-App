import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {loginUser} from "../../actions/authActions.js" 
import {useDispatch} from "react-redux";

const Login = () => {
const dispatch = useDispatch();

const formik = useFormik({
  initialValues: {
    email: "",
    password: ""
  },
  validationSchema: Yup.object({
    email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
    password: Yup.string().required("Required")
  }),
  onSubmit: (values, actions) => {
    const userData = {
      email: values.email,
      password: values.password
    };
    console.log("User Data", userData);
    
    dispatch(loginUser(userData))
    
    actions.resetForm({
      values: {
        email: "",
        password: ""
      }
    });
  }
});

return (
    <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>

          <form noValidate onSubmit={formik.handleSubmit}>
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <label htmlFor="email">Email</label>
              {formik.touched.email && formik.errors.email ? (
                <span className="red-text">{formik.errors.email}</span>
              ) : null}
            </div>

            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <label htmlFor="password">Password</label>
              {formik.touched.password && formik.errors.password ? (
                <span className="red-text">{formik.errors.password}</span>
              ) : null}
            </div>

            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;