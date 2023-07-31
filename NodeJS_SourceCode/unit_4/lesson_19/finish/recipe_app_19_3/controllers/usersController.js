"use strict";

const User = require("../models/user");

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
    res.render("users/index");
  },
  new: (req, res) => { //add the new action to render a form
    res.render("users/new");
  },
  create: (req, res, next) => { //add the create action to save the user to the database
    let userParams = {
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    }; //create users with form parameters
    User.create(userParams)
      .then(user => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => { //render the view in a separate redirectView action
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let userId = req.params.id; //collect the user if from the request params 
    User.findById(userId) //find a user by its id 
      .then(user => {
        res.locals.user = user; //pass the user through the response object to the next middleware function
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error); //log and pass errors to next function
      });
  },
  showView: (req, res) => {
    res.render("users/show"); //render show view
  }
};
