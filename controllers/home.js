const BlogPost = require("../models/BlogPost.js"); // Database schema

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({}); // retrieve all the blog posts from DB and assigning them to the variable
  //console.log(blogposts); // json array of all post stored in DB
  console.log(req.session);
  res.render("index", {
    blogposts, // we pass back the blogposts data back to the client browser by providing it as the 2 nd argument to render
  }); // With this, index.ejs view now has access to the blogposts variable.
};
