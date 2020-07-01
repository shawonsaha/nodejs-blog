// render static .ejs page to the route "posts/new"
module.exports = (req, res) => {
  // To implement checking for a session id before allowing a user to create a blog post
  // if the session contains a user id then
  if (req.session.userId) {
    return res.render("create"); // show the create post page
  }
  res.redirect("/auth/login"); // redirect to login page
};
