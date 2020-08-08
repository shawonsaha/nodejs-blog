// In it, we fetch the user from the database with User.findById(req.session.userId ...
// We then check if the user is retrieved successfully or if the user doesn ’ t exist, which we direct back
// to the home page. If the user is a valid user, we permit the request and carry on with next()

const User = require("../models/User");
module.exports = (req, res, next) => {
  User.findById(req.session.userId, (error, user) => {
    if (error || !user) return res.redirect("/");
    next();
  });
};
