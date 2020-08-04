// Express checks  if data filled in the fields is valid before sending the request to the server
module.exports = (req, res, next) => {
  // if any of the form fields are null then
  if (req.files == null || req.body.title == null || req.body.title == null) {
    // redirect back to the create post page
    return res.redirect("/posts/new");
  }
  next(); // tells Express that the middleware is done and Express should call the next middleware function
};
