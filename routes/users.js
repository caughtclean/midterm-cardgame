"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //this will probably get removed
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });


  router.get("/login", (req, res) => {
    //get login interface
  });

  router.get("/register", (req, res) => {
    //get register interface
  });

  router.get("/user/:userid", (req, res) => {
    //get user interface (user scores, ranks, archive of past games)
  });

  router.post("/login", (req, res) => {
    //user login
  });

  router.post("/logout", (req, res) => {
    // req.session = null;
    // res.redirect("/");
  });

  router.post("/register", (req, res) => {
    // user registration
  });

  return router;
}
