// We import the bcrypt package and User model. Next, we extract the
// username and password from the user login form with req.body.

// We then use User.findOne to try to find just one user with the inputted
// username. If such a user exists, we proceed on to compare passwords. If the
// user doesn ’ t exist, we direct back to the login page.

// To compare passwords, we use bcrypt.compare to compare the entered
// password with the hashed user password retrieved from our database. Note
// that we use bcrypt.compare instead of a equality check e.g. ===. This is to
// keep us safe from a hacker trick called a timing attack.

// If the passwords match, we redirect to the home page where you can see the
// list of blog posts. If the passwords don ’ t match, we redirect back to the login page.

const bcrypt = require("bcrypt");
const User = require("../models/User");
module.exports = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          // if passwords match
          // store user session, will talk about it later
          res.redirect("/");
        } else {
          res.redirect("/auth/login");
        }
      });
    } else {
      res.redirect("/auth/login");
    }
  });
};
