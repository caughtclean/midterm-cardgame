"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex.select('type', 'host_id', 'host.name AS host_name', 'guest_id', 'guest.name AS guest_name', 'whose_turn')
      .from("games")
<<<<<<< HEAD
=======
      .join("users AS host", "host.id", "games.host_id")
      .join("users AS guest", "guest.id", "games.guest_id")
>>>>>>> the_name_of_the_guy_who_should_be_making_a_turn
      .where("host_id", 1)
      .orWhere("guest_id", 1)
      .then((results) => {
        res.json(results);
      });
  });

 return router;
}

