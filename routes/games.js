"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {

    var hostName = knex('users').select('name').join('games', 'users.id', 'games.host_id').as('host_name');
    var guestName = knex('users').select('name').join('games', 'users.id', 'games.guest_id').as('guest_name');
    var nameOfPersonWithTurn = knex('users').select('name').join('games', 'users.id', 'games.whos_turn').as('whos_turn_name');
    knex
      .select('type', hostName, guestName, nameOfPersonWithTurn)
      .from("games")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}

