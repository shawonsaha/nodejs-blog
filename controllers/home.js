const BlogPost = require("../models/BlogPost.js"); // Database schema

module.exports = async (req, res) => {
  // retrieve all the blog posts from DB and assigning them to the variable
  const blogposts = await BlogPost.find({});
  //console.log(blogposts); // json array of all post stored in DB
  console.log(req.session); // To see exactly what is in a session object
  res.render("index", {
    // we pass back the blogposts data back to the client browser
    // by providing it as the 2 nd argument to render
    blogposts,
  }); // With this, index.ejs view now has access to the blogposts variable.
};
