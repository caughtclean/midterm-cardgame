"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const gamesRoutes = require("./routes/games");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/games", gamesRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  //get login interface
  res.redirect("/");
});

app.get("/register", (req, res) => {
  //get register interface
});

app.get("/user/:userid", (req, res) => {
  //get user interface (user scores, ranks, archive of past games)
});

app.post("/login", (req, res) => {
  //user login
});

app.post("/logout", (req, res) => {
  // req.session = null;
  // res.redirect("/");
});

app.post("/register", (req, res) => {
  // user registration
});

app.get("/games", (req, res) => {
  //get list of active games for the user
});

app.get("/game/:gameid", (req, res) => {
  //go into the game
});

app.post("/games", (req, res) => {
  //makes a new game by hosting a new room or joining an existing room awaiting a guest
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});



function generateRandomString() {
  return (100000*Math.random()).toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 6);
}
