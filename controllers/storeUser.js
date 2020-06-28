const User = require("../models/User"); //database model

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    res.redirect("/");
  });
};
