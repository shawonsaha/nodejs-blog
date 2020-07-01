module.exports = (req, res, next) => {
  // if the session contains a user id / user logged in then
  if (req.session.userId) {
    return res.redirect("/"); // redirect to home page
  }
  next();
};
