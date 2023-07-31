"use strict";

const User = require("../models/user"); //require the user model

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error); 
      });
  },
  indexView: (req, res) => {
    res.render("users/index"); //render the index page with an array of users
  }
};
