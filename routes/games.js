"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/games", (req, res) => {
    //get list of active games for the user
  });

  router.get("/game/:gameid", (req, res) => {
    //go into the game
  });

  router.post("/games", (req, res) => {
    //makes a new game by hosting a new room or joining an existing room awaiting a guest
  });

  return router;
}
