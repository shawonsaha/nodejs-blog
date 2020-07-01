// Express checks  if data filled in the fields is valid before sending the request to the server
module.exports = (req, res, next) => {
  // if there is no title or body or image then
  if (req.body.title == null || req.body.body == null || req.files == null) {
    // redirect back to the create post page
    return res.redirect("/posts/new");
  }
  next(); // tells Express that the middleware is done and Express should call the next middleware function
};
