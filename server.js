const express = require("express");
const mongoose = require("mongoose");
const app = express();
const users = require("./routes/api/users");

//  middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Envirnmental Variables
require('dotenv').config()

// Database Connection
const database = require('./database/db');

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));