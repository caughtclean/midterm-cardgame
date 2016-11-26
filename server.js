"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const session     = require('express-session');

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
app.use(cookieSession({
  name: 'session',
  keys: ['secret'],
}))

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));
app.use("/api/games", gamesRoutes(knex));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/table", (req, res) => {
  res.render("table");
});

app.get("/login", (req, res) => {
  //get login interface
  res.render("login");
});

app.get("/register", (req, res) => {
  //get register interface
});

app.get("/user/:userid", (req, res) => {
  //get user interface (user scores, ranks, archive of past games)
});

app.post("/login", (req, res) => {
  //user login
  let name = req.body.name;
  knex.select("name","password").from("users").where({ name: req.body.name, password: req.body.password }).then((results) => {
    const user = results[0];
    if(user){
      //create session e
      return res.redirect("/");
    } else {
      console.log("invalid username or password");
      res.status(403);
      return res.render("login");
    }
})
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

app.post("/", (req, res) => {
  console.log("posting to root");
  var user = 1;
  knex.select("id").from("games").where({guest_id: null}).limit(1).then((game) => {
    if(game.length > 0) {
      console.log(game[0])
      // console.log("found open game", game);
      return knex("games").where("id", game[0].id).update({guest_id: user})
    } else {
      console.log("no open games; making new game");
      let newGame = {type: "Goofspiel", status: "active", host_id: user, guest_id: null, whose_turn: user, host_score: 0, guest_score: 0, state: {board:{prize:[],host_card:"",guest_card:""},hands:{prize:[],host_hand:[],guest_hand:[]}}};
      return knex.insert(newGame).into("games");
    }
  }).then(() => {
    res.redirect("/")
  }).catch((error) => {

  });

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});



function generateRandomString() {
  return (100000*Math.random()).toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 6);
}
