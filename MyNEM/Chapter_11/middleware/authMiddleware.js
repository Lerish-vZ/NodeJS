const User = require("../models/User");

module.exports = (req, res, next) => {
  User.findById(req.session.userIduserId, (error, user) => {
    if (error || !user) return res.redirect("/");
    next();
  });
  
  // .catch(error => {
  //     return res.redirect('/');
  // });
};
