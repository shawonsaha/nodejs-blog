// We check if the session contains a user id. If it does, then show the create
// post page. If it doesn ’ t, redirect back to the login page.

// render create.ejs static page to the route "posts/new"

module.exports = (req, res) => {
  if (req.session.userId) {
    return res.render("create");
  }
  res.redirect("/auth/login");
};
