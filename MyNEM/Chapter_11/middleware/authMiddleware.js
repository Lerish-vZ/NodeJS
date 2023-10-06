const User = require("../models/User");

module.exports = (req, res, next) => {
  User.findById(req.session.userIduserId)
  .then(user => {
    next();
  })
  .catch(error => {
    if(error || !user) {
        return res.redirect('/');
    }
  })
  
};
