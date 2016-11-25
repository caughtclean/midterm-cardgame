"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("games")
      .where("host_id", 1)
      .orWhere("guest_id", 1)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}

