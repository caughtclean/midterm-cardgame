"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const session       = require('express-session');
const cookieSession = require('cookie-session');

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

  knex.select("name","password","id").from("users").where({ name: req.body.name, password: req.body.password }).then((results) => {
    let user_id = results[0].id;
    let user = results[0];
    if(user){
    req.session.id = user_id;
    console.log(req.session.id);
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
  var user = req.session.id;
  knex.select("id").from("games").where({guest_id: null}).where("host_id", '!=', user).limit(1).then((game) => {
    if(game.length > 0) {
      return knex("games").where("id", game[0].id).update({guest_id: user})
    } else {
      console.log("no open games; making new game");
      let newGame = {type: "Goofspiel", status: "active", host_id: user, guest_id: null, whose_turn: user, host_score: 0, guest_score: 0, game_state: {
        board:{
          prize:[],
          host_card:[],
          guest_card:[]
        },
        hands:{
          prize: ["1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "11D", "12D", "13D"],
          host_hand: ["1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "11S", "12S", "13S"],
          guest_hand: ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "11C", "12C", "13C"]
        }
      }
    };
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
