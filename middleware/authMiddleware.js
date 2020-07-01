const User = require("../models/User");
module.exports = (req, res, next) => {
  // find current sessions userId to DB and store the document in 'user'
  User.findById(req.session.userId, (error, user) => {
    // then check if the user is retrieved successfully or not or user doesn’t exist
    // if any of these true then redirect back to the home page.
    // If the user is a valid user, we permit the request and carry on with next()
    if (error || !user) return res.redirect("/");
    next();
  });
};
