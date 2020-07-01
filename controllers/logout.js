module.exports = (req, res) => {
  // destroy session data
  req.session.destroy(() => {
    res.redirect("/"); // redirect to homepage
  });
};
