const User = require("../models/User");
const path = require("path");

module.exports = (req, res) => {
  User.create(req.body)
  .then(res.redirect("/"))
  .catch((error) => {
    console.log(error);
  })
 };