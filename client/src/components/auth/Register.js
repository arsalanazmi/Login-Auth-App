import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../dashboard/Dashboard.js";

const Register = props => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}?$/;
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      phone: "",
      dob: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "Fist name must be min of 3 characters or more")
        .max(15, "Fist Name can not be of more than 15 characters")
        .required("Required"),
      lastName: Yup.string()
        .min(3, "Last name must be min of 3 characters or more")
        .max(15, "Last Name can not be of more than 15 characters")
        .required("Required"),
      gender: Yup.string().required("Required"),
      phone: Yup.string()
        .required("Required")
        .matches(phoneRegExp, "Phone number is not valid"),
      dob: Yup.date()
        .required("Required")
        .max(
          new Date(Date.now() - 567648000000),
          "You must be at least 18 years"
        ),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .required("Required")
        .min(6, "Too Short!")
        .max(20, "Too Long!"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      )
    }),
    onSubmit: (values, actions) => {
      const newUser = {
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        phone: values.phone,
        dob: values.dob,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword
      };
      console.log("New User", newUser);

      dispatch(registerUser(newUser));

      actions.resetForm({
        values: {
          firstName: "",
          lastName: "",
          gender: "",
          phone: "",
          dob: "",
          email: "",
          password: "",
          confirmPassword: ""
        }
      });
    }
  });

  return (
    <div className="container">
      {auth.isAuthenticated ? (
        <Dashboard />
      ) : (
        <div className="row">
          <div
            className="card col s10 m8 offset-s1 offset-m2 z-depth-5 #e0e0e0 grey lighten-2"
            style={{ padding: "1.5rem" }}
          >
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="input-field col s12 m6">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                <label htmlFor="firstName">First Name</label>
                {formik.touched.firstName && formik.errors.firstName ? (
                  <span className="red-text">{formik.errors.firstName}</span>
                ) : null}
              </div>

              <div className="input-field col s12 m6">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                <label htmlFor="lastName">Last Name</label>
                {formik.touched.lastName && formik.errors.lastName ? (
                  <span className="red-text">{formik.errors.lastName}</span>
                ) : null}
              </div>

              <div>
                <div className="col s3 m3">Gender</div>
                <label className="col s4 m4">
                  <input
                    className="with-gap"
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.gender === "Male"}
                  />
                  <span>Male</span>
                </label>

                <label className="col s4 m5">
                  <input
                    className="with-gap"
                    id="female"
                    name="gender"
                    type="radio"
                    value="Female"
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.gender === "Female"}
                  />
                  <span>Female</span>
                </label>
                {formik.touched.gender && formik.errors.gender ? (
                  <span className="red-text">{formik.errors.gender}</span>
                ) : null}
              </div>

              <div className="input-field col s12 m6">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                <label htmlFor="phone">Phone</label>
                {formik.touched.phone && formik.errors.phone ? (
                  <span className="red-text">{formik.errors.phone}</span>
                ) : null}
              </div>

              <div className="input-field col s12 m6">
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dob}
                />
                <label htmlFor="dob">Date Of Birth</label>
                {formik.touched.dob && formik.errors.dob ? (
                  <span className="red-text">{formik.errors.dob}</span>
                ) : null}
              </div>

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

              <div className="input-field col s12 m6">
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

              <div className="input-field col s12 m6">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <span className="red-text">
                    {formik.errors.confirmPassword}
                  </span>
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
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;