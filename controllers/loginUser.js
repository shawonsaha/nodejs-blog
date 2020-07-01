const bcrypt = require("bcrypt");
const User = require("../models/User"); // user database model

module.exports = (req, res) => {
  // the value came from req.body (as JSON format) will store in
  // two individual variables 'username' and 'password'
  const { username, password } = req.body;
  // User.findOne to try to find just one user Users collection with the inputted username
  // in {username:username} the first one is the key to query for username and
  // 2nd one is the variable which came from req.body where user inputed username stored
  // if the key:value pair matches then
  // whole document will returned and stores in 'user' variable
  User.findOne({ username: username }, (error, user) => {
    // if we found user in DB then
    if (user) {
      // compare user input pass with DB stored pass
      bcrypt.compare(password, user.password, (error, same) => {
        // if password matches
        if (same) {
          // We assign the user _id to the session. The session package saves this data on the user’s browser
          // so that each time the user makes a request, this cookie will be sent back to the server
          // with the authenticated id. This is how we know if a user is logged in
          req.session.userId = user._id;
          res.redirect("/"); // redirect to home
        } else {
          res.redirect("/auth/login"); // redirect login page
        }
      });
    }
  });
};
