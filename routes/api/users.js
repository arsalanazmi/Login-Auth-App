const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Load input validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  console.log(req.body);
  // Form validation
  // const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  // if (!isValid) {
  //   return res.json(errors);
  // }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        phone: req.body.phone,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
      });
      console.log("newUser", newUser);
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              console.log("mongodb", user);
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.post("/login", (req, res) => {
  console.log(req.body);
  // Form validation
  // const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(userData => {
    console.log(userData);
    // Check if user exists
    if (!userData) {
      return res.json({ message: "Invalid login details" });
    }
    // Check password
    bcrypt.compare(password, userData.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: userData.id,
          userData
        };
        // Sign token
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            console.log("token", token);
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.json({ message: "Invalid login details" });
      }
    });
  });
});

module.exports = router;