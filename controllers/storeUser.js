const User = require("../models/User"); // importing user model (DB)

module.exports = (req, res) => {
  // req.body = { username: 'username', password: 'password' }
  User.create(req.body, (error, user) => {
    // if error occoured
    if (error) {
      console.log(error); // log error to console
      res.redirect("/auth/register"); // redirect to signup page
    }
    res.redirect("/");
  });
};
