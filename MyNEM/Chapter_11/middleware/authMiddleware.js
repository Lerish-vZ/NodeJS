const User = require('../models/User');

module.exports = (req, res, next) => {
    User.findById(req.session.userId)
    .catch(error => {
        return res.redirect('/');
    });
}